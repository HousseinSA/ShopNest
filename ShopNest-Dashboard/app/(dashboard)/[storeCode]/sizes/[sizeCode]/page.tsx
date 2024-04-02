import StoreSize from '@/components/Sizes/size/storeSize'
import validateObjectId from '@/lib/mongodDBValidate'
import prismaDB from '@/lib/prismaClient'

async function SizePage({ params }: { params: { sizeCode: string; storeCode: string } }) {
  const validBillBoardCode = validateObjectId(params.sizeCode)
  const sizes = await prismaDB.size.findMany({
    where: {
      storeCode: params.storeCode
    }
  })
  if (validBillBoardCode) {
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
  return (
    <div className='p-4 flex flex-col flex-1'>
      <StoreSize sizes={sizes} />
    </div>
  )
}

export default SizePage
