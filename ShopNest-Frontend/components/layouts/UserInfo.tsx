'use client';

import {  useEffect, useRef, useState } from 'react';
import { signOut, useSession } from 'next-auth/react';
import { User2Icon } from 'lucide-react';
import Image from 'next/image';
import ClipLoader from 'react-spinners/ClipLoader';
import {usePathname} from 'next/navigation'

const UserInfo = () => {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const pathname  = usePathname()
  const dropdownRef = useRef(null) // Create a ref for the dropdown


  const handleLogout = async () => {
    setLoading(true);
  
    try {
      const response = await fetch('/api/auth/removeUser', { method: 'POST' });
  
      if (!response.ok) {
        throw new Error('Failed to remove user session');
      }
      const csrfResponse = await fetch('/api/auth/csrf');
      const { csrfToken } = await csrfResponse.json();


      await fetch('/api/auth/signout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ csrfToken }),
      });

  
    } catch (error) {
      console.error('Failed to remove user session:', error);
    }
  
    // Sign out the user
    await signOut();
  };
  
  const toggleMenu = () => {

    setIsOpen((prev) => !prev);
  };

  useEffect(()=>{
   setIsOpen(false)
  },[pathname])

  // Close the dropdown if the user clicks outside of it
  // @ts-expect-error ignore ts check
  const handleClickOutside = (event) => {
  // @ts-expect-error ignore ts check
  if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };


  useEffect(() => {
    // Add event listener for clicks outside the dropdown
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      // Clean up the event listener on unmount
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);    


  return (
    <div className="relative z-30">
      <div
        onClick={toggleMenu}
        className="flex items-center justify-center cursor-pointer rounded-full bg-primary hover:primary-foreground transition duration-300 w-8 h-8 md:h-11 md:w-11"
      >
        {session?.user?.image ? (
          <Image
            src={session.user.image}
            alt="User Image"
            width={18}
            height={18}
            className="rounded-full w-full h-full"
          />
        ) : (
          <User2Icon size={18} color="white" />
        )}
      </div>

      {/* Dropdown menu */}
      {isOpen && (
        <div ref={dropdownRef} className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg overflow-hidden z-50">
          <div className="p-4 text-sm">
            <p>Are you sure you want to sign out?</p>
            <button
              onClick={handleLogout}
              className="mt-2 w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white py-1 rounded"
            >
              {loading ? 'Login out...' : 'log out'}    
              {loading && <ClipLoader size={15} color="#fff" />}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
