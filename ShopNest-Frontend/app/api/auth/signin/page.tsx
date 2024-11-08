'use client'
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { ClipLoader } from 'react-spinners';

import useCartState from '@/lib/state/CartState'; // Adjust path as necessary
import {CustomUser} from '@/lib/userInfo'
type Provider = 'google' | 'guest';
type UserInfo  ={
  user: CustomUser| null
}

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const setUserId = useCartState((state) => state.setUserId); // Get the setUserId function
const  [userInfo, setUserInfo] = useState<UserInfo>(null)
  const handleSignIn = async (provider: Provider) => {
    if (provider === 'google') {
      setLoading(true);
    }
    
    const result = await signIn(provider); 
    
    if (result && provider === 'google') {
      // Assuming result contains a session object with a user ID
    const userId = result.user.id; // Adjust based on your actual structure
      console.log('userId to pass to session', userId)
      setUserId(userId); // Set the user ID in Zustand
      setUserInfo(userId)
    } else if (provider === 'guest') {
      setUserId('guest'); // Set guest ID or any unique identifier for guests
    }
    
    setLoading(false);
  };


// Inside LoginPage component
useEffect(() => {
        // Assuming result contains a session object with a user ID
  if (userInfo?.user?.id) {
    setUserId(userInfo.user.id); // Set userId from session if available
  }
}, [setUserId]);

  return (
    <>
      {/* Backdrop for the login modal */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40 backdrop-blur-sm transition-opacity duration-300 opacity-100" />
      {/* Login Modal */}
      <div className="fixed top-0 left-1/2 transform -translate-x-1/2 z-50 flex items-start justify-center min-h-screen mt-20 w-full px-4">
        <div className="bg-card rounded-lg shadow-lg p-8 max-w-lg w-full login-wrapper transition-transform duration-500 ease-in-out">
          {/* Site Logo */}
          <div className="flex justify-center mb-6">
            <Image src="/shopnest-logo.png" alt="ShopNest Logo" width={200} height={200} className="h-16" />
          </div>
          <div className="flex flex-col space-y-4">
            <button type="button" onClick={() => handleSignIn('google')} className="w-full p-2 text-white hover:bg-opacity-40 bg-primary justify-center gap-2 flex items-center rounded-md hover:primary-foreground">
              {loading ? 'Login...' : 'Login with Google'}
              {loading ? <ClipLoader size={15} color='#fff' /> : <Image src={'/Google.png'} alt='google' width={20} className='rounded-full' height={20} />}
            </button>
            <button type="button" onClick={() => handleSignIn('guest')} className="w-full p-2 text-white bg-gray-700 rounded-md hover:bg-gray-800">
              Login as Guest
            </button>
          </div>
        </div>
      </div>
    </>
  );
}