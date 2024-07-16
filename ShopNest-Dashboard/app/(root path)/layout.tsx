import React from 'react'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

import '@/app/globals.css'

import prismaDB from '@/lib/prismaClient'
interface HomeLayout {
  children: React.ReactNode
}

// const validDateUserId
const HomeLayout: React.FC<HomeLayout> = async ({ children }) => {
  const { userId } = auth()
  if (!userId) {
    redirect('/sign-in')
  }
  const store  = await prismaDB.store.findFirst({
    where: {
      userId
    }
  })

  if(store) {
    redirect(`/${store?.id}`)
  }

  return <>{children}</>
}

export default HomeLayout
