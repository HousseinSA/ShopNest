import React from 'react'
import { redirect } from 'next/navigation'
import { auth } from '@clerk/nextjs'
import validateObjectId from '@/lib/mongodDBValidate'

import prismaDB from '@/lib/prismaClient'
interface StoreParams {
  params: { storeCode: string }
}

const StorePage: React.FC<StoreParams> = async ({ params }: { params: { storeCode: string } }) => {
  const { userId } = auth()
  if (!userId) {
    redirect('/sign-in')
  }
  const validStoreCode = validateObjectId(params.storeCode)
  if (!validStoreCode) {
    redirect(`/`)
  }
  const store = await prismaDB.store.findFirst({
    where: {
      id: params.storeCode,
      userId
    }
  })

  return <div>active store:{store?.storeName}</div>
}

export default StorePage
