'use client'
import Image from 'next/image'
export default function NotRegisteredUser() {

  return (
    <>
      {/* Backdrop for the login modal */}
      <div className='fixed inset-0 bg-black bg-opacity-50 z-50 backdrop-blur-sm transition-opacity duration-300 opacity-100' />
      {/* Login Modal */}
      <div className='fixed top-0 left-1/2 transform -translate-x-1/2 z-50 flex items-star gap-4 t justify-center  mt-20 w-full px-4'>
        <div className='bg-card rounded-lg shadow-lg p-8 max-w-lg w-full login-wrapper transition-transform duration-500 ease-in-out'>
          {/* Site Logo */}
          <div className='flex justify-center mb-6'>
            <Image src='/shopnest-logo.png' alt='ShopNest Logo' width={200} height={200} className='h-16' />
          </div>
          <div className='flex flex-col space-y-4 mt-4'>
            <button type='button'
            className='w-full p-4 font-bold text-black  justify-center gap-2 flex items- rounded-md  '>
               Login first to access dashboard
            </button>
          </div>
        </div>
      </div>
    </>
  )
}