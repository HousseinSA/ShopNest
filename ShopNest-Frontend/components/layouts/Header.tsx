import Image from "next/image"
import Link from "next/link"
import React from "react"
import Navigation from "./Navigation"
import getCategoriesData from "@/lib/fetchData/getCategories"

export const revalidate  = 0 
const Header = async () => {
  
    const categories = await getCategoriesData()
  return (
    <header className="mx-auto py-2 md:py-3 lg:py-5 max-w-7xl border-b">
      <div className="flex items-center justify-between">
        <div className="w-auto h-auto">
          <Link href={"/"}>
            <Image
              src={"/shopnest-high-resolution-logo-transparent.png"}
              width={100}
              height={100}
              alt="logo"
            />
          </Link>
        </div>
        <Navigation categoriesData={categories} />
      </div>
    </header>
  
  
  )
}

export default Header
