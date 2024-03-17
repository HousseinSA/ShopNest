import React from 'react'
import { redirect } from 'next/navigation'
import { auth } from '@clerk/nextjs'

import prismaDB from '@/lib/prismaClient'
interface StoreParams {
  params: { storeCode: string }
}

const StorePage: React.FC<StoreParams> = async ({ params: { storeCode } }) => {
  const { userId } = auth()
  const store = await prismaDB.store.findFirst({
    where: {
      id: storeCode,
      userId
    }
  })
  console.log(store, 'and', storeCode)
  if (!store) {
    redirect('/')
  }
  return <div>active store:{store?.storeName}</div>
}

export default StorePage
