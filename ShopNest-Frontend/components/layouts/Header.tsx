import React from "react"

interface HeaderProps {
  children: React.ReactNode
}
const Header: React.FC<HeaderProps> = ({ children }) => {
  return <header className="mx-auto max-w-7xl">{children}</header>
}

export default Header
