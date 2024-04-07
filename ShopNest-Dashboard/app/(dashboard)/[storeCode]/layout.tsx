import React from 'react'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

import prismaDB from '@/lib/prismaClient'
import Navbar from '@/components/Navigation/Navbar'

import '@/app/globals.css'

interface DashboardLayoutProps {
  children: React.ReactNode
  params: { storeCode: string }
}
export default async function DashboardLayout({ children, params: { storeCode } }: DashboardLayoutProps) {
  // userId check
  const { userId } = auth()
  if (!userId) {
    redirect('/sign-in')
  }

  try {
    // find first store with storeCode and userId
    const storeData = await prismaDB.store.findFirst({
      where: {
        id: storeCode,
        userId
      }
    })
    // no store redirect to home
    if (!storeData) {
      redirect('/')
    }
  } catch (error) {
    console.log(error)
  }
  return (
    <>
      <Navbar />
      {children}
    </>
  )
}
