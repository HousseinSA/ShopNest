'use client'
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'
import React, { useEffect } from 'react'

import { cn } from '@/lib/utils'
import { useMobileMenuState } from '@/hooks/StoreState'

const MobileNav = () => {
  // paths and params
  const pathname = usePathname()
  const params = useParams()
  //change for vercel
  const Store = 'https://shopnest-frontend.vercel.app/'
  const storeDashboard = `/${params.storeCode}`
  const settings = `/${params.storeCode}/settings`
  const billboard = `/${params.storeCode}/billboards`
  const categories = `/${params.storeCode}/categories`
  const sizes = `/${params.storeCode}/sizes`
  const colors = `/${params.storeCode}/colors`
  const products = `/${params.storeCode}/products`
  const orders = `/${params.storeCode}/orders`

  // routes array for navigation
  const routes = [
    { link: Store, label: 'Store', active: pathname === Store },
    {
      link: storeDashboard,
      label: 'Dashboard',
      active: pathname === storeDashboard
    },
    {
      link: billboard,
      label: 'Billboards',
      active: pathname === billboard
    },
    {
      link: categories,
      label: 'Categories',
      active: pathname === categories
    },
    {
      link: sizes,
      label: 'Sizes',
      active: pathname === sizes
    },
    {
      link: colors,
      label: 'Colors',
      active: pathname === colors
    },
    {
      link: products,
      label: 'Products',
      active: pathname === products
    },
    {
      link: orders,
      label: 'Orders',
      active: pathname === orders
    },
    {
      link: settings,
      label: 'Settings',
      active: pathname === settings
    }
  ]

  // state
  const { isOpen, setIsOpen } = useMobileMenuState()

  return (
    <nav className={cn('flex items-center gap-4 md:gap-6 ', isOpen ? 'flex-col justify-center' : 'flex-row')}>
      {routes.map((route) => (
        <Link onClick={() => setIsOpen()} className={cn('relative group text-md transition-colors text-secondary-foreground  hover:primary-foreground', route.active && 'text-primary font-bold ')} key={route.link} href={route.link}>
          {route.label}
          <span className={cn('absolute left-0 bottom-[-2px] w-full h-[2px] rounded-md bg-primary  transition-transform duration-300 transform scale-x-0 group-hover:scale-x-100', route.active ? 'scale-x-100' : 'scale-x-0')} />
        </Link>
      ))}
    </nav>
  )
}

export default MobileNav
