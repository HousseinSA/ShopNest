'use client'

import { signIn } from 'next-auth/react'
import Image from 'next/image'
import { useState } from 'react'
import { ClipLoader } from 'react-spinners'

export default function LoginPage() {
  const [loading, setLoading ] = useState(false)
  const handleSignIn = async (provider:any) => {
    if(provider === 'google'){
      setLoading(true)
    }
    await signIn(provider)
  }

  return (
    <>
      {/* Backdrop for the login modal */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40 backdrop-blur-sm transition-opacity duration-300 opacity-100" />

      {/* Login Modal */}
      <div className="fixed top-0 left-1/2 transform -translate-x-1/2 z-50 flex items-start justify-center min-h-screen mt-20 w-full px-4">
        <div className="bg-card rounded-lg shadow-lg p-8 max-w-lg w-full login-wrapper transition-transform duration-500 ease-in-out">
          {/* Site Logo */}
          <div className="flex justify-center mb-6">
            <Image
              src="/shopnest-logo.png"
              alt="ShopNest Logo"
              width={200}
              height={200}
              className="h-16"
            />
          </div>
          <div className="flex flex-col space-y-4">
            <button
              type="button"
              onClick={() => handleSignIn('google')}
              className="w-full p-2 text-white hover:bg-opacity-40 bg-primary justify-center gap-2 flex items-center rounded-md  hover:primary-foreground"  
            >
             {loading ?'Login...':'Login with Google' } 
             {loading ? <ClipLoader size={15} color='#fff'/>: <Image src={'/Google.png'} alt='google' width={20} className='rounded-full ' height={20}/>} 
            </button>
            <button
              type="button"
              onClick={() => handleSignIn('guest')}
              className="w-full p-2 text-white bg-gray-700 rounded-md hover:bg-gray-800"
            >
               Login as Guest
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
