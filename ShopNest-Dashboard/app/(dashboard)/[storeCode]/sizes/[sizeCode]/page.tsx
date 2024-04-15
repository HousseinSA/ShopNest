import { redirect } from 'next/navigation'

import StoreSize from '@/components/Sizes/size/storeSize'
import validateObjectId from '@/lib/mongodDBValidate'
import prismaDB from '@/lib/prismaClient'

async function SizePage({ params }: { params: { sizeCode: string; storeCode: string } }) {
  const validStoreCode = validateObjectId(params.storeCode)
  const validSizeCode = validateObjectId(params.sizeCode)
  const sizes = await prismaDB.size.findMany({
    where: {
      storeCode: params.storeCode
    }
  })
  if (validStoreCode && validSizeCode) {
    const size = await prismaDB.size.findUnique({
      where: {
        id: params.sizeCode
      }
    })

    return (
      <div className='p-4 flex flex-col flex-1'>
        <StoreSize sizes={sizes} size={size} />
      </div>
    )
  }
  if (!validStoreCode) redirect(`/`)

  return (
    <div className='p-4 flex flex-col flex-1'>
      <StoreSize sizes={sizes} />
    </div>
  )
}

export default SizePage
