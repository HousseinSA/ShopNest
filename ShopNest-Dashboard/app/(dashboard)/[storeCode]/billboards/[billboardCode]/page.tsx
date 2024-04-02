import StoreBillBoard from '@/components/Billboards/Billboard/StoreBillBoard'
import validateObjectId from '@/lib/mongodDBValidate'
import prismaDB from '@/lib/prismaClient'

async function BillBoardPage({ params }: { params: { billboardCode: string } }) {
  const validBillBoardCode = validateObjectId(params.billboardCode)
  if (validBillBoardCode) {
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
  return (
    <div className='p-4 flex flex-col flex-1'>
      <StoreBillBoard />
    </div>
  )
}

export default BillBoardPage
