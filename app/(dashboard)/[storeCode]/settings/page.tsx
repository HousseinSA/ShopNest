import { redirect } from 'next/navigation'
import React from 'react'

import prismaDB from '@/lib/prismaClient'
import { auth } from '@clerk/nextjs'

interface StoreSettingsProps {
  params: { storeCode: string }
}

const StoreSettings: React.FC<StoreSettingsProps> = async ({
  params: { storeCode }
}) => {
  console.log(storeCode)
  const { userId } = auth()
  if (!userId) {
    redirect('/sign-in')
  }
  const store = await prismaDB.store.findFirst({
    where: {
      id: storeCode
    }
  })
  if (!store) {
    redirect('/')
  }
  console.log(store)
  return (
    <div className='p-4'>
      <h1 className='text-2xl font-semibold'>Settings</h1>
      <div>Active store: {store.username}</div>
    </div>
  )
}

export default StoreSettings
