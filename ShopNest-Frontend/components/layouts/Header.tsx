import Image from "next/image"
import Link from "next/link"
import React from "react"
import Navigation from "./Navigation"
import getCategoriesData from "@/lib/getData/getCategories"

const Header = async () => {
  const categories = await getCategoriesData()
  return (
    <header className="mx-auto py-2 md:py-3 lg:py-5 max-w-7xl border-b">
      <div className="flex items-center justify-between">
        <div className="w-auto h-auto">
          <Link href={"/"}>
            <Image
              src={"/ShopNestLogo.png"}
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
