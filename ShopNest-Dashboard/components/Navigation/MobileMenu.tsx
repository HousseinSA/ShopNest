'use client'
import React from 'react'
import { Menu, X } from 'lucide-react'
import { useMobileMenuState } from '@/hooks/StoreState'
import MobileNav from './MobileNav'

const HamburgerMenu: React.FC = () => {
  const { isOpen, setIsOpen } = useMobileMenuState()
  const toggleMenu = () => {
    setIsOpen()
  }

  return (
    <div className='relative'>
      <button onClick={toggleMenu}>
        {!isOpen && <Menu size={25} className={`text-primary transition-all duration-300 ${isOpen ? 'opacity-0 transform scale-75' : 'opacity-100 transform scale-100'}`} />}
        {isOpen && <div className='fixed inset-0 bg-black bg-opacity-50 h-full w-full z-50 backdrop-blur-sm duration-300 transition-opacity' />}
      </button>
      <div className={`fixed top-0 left-0 w-2/3 h-full bg-white  z-50  transition-transform duration-300 transform ${isOpen ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}`}>
        <div className='flex justify-end p-4'>
          <button onClick={toggleMenu}>
            <X size={25} className={`text-primary transition-all duration-300 ${isOpen ? 'opacity-100 transform scale-100' : 'opacity-0 transform scale-75 '}`} />
          </button>
        </div>
        <MobileNav />
      </div>
    </div>
  )
}

export default HamburgerMenu
