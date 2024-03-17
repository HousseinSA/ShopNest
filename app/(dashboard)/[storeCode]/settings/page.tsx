import { redirect } from 'next/navigation'
import { auth } from '@clerk/nextjs'
import React from 'react'
import { ObjectId } from 'mongodb'

import prismaDB from '@/lib/prismaClient'

const convertToValidObjectId = (storeCode: string): string | null => {
  try {
    const objectId = new ObjectId(storeCode) // Create a new ObjectId instance
    return objectId.toHexString() // Convert ObjectId to hexadecimal string
  } catch (error) {
    console.error('Error converting storeCode to ObjectId:', error)
    return null // Return null if conversion fails
  }
}
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

  const validStoreCode = convertToValidObjectId(storeCode)
  console.log(validStoreCode)
  const store = await prismaDB.store.findFirst({
    where: {
      id: storeCode,
      userId
    }
  })
  if (!store) {
    console.log('no this one is code is working')
    redirect('/')
  }
  return (
    <div className='p-4'>
      <h1 className='text-2xl font-semibold'>Settings</h1>
      <div>Active store: {store?.storeName}</div>
    </div>
  )
}

export default StoreSettings
