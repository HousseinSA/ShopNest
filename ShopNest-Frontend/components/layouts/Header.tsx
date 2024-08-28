'use client'
import Link from 'next/link'
import Image from 'next/image'

import CartButton from '@/components/cartButton'
import Navigation from './Navigation/Navigation'
import MobileMenu from './Navigation/mobileMenu'
import { cn } from '@/lib/utils'
import React, { useEffect, useState } from 'react'
import { Category } from '@/lib/StoreTypes'

type categoryProps = {
  categories: Category[]
}

const Header = ({ categories }: categoryProps) => {
  return (
    <header
      className={cn(
        'py-4 md:py-5 lg:py-6 mx-auto transition duration-500 max-w-7xl',
      )}
    >
      <div className="flex items-center justify-between sm:justify-start gap-5 mx-4">
      <div className="flex-shrink-0">
          <Link href={'/'}>
            <Image
              src="/shopnest-logo.png"
              width={200}
              height={200}
              alt="logo"
              priority={true}
              className="w-28 sm:w-32 md:w-40 lg:w-48"  // Adjust widths for responsiveness
            />
          </Link>
        </div>
        <Navigation categoriesData={categories}  />
        <div className=" ml-0 sm:ml-auto space-x-4 flex items-center">
          <CartButton  />
          <div className="block sm:hidden">
            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
