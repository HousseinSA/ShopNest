import prismaDB from '@/lib/prismaClient'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import React from 'react'

const HomeLayout = async ({ children }: { children: React.ReactNode }) => {
  const { userId } = auth()
  if (!userId) {
    redirect('/sign-in')
  }
  const store = await prismaDB.store.findFirst({
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
