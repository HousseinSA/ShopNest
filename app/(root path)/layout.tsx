import React from 'react'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

import '../globals.css'
import prismaDB from '@/lib/prismaClient'
interface HomeLayout {
  children: React.ReactNode
}
const HomeLayout: React.FC<HomeLayout> = async ({ children }) => {
  const { userId } = auth()
  if (!userId) {
    redirect('/sign-in')
  }
  try {
    const store = await prismaDB.store.findFirst({
      where: {
        userId
      }
    })
    console.log(store)
    if (store) {
      redirect(`/${store?.id}`)
    }
  } catch (error) {
    console.log(error)
  }

  return <>{children}</>
}

export default HomeLayout
