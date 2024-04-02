import React from 'react'
import { redirect } from 'next/navigation'
import { auth } from '@clerk/nextjs'
import validateObjectId from '@/lib/mongodDBValidate'

import prismaDB from '@/lib/prismaClient'
interface StoreParams {
  params: { storeCode: string }
}

const StorePage: React.FC<StoreParams> = async ({ params: { storeCode } }) => {
  const { userId } = auth()
  if (!userId) {
    redirect('/sign-in')
  }
  const validStoreId = validateObjectId(storeCode)
  if (!validStoreId) {
    redirect('/')
  }
  const store = await prismaDB.store.findFirst({
    where: {
      id: storeCode,
      userId
    }
  })

  return <div>active store:{store?.storename}</div>
}

export default StorePage
