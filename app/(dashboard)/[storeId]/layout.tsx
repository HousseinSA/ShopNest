import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import React from 'react'

import prismaDB from '@/lib/prismaClient'

export default function DashboardLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: { storeId: string }
}) {
  const { userId } = auth()
  if (!userId) {
    redirect('/sign-in')
  }
  const store = prismaDB.store.findFirst({
    where: {
      id: params.storeId,
      userId: userId
    }
  })
  if (!store) {
    redirect('/')
  }
  return (
    <>
      <h1>dashboard nav</h1>
      {children}
    </>
  )
}
