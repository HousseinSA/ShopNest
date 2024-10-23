import React from 'react'
<<<<<<< HEAD
=======
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
>>>>>>> 88b9c6416d88ddc8eaccb7baa343d710445ce03c

import prismaDB from '@/lib/prismaClient'
import Head from '@/components/Navigation/Head'
import '@/app/globals.css'
<<<<<<< HEAD
import { userInfo } from '@/lib/auth/userInfo'
import NotRegisteredUser from '@/components/globals/NotRegisteredUser'


interface DashboardLayoutProps {
  children: React.ReactNode
  params: { storeCode:string }
}

export default async function DashboardLayout({ children, params: { storeCode } }: DashboardLayoutProps) {

  
  const {userId, session} = await userInfo()
  let  storeList = await prismaDB.store.findMany({ where: { userId } });
if(userId && storeList.length === 0){
  storeList = await prismaDB.store.findMany({ where: { userId:'guest' } });
}
  return (
    <div className='max-w-7xl mx-auto'>
      {!userId && <NotRegisteredUser/>}
      <Head storeList={storeList}
       session={session} 
       />
=======

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
>>>>>>> 88b9c6416d88ddc8eaccb7baa343d710445ce03c
      {children}
    </div>
  )
}
