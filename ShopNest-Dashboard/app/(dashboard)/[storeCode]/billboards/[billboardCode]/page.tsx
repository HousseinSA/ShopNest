import StoreBillBoard from '@/components/Billboards/Billboard/StoreBillBoard'
import validateObjectId from '@/lib/mongodDBValidate'
import prismaDB from '@/lib/prismaClient'
import { redirect } from 'next/navigation'

async function BillBoardPage({ params }: { params: { billboardCode: string; storeCode: string } }) {
  const validBillBoardCode = validateObjectId(params.billboardCode)
  const validBillStoreCode = validateObjectId(params.storeCode)
  if (validBillBoardCode && validBillStoreCode) {
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
  redirect(`/${params.storeCode}/billboards`)
}

export default BillBoardPage
