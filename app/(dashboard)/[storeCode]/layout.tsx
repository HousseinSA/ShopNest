import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import React from 'react'

import prismaDB from '@/lib/prismaClient'
import Navbar from '@/components/Navigation/Navbar'

export default function DashboardLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: { storeCode: string }
}) {
  const { userId } = auth()
  if (!userId) {
    redirect('/sign-in')
  }
  const store = prismaDB.store.findFirst({
    where: {
      id: params.storeCode,
      userId: userId
    }
  })
  if (!store) {
    redirect('/')
  }
  return (
    <>
      <Navbar />
      {children}
    </>
  )
}
