
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import MobileNavigation from '@/components/layouts/Navigation/MobileNavigation'
import getCategoriesData from '@/lib/fetchData/getCategories'
import { Category } from '@/lib/StoreTypes'

const HamburgerMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [categories, setCategories] = useState<Category[]>([])

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    const fetchCategories = async () => {
      const fetchingCategories: Category[] = await getCategoriesData()
      setCategories(fetchingCategories)
    }
    fetchCategories()
  }, [])
  console.log('mobile categories', categories)
  return (
    <div className="relative">
      <button onClick={toggleMenu}>
        {!isOpen && (
          <Menu
            size={25}
            className={` text-primary transition-all duration-300 ${
              isOpen
                ? 'opacity-0 transform scale-75'
                : 'opacity-100 transform scale-100'
            }`}
          />
        )}
        {isOpen && <div className="fixed inset-0 bg-black bg-opacity-25" />}
      </button>
      <div
        className={`fixed top-0 left-0 w-2/3 h-full bg-white shadow-lg transition-transform duration-300 transform  ${
          isOpen ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
        }`}
      >
        {/* Close Button */}
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
        <MobileNavigation categoriesData={categories} />
      </div>
    </div>
  )
}

export default HamburgerMenu
