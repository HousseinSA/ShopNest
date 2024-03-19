import { redirect } from 'next/navigation'
import { auth } from '@clerk/nextjs'
import React from 'react'
import validateObjectId from '@/lib/mongodDBValidate'
import prismaDB from '@/lib/prismaClient'

interface StoreSettingsProps {
  params: { storeCode: string }
}

const StoreSettings: React.FC<StoreSettingsProps> = async ({
  params: { storeCode }
}) => {
  const { userId } = auth()
  if (!userId) {
    redirect('/sign-in')
  }
  const validStoreCode = validateObjectId(storeCode)
  if (!validStoreCode) {
    redirect('/')
  }
  const store = await prismaDB.store.findFirst({
    where: {
      id: storeCode,
      userId
    }
  })
  return (
    <div className='p-4'>
      <h1 className='text-2xl font-semibold'>Settings</h1>
      <div>Active store: {store?.storeName}</div>
    </div>
  )
}

export default StoreSettings
