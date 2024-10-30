'use client';

import { useEffect, useState } from 'react';
import { signOut, useSession } from 'next-auth/react';
import { User2Icon } from 'lucide-react';
import Image from 'next/image';
import ClipLoader from 'react-spinners/ClipLoader';

const UserInfo = () => {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Store session data in localStorage
  useEffect(() => {
    if (session?.user) {
      localStorage.setItem('user', JSON.stringify(session.user)); // Store user data
    } else {
      localStorage.removeItem('user'); // Remove user data if session is null
    }
  }, [session]);

  const handleLogout = () => {
    setLoading(true);
    signOut({ callbackUrl: '/' }); // Redirect to home after logout
    localStorage.removeItem('user'); // Remove user data on logout
  };

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

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
        <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg overflow-hidden z-50">
          <div className="p-4 text-sm">
            <p>Are you sure you want to log out?</p>
            <button
              onClick={handleLogout}
              className="mt-2 w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white py-1 rounded"
            >
              {loading ? 'Logging out...' : 'Log out'}
              {loading && <ClipLoader size={15} color="#fff" />}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
