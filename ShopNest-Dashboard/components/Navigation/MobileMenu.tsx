'use client'
import {useMobileMenuState} from '@/hooks/StoreState'

const MobileMenu = () => {
const {setIsOpen, isOpen} = useMobileMenuState()
  return (
    <>
      <button className='flex flex-col justify-between w-6 h-6' onClick={setIsOpen}>
        <span className={`bg-gray-800 h-1 rounded-md transition-transform duration-300 ease-in-out transform ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
        <span className={`bg-gray-800 h-1 rounded-md transition-opacity duration-300 ease-in-out ${isOpen ? 'opacity-0' : ''}`}></span>
        <span className={`bg-gray-800 h-1 rounded-md transition-transform duration-300 ease-in-out transform ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
      </button>

      <div className={`fixed top-0 left-0 w-full h-screen bg-primary transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out z-50`}>
        <div className='flex flex-col items-center justify-center h-full space-y-4 text-white'>
          <a href='#' className='text-xl'>
            Home
          </a>
          <a href='#' className='text-xl'>
            About
          </a>
          <a href='#' className='text-xl'>
            Services
          </a>
          <a href='#' className='text-xl'>
            Contact
          </a>
        </div>
      </div>
    </>
  )
}

export default MobileMenu
