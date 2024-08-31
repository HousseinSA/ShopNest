import React from "react"

const Footer = () => {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-white border-t absolute bottom-0 w-full ">
      <div className="mx-auto py-5 flex justify-center ">
        <p>&copy; {year} <span className='text-primary font-medium'>ShopNest</span>, All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
