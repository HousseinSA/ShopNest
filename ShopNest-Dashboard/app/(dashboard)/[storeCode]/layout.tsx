import React from 'react'

import prismaDB from '@/lib/prismaClient'
import Head from '@/components/Navigation/Head'
import '@/app/globals.css'
 import { userInfo } from '@/lib/userInfo'
import NotRegisteredUser from '@/components/globals/NotRegisteredUser'


interface DashboardLayoutProps {
  children: React.ReactNode
  params: { storeCode:string }
}

export default async function DashboardLayout({ children, params: { storeCode } }: DashboardLayoutProps) {
  
  const { customUser, userId} = await userInfo(storeCode)
  let  storeList = await prismaDB.store.findMany({ where: { userId } });
if(customUser && storeList.length === 0){
  storeList = await prismaDB.store.findMany({ where: { userId:'guest' } });
}

console.log(customUser, userId,'in dashboard testing')


  return (
    <div className='max-w-7xl mx-auto'>
      { (!customUser && !userId) && <NotRegisteredUser/>}
      <Head storeList={storeList}
       customUser={customUser} 
       />
      {children}
    </div>
  )
}
