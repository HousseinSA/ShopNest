import { redirect } from 'next/navigation'
import { auth } from '@clerk/nextjs'
import React from 'react'

import validateObjectId from '@/lib/mongodDBValidate'
import prismaDB from '@/lib/prismaClient'
import StoreSettingsForm from '@/components/StoreSettings/StoreSettingsForm'

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
    <div className='p-4 flex flex-col flex-1'>
      <StoreSettingsForm storeData={store} />
    </div>
  )
}

export default StoreSettings
