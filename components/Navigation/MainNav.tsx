'use client'
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'
import React from 'react'

import { cn } from '@/lib/utils'

const MainNav = () => {
  // paths and params
  const pathname = usePathname()
  const params = useParams()
  const storeDashboard = `/${params.storeCode}`
  const storeSettings = `/${params.storeCode}/settings`
  const storeBillboard = `/${params.storeCode}/billboards`

  // routes array for navigation
  const routes = [
    {
      link: storeDashboard,
      label: 'Dashboard',
      active: pathname === storeDashboard
    },
    {
      link: storeSettings,
      label: 'Settings',
      active: pathname === storeSettings
    },
    {
      link: storeBillboard,
      label: 'Billboards',
      active: pathname === storeBillboard
    }
  ]

  return (
    <nav className='flex items-center space-x-4 md:space-x-6 mx-6'>
      {routes.map((route) => {
        return (
          <Link
            className={cn(
              'text-sm font-medium transition-colors hover:text-primary',
              route.active
                ? 'text-black dark:text-white'
                : 'text-muted-foreground'
            )}
            key={route.link}
            href={route.link}
          >
            {route.label}
          </Link>
        )
      })}
    </nav>
  )
}

export default MainNav
