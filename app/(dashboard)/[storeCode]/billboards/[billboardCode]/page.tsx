import StoreBillBoard from '@/components/Billboards/Billboard/StoreBillBoard'
import validateObjectId from '@/lib/mongodDBValidate'
import prismaDB from '@/lib/prismaClient'

async function BillBoardPage({
  params
}: {
  params: { billboardCode: string }
}) {
  const validBillboardId = validateObjectId(params.billboardCode)

  if (validBillboardId) {
    const billboard = await prismaDB.billboard.findUnique({
      where: {
        id: params.billboardCode
      }
    })
    return <div>Existing Billboard: {billboard?.label}</div>
  }
  return (
    <div className='p-4 flex flex-col flex-1'>
      <StoreBillBoard />
    </div>
  )
}

export default BillBoardPage
