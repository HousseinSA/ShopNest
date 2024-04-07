"use client"
import React from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { Category } from "@/lib/StoreTypes"

interface NavigationProps {
  categoriesData: Category[]
}
const Navigation: React.FC<NavigationProps> = ({ categoriesData }) => {
  const pathname = usePathname()
  const CategoriesRoutes = categoriesData?.map((category) => ({
    href: `/category/${category.id}`,
    name: category.name,
    active: pathname === `/category/${category.id}`,
  }))
  return (
    <nav className="mx-4 flex items-center space-x-2 lg:space-x-4">
      {CategoriesRoutes?.map((category) => {
        return (
          <Link
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              category.active
                ? "text-black dark:text-white"
                : "text-muted-foreground"
            )}
            href={category.href}
            key={category.href}
          >
            {category.name}
          </Link>
        )
      })}
    </nav>
  )
}

export default Navigation
