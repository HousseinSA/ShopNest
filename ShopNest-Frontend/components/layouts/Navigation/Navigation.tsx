'use client'
import React, { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

import { cn } from '@/lib/utils'
import { Category } from '@/lib/StoreTypes'
import useSSE from '../../../hooks/useSSE'

interface NavigationProps {
  categoriesData: Category[]
}

const Navigation: React.FC<NavigationProps> = ({ categoriesData }) => {
  const [categories, setCategories] = useState(categoriesData)
  // database change event listener
  const sseData = useSSE('/api/updates')
  console.log(categories)
  console.log(sseData)
  useEffect(() => {
    if (sseData) {
      if (sseData.ns.coll === 'Category') {
        if (sseData.operationType === 'update') {
          setCategories((prevCategories) => 
            prevCategories.map((category) =>
              category.id === sseData.documentKey._id
                ? { ...category, ...sseData.updateDescription.updatedFields }
                : category
            )
          );
        } else if (sseData.operationType === 'insert') {
          setCategories((prevCategories) => [...prevCategories, sseData.fullDocument]);
        } else if (sseData.operationType === 'delete') {
          setCategories((prevCategories) => 
            prevCategories.filter((category) => category.id !== sseData.documentKey._id)
          );
        }
      }
    }
  }, [sseData]);

  const pathname = usePathname()
  const CategoriesRoutes = categories?.map((category) => ({
    href: `/category/${category.id}`,
    name: category.name,
    active: pathname === `/category/${category.id}`,
  }))
  const dashboard = {
    href: `http://localhost:3000/65fcb436995f2bfbc8e317cf`,
    name: 'Dashboard',
    active: false,
  }
  CategoriesRoutes.push(dashboard)

  return (
    <nav className="mx-4 items-center space-x-2 sm:flex hidden lg:space-x-4">
      {CategoriesRoutes?.map((category) => (
        <Link
          className={cn(
            'relative group capitalize text-md transition-colors text-secondary-foreground  hover:primary-foreground',
            category.active && 'text-primary font-bold '
          )}
          href={`${category.href}`}
          key={category.href}
        >
          {category.name}
          <span
            className={cn(
              'absolute left-0 bottom-[-2px] w-full h-[2px] bg-primary  transition-transform duration-300 transform scale-x-0 group-hover:scale-x-100',
              category.active ? 'scale-x-100' : 'scale-x-0'
            )}
          />
        </Link>
      ))}
    </nav>
  )
}

export default Navigation
