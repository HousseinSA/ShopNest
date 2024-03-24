import StoreBillBoard from '@/components/Billboards/Billboard/BillboardComp/StoreBillBoard'
import validateObjectId from '@/lib/mongodDBValidate'
import prismaDB from '@/lib/prismaClient'

async function BillBoardPage({ params }: { params: { billboardCode: string } }) {
  const validBillboardId = validateObjectId(params.billboardCode)
  if (!validBillboardId) {
    return (
      <div className='p-4 flex flex-col flex-1'>
        <StoreBillBoard />
      </div>
    )
  } else {
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
}

export default BillBoardPage
