import React from 'react'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

import prismaDB from '@/lib/prismaClient'
import Head from '@/components/Navigation/Head'
import '@/app/globals.css'

interface DashboardLayoutProps {
  children: React.ReactNode
  params: { storeCode: string }
}

export default async function DashboardLayout({ children, params: { storeCode } }: DashboardLayoutProps) {
  const { userId } = auth()
  if (!userId) {
    redirect('/sign-in')
  }
  const storeData = await prismaDB.store.findFirst({
    where: {
      id: storeCode,
      userId
    }
  })

  if (!storeData) {
    redirect('/')
  }

  const storeList = await prismaDB.store.findMany({ where: { userId } });
  return (
    <div className='max-w-7xl mx-auto'>
      <Head storeList={storeList} />
      {children}
    </div>
  )
}
