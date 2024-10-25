import { redirect } from 'next/navigation'
import React from 'react'

import validateObjectId from  '@/lib/mongodb/mongodDBValidate'

import prismaDB from '@/lib/prismaClient'
// import StoreSettingsForm from '@/components/StoreSettings/StoreSettings'
import StoreSettings from '@/components/Settings/StoreSettings'
import { userInfo } from '@/lib/auth/userInfo'

interface StoreSettingsProps {
  params: { storeCode: string }
}

const StorePage: React.FC<StoreSettingsProps> = async ({ params: { storeCode } }) => {
  const {userId} = await userInfo(storeCode)
  const validateStoreCode = validateObjectId(storeCode)
  if (!validateStoreCode) {
    redirect('/')
  }

  const store = await prismaDB.store.findFirst({
    where: {
      id: storeCode,
      userId
    }
  })

  if (!store) {
    redirect('/')
  }

  return (
    <div className='p-4 flex flex-col flex-1'>
      <StoreSettings storeData={store} />
    </div>
  )
}

export default StorePage
