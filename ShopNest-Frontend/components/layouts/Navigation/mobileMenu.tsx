import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import MobileNavigation from '@/components/layouts/Navigation/MobileNavigation'
import getCategoriesData from '@/lib/fetchData/getCategories'
import useCategoryList from '@/lib/state/categoriesState'

const HamburgerMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { categoriesList, updateCategories } = useCategoryList()

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const fetchingCategories = await getCategoriesData()
        updateCategories(fetchingCategories)
      } catch (error) {
        console.error('Failed to fetch categories:', error)
      }
    }
    fetchCategories()
  }, [updateCategories])

  return (
    <div className="relative">
      <button onClick={toggleMenu}>
        {!isOpen && (
          <Menu
            size={25}
            className={`text-primary transition-all duration-300 ${
              isOpen
                ? 'opacity-0 transform scale-75'
                : 'opacity-100 transform scale-100'
            }`}
          />
        )}
        {isOpen && <div className="fixed inset-0 bg-black bg-opacity-25" />}
      </button>
      <div
        className={`fixed top-0 left-0 w-2/3 h-full bg-white shadow-lg transition-transform duration-300 transform ${
          isOpen ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
        }`}
      >
        <div className="flex justify-end p-4">
          <button onClick={toggleMenu}>
            <X
              size={25}
              className={`text-primary transition-all duration-300 ${
                isOpen
                  ? 'opacity-100 transform scale-100'
                  : 'opacity-0 transform scale-75 '
              }`}
            />
          </button>
        </div>
        <MobileNavigation menuStatus={()=>toggleMenu()} categoriesData={categoriesList} />
      </div>
    </div>
  )
}

export default HamburgerMenu
