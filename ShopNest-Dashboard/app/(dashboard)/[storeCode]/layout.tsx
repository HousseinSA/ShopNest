import React from 'react'

import prismaDB from '@/lib/prismaClient'
import Head from '@/components/Navigation/Head'
import '@/app/globals.css'
import { userInfo } from '@/lib/auth/userInfo'
import NotRegisteredUser from '@/components/globals/NotRegisteredUser'


interface DashboardLayoutProps {
  children: React.ReactNode
  params: { storeCode:string }
}

export default async function DashboardLayout({ children, params: { storeCode } }: DashboardLayoutProps) {
  
  const {userId, session} = await userInfo(storeCode)
  let  storeList = await prismaDB.store.findMany({ where: { userId } });
if(userId && storeList.length === 0){
  storeList = await prismaDB.store.findMany({ where: { userId:'guest' } });
}

// console.log(session , userId ,'testing user and session')

  return (
    <div className='max-w-7xl mx-auto'>
      {!userId && <NotRegisteredUser/>}
      <Head storeList={storeList}
       session={session} 
       />
      {children}
    </div>
  )
}
