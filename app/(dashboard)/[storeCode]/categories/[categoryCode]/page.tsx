import StoreCategory from '@/components/Categories/category/CategoryComp/StoreCategory'
import validateObjectId from '@/lib/mongodDBValidate'
import prismaDB from '@/lib/prismaClient'

async function BillBoardPage({ params }: { params: { categoryCode: string; storeCode: string } }) {
  const validBillBoardCode = validateObjectId(params.categoryCode)
  const billboards = await prismaDB.billboard.findMany({
    where: {
      storeCode: params.storeCode
    }
  })
  if (validBillBoardCode) {
    const category = await prismaDB.category.findUnique({
      where: {
        id: params.categoryCode
      }
    })

    return (
      <div className='p-4 flex flex-col flex-1'>
        <StoreCategory billboards={billboards} categoryData={category} />
      </div>
    )
  }
  return (
    <div className='p-4 flex flex-col flex-1'>
      <StoreCategory billboards={billboards} />
    </div>
  )
}

export default BillBoardPage
