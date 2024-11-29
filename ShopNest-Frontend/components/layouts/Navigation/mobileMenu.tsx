import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import MobileNavigation from '@/components/layouts/Navigation/MobileNavigation';
import useCategoryList from '@/lib/state/categoriesState';
import ButtonIcon from '@/components/ui/IconButton';
import { gsap } from 'gsap';

const HamburgerMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { categoriesList } = useCategoryList();
  
  const menuRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsOpen(prev => !prev);
  };

  useEffect(() => {
    const menu = menuRef.current;
    const overlay = overlayRef.current;

    if (isOpen) {
      gsap.to(menu, { x: 0, opacity: 1, duration: 0.3 });
      gsap.to(overlay, { opacity: 0.5, duration: 0.3, display: 'block' });
    } else {
      gsap.to(menu, { x: '-100%', opacity: 0, duration: 0.3 });
      //@ts-expect-error overlay is defined
      gsap.to(overlay, { opacity: 0, duration: 0.3, onComplete: () => (overlay.style.display = 'none') });
    }
  }, [isOpen]);

  return (
    <>
      <button onClick={toggleMenu} className='block sm:hidden'>
        {!isOpen && (
          <Menu
            size={25}
            className={`text-primary`}
          />
        )}
      </button>

      <div 
        ref={overlayRef}
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 backdrop-blur-sm`} 
        style={{ display: isOpen ? 'block' : 'none' }} 
        onClick={toggleMenu}
      />
      
      <div 
        ref={menuRef}
        className={`fixed top-0 left-0 w-2/3 h-full bg-white shadow-lg z-50`} 
        style={{ transform: 'translateX(-100%)', opacity: 0 }}
      >
        <div className="flex justify-end p-4">
          <div className="absolute top-4 right-4 z-10">
            <ButtonIcon
              onClick={toggleMenu}
              icon={<X size={16} color="white" />}
              className="hover:bg-red-500"
            />
          </div>
        </div>
        <MobileNavigation
          categoriesData={categoriesList}
          menuStatus={toggleMenu}
        />
      </div>
    </>
  );
}

export default HamburgerMenu;