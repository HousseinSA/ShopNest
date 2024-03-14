'use client'
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'
import React from 'react'

import { cn } from '@/lib/utils'

const MainNav = ({ ...props }: React.HTMLAttributes<HTMLElement>) => {
  const pathname = usePathname()
  const params = useParams()
  const storeLink = `/${params.storeCode}/settings`
  const routes = [
    {
      link: storeLink,
      label: 'Settings',
      active: pathname === storeLink
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
