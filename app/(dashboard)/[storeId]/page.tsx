import React from 'react'

import prismaDB from '@/lib/prismaClient'

const StorePage = async ({ params }: { params: { storeId: string } }) => {
  const store = await prismaDB.store.findFirst({
    where: {
      id: params.storeId
    }
  })
  return (
    <>
      <div>active store: {store?.username}</div>
    </>
  )
}

export default StorePage
