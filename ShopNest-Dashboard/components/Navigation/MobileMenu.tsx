'use client'
import React, { useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import { useMobileMenuState } from '@/hooks/StoreState';
import MobileNav from './MobileNav';
import { Button } from '../ui/button';
import { gsap } from 'gsap';

const HamburgerMenu: React.FC = () => {
  const { isOpen, setIsOpen } = useMobileMenuState();
  const menuRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsOpen();
  };

  useEffect(() => {
    const menu = menuRef.current;
    const overlay = overlayRef.current;

    if (isOpen) {
      gsap.to(menu, { x: 0, opacity: 1, duration: 0.3 });
      gsap.to(overlay, { opacity: 0.5, duration: 0.3, display: 'block' });
    } else {
      gsap.to(menu, { x: '-100%', opacity: 0, duration: 0.3 });
      gsap.to(overlay, { opacity: 0, duration: 0.3, onComplete: () => (overlay.style.display = 'none') });
    }
  }, [isOpen]);

  return (
    <>
      <button onClick={toggleMenu} className='block lg:hidden'>
        {!isOpen && <Menu size={25} className={`text-primary`} />}
      </button>

      <div 
        ref={overlayRef}
        className={`fixed inset-0 bg-black bg-opacity-50 h-full w-full z-50 backdrop-blur-sm`} 
        style={{ display: isOpen ? 'block' : 'none' }} 
        onClick={toggleMenu}
      />

      <div 
        ref={menuRef}
        className={`fixed top-0 left-0 w-2/3 h-full bg-white z-50`} 
        style={{ transform: 'translateX(-100%)', opacity: 0 }}
      >
        <div className='flex justify-end p-4'>
          <div className="absolute top-4 right-4 z-10">
            <Button className='rounded-full hover:scale-110 p-3 flex items-center justify-center hover:bg-red-200 border shadow-md bg-primary text-primary-foreground' onClick={toggleMenu}>
              <X size={16} color='white' />
            </Button>
          </div>
        </div>
        <MobileNav />
      </div>
    </>
  );
}

export default HamburgerMenu;