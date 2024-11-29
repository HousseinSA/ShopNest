import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import MobileNavigation from '@/components/layouts/Navigation/MobileNavigation'
import useCategoryList from '@/lib/state/categoriesState'
import ButtonIcon from '@/components/ui/IconButton'

const HamburgerMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { categoriesList } = useCategoryList()

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <button onClick={toggleMenu} className='block sm:hidden'>
        {!isOpen && (
          <Menu
            size={25}
            className={`text-primary transition-all h-full duration-300 ${
              isOpen
                ? 'opacity-0 transform scale-75'
                : 'opacity-100 transform scale-100'
            }`}
          />
        )}
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 backdrop-blur-sm transition-opacity duration-300"
          onClick={toggleMenu}
        />
      )}

      <div
        className={`fixed top-0 left-0 w-2/3 h-full bg-white shadow-lg z-50 transition-transform duration-300 transform ${
          isOpen ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
        }`}
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
  )
}

export default HamburgerMenu
