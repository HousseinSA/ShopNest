import { redirect } from 'next/navigation'
import StoreBillBoard from '@/components/Billboards/Billboard/StoreBillBoard'
import validateObjectId from '@/lib/mongodDBValidate'
import prismaDB from '@/lib/prismaClient'

async function BillBoardPage({ params }: { params: { billboardCode: string; storeCode: string } }) {
  const validBillBoardCode = validateObjectId(params.billboardCode)
  const validStoreCode = validateObjectId(params.storeCode)

  if (!validStoreCode) {
    redirect('/')
  } else if (!validBillBoardCode && params.billboardCode !== 'new') {
    redirect(`/${params.storeCode}/billboards`)
  }

  if (validBillBoardCode) {
    const billboard = await prismaDB.billboard.findUnique({
      where: {
        id: params.billboardCode
      }
    })
    if (billboard) {
      return (
        <div className='p-4 flex flex-col flex-1'>
          <StoreBillBoard billboardData={billboard} />
        </div>
      )
    }
  }

  return (
    <div className='p-4 flex flex-col flex-1'>
      <StoreBillBoard />
    </div>
  )
}

export default BillBoardPage
