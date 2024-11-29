import { useEffect, useRef, useState } from 'react';
import { User2Icon } from 'lucide-react';
import Image from 'next/image';
import ClipLoader from 'react-spinners/ClipLoader';
import { usePathname } from 'next/navigation';

const UserInfo = ({ customUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();
  const dropdownRef = useRef(null); // Create a ref for the dropdown

  const handleLogout = async () => {
    setLoading(true);

    try {
      const response = await fetch('/api/auth/removeUser', { method: 'POST' });

      if (!response.ok) {
        throw new Error('Failed to remove user session');
      }

    } catch (error) {
    } finally {
      setLoading(false); 
      window.location.href = '/';
    }
  };

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  // Close the dropdown if the user clicks outside of it
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    setIsOpen(false); // Close the menu on pathname change
  }, [pathname]);

  useEffect(() => {
    // Add event listener for clicks outside the dropdown
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      // Clean up the event listener on unmount
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className='relative z-30'>
      <div 
        onClick={toggleMenu} 
        className='flex items-center justify-center cursor-pointer rounded-full bg-primary hover:bg-opacity-80 transition duration-300 w-8 h-8 md:h-11 md:w-11'
      >
        {customUser?.image ? (
          <Image 
            src={customUser.image} 
            alt='User image' 
            width={18} 
            height={18} 
            className='rounded-full w-full h-full' 
          />
        ) : (
          <User2Icon size={18} color='white' />
        )}
      </div>

      {/* Dropdown menu without animations */}
      {isOpen && (
        <div ref={dropdownRef} className='absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg overflow-hidden z-40'>
          <div className='p-4 text-sm'>
            <p>Are you sure you want to log out?</p>
            <button 
              onClick={handleLogout} 
              className='mt-2 w-full bg-red-500 hover:bg-red-600 text-white py-1 rounded flex items-center justify-center'
            >
              {loading ? (
                <>
                  <ClipLoader size={15} color='#fff' />
                </>
              ) : (
                'Log out'
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserInfo;