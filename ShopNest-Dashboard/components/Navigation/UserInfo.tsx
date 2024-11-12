'use client'

import { useEffect, useState } from 'react'
// import { signOut } from 'next-auth/react'
import { User2Icon } from 'lucide-react'
import Image from 'next/image'
import ClipLoader from 'react-spinners/ClipLoader'
import {usePathname} from 'next/navigation'


const UserInfo = (
  { customUser }
) => {
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const pathname  = usePathname()

  const handleLogout = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/auth/removeUser', { method: 'POST' });
  
      if (!response.ok) {
        throw new Error('Failed to remove user session');
      }


      const csrfResponse = await fetch('/api/auth/csrf');
      const { csrfToken } = await csrfResponse.json();
  
      // Send a POST request to log out
      const responseLogout = await fetch('/api/auth/signout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ csrfToken }),
      });
  
      // Check if the logout was successfully 

    } catch (error) {
      console.error('Failed to remove user session:', error);
    }


  };
  
  const toggleMenu = () => {
    setIsOpen((prev) => !prev)
  }

  useEffect(()=>{
    setIsOpen(false)
   },[pathname])
  
  return (
    <div className='relative z-30'>
      <div onClick={toggleMenu} className='flex items-center justify-center cursor-pointer rounded-full bg-primary hover:primary-foreground transition duration-300 w-8 h-8 md:h-11 md:w-11'>
        {customUser?.image ? <Image src={customUser.image} alt='User image' width={18} height={18} className='rounded-full w-full h-full' /> : <User2Icon size={18} color='white' />}
      </div>
      {/* Dropdown menu without animations */}
      {isOpen && (
        <div className='absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg overflow-hidden z-40'>
          <div className='p-4 text-sm'>
            <p>Are you sure you want to log out?</p>
            <button onClick={handleLogout} className='mt-2 w-full bg-red-500 hover:bg-red-600 text-white py-1 rounded'>
              {loading ? <> Login out... </> : 'Log out'}
              {loading && <ClipLoader size={15} color='#fff' />}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserInfo
