import StoreBillBoard from '@/components/Billboards/Billboard/StoreBillBoard'
import validateObjectId from '@/lib/mongodDBValidate'
import prismaDB from '@/lib/prismaClient'
import { redirect } from 'next/navigation'

async function BillBoardPage({ params }: { params: { billboardCode: string; storeCode: string } }) {
  const validBillBoardCode = validateObjectId(params.billboardCode)
  const validStoreCode = validateObjectId(params.storeCode)

  if (validBillBoardCode && validStoreCode) {
    const billboard = await prismaDB.billboard.findUnique({
      where: {
        id: params.billboardCode
      }
    })
    return (
      <div className='p-4 flex flex-col flex-1'>
        <StoreBillBoard billBoardData={billboard} />
      </div>
    )
  }

  if (!validStoreCode) redirect(`/`)
  return (
    <div className='p-4 flex flex-col flex-1'>
      <StoreBillBoard />
    </div>
  )
}

export default BillBoardPage
