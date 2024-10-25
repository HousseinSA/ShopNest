import React from 'react'

import { redirect } from 'next/navigation'

import '@/app/globals.css'
import prismaDB from '@/lib/prismaClient'
import { userInfo } from '@/lib/auth/userInfo'
import NotRegisteredUser from '@/components/globals/NotRegisteredUser'

interface HomeLayoutProps {
  children: React.ReactNode
}


const HomeLayout: React.FC<HomeLayoutProps> = async ({ children }) => {
  // Fetch the user ID
  const { userId } = await userInfo(null)
  // Try to find a store associated with the user
  const store = await prismaDB.store.findFirst({
    where: {
      userId
    }
  })

  // If the store exists, redirect to the store's page

  if (!store || store.id === '65fcb436995f2bfbc8e317cf') {
    redirect(`/67168ed76339cddccbeb4ae4`)
  }
   if(store) {
    redirect(`/${store.id}`)
  }

  // Render the children if no redirection occurs (although it shouldn't reach here)

  return (
    <>
      {!userId && <NotRegisteredUser />}
      {children}
    </>
  )
}

export default HomeLayout
