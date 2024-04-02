import React from "react"

const Footer = () => {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-white border-t relative">
      <div className="mx-auto py-5 text-center">
        <p>&copy; {year} ShopNest, All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
