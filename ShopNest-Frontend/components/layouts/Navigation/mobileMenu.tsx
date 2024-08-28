import { useState } from 'react'

const HamburgerMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="relative">
      <button
        onClick={toggleMenu}
        className={`relative z-50 flex flex-col justify-center  items-center w-8 h-8 md:h-11 md:w-11 bg-primary rounded-md focus:outline-none transition-transform duration-300 ${
          isOpen ? 'rotate-45' : ''
        }`}
      >
        <span
          className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${
            isOpen ? 'rotate-90 translate-y-1' : ''
          }`}
        />
        <span
          className={`block w-6 h-0.5 bg-white my-1 transition-opacity duration-300 ${
            isOpen ? 'opacity-0' : ''
          }`}
        />
        <span
          className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${
            isOpen ? '-rotate-90 ' : ''
          }`}
        />
      </button>

      {/* Menu */}
      <div
        className={`fixed top-0 left-0 w-2/3 h-full bg-white shadow-lg transition-transform duration-300 transform ${
          isOpen ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
        }`}
      >
        {/* Close Button */}
        <div className="flex justify-end p-4">
          <button
            onClick={toggleMenu}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-primary text-white"
          >
            <span
              className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${
                isOpen ? 'rotate-45 translate-y-1' : ''
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-white transition-opacity duration-300 ${
                isOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${
                isOpen ? '-rotate-45 -translate-y-1' : ''
              }`}
            />
          </button>
        </div>
        <ul className="flex flex-col items-center justify-center h-full">
          <li className="py-4 text-xl hover:bg-gray-200 w-full text-center">
            Home
          </li>
          <li className="py-4 text-xl hover:bg-gray-200 w-full text-center">
            About
          </li>
          <li className="py-4 text-xl hover:bg-gray-200 w-full text-center">
            Services
          </li>
          <li className="py-4 text-xl hover:bg-gray-200 w-full text-center">
            Contact
          </li>
        </ul>
      </div>
    </div>
  )
}

export default HamburgerMenu
