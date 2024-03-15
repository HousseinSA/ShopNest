import React from 'react'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import '../globals.css'

import prismaDB from '@/lib/prismaClient'

const HomeLayout = async ({ children }) => {
  const { userId } = auth()
  if (!userId) {
    redirect('/sign-in')
  }
  const store = await prismaDB?.store.findFirst({
    where: {
      userId
    }
  })
  if (store) {
    redirect(`/${store.id}`)
  }

  return <>{children}</>
}

export default HomeLayout
