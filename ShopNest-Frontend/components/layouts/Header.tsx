'use client'
import Link from 'next/link'
import Image from 'next/image'
import React, { useEffect } from 'react'
import { Session } from 'next-auth'

import CartButton from '@/components/layouts/CartButton/cartButton'
import { cn } from '@/lib/utils'
import Navigation from './Navigation/Navigation'
import MobileMenu from './Navigation/mobileMenu'
import { Category } from '@/lib/StoreTypes'
import useCategoryList from '@/lib/state/categoriesState'
import UserInfoWrap from '@/components/layouts/UserInfoWrap'
import { SessionProvider } from 'next-auth/react';
import useCartState from '../../lib/state/CartState'


interface HeaderProps {
  categories: Category[];
  session?: Session| null ; // Allow session to be nullable
}

const Header:React.FC<HeaderProps> = ({ categories,session  }) => {
  const { updateCategories } = useCategoryList()
  const {setUserId}  = useCartState()

  useEffect(() => {
    updateCategories(categories)
  }, [categories, updateCategories]) 

//  change cart userId state 
useEffect(() => {
  if(session?.user){
    console.log('session changed', session.user)
  // @ts-expect-error i know there is id 
  setUserId(session.user.id)
  }
}, [session, setUserId]) 


  return (
    <header
      className={cn(
        'py-4 md:py-5 lg:py-6 mx-auto transition duration-500 max-w-7xl'
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
              className="w-28 sm:w-32 md:w-40 lg:w-48" 
            />
          </Link>
        </div>
        <Navigation categoriesData={categories} />
        <div className=" ml-0 sm:ml-auto space-x-4 flex items-center">
          <SessionProvider session={session}>
          <CartButton />
          </SessionProvider>
          <UserInfoWrap />
          <div className="block sm:hidden">
            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
