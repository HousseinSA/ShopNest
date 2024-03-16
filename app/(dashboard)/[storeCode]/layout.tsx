import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import React from 'react'
import toast from 'react-hot-toast'

import prismaDB from '@/lib/prismaClient'
import Navbar from '@/components/Navigation/Navbar'

export default function DashboardLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: { storeCode: string }
}) {
  const fetchData = async () => {
    const { userId } = auth()
    if (!userId) {
      redirect('/sign-in')
    }

    try {
      const storeData = await prismaDB.store.findFirst({
        where: {
          id: params.storeCode,
          userId: userId
        }
      })
      if (!storeData) {
        redirect('/')
        return
      }
    } catch (error) {
      console.error('Error fetching store data:', error)
      toast.error('Error fetching store data')
    }
  }

  fetchData()

  return (
    <>
      <Navbar />
      {children}
    </>
  )
}
