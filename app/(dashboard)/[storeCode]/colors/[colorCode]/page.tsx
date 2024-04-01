import StoreColor from '@/components/colors/color/StoreColor'
import validateObjectId from '@/lib/mongodDBValidate'
import prismaDB from '@/lib/prismaClient'

async function ColorPage({ params }: { params: { colorCode: string; storeCode: string } }) {
  const validBillBoardCode = validateObjectId(params.colorCode)
  const colors = await prismaDB.color.findMany({
    where: {
      storeCode: params.storeCode
    }
  })
  if (validBillBoardCode) {
    const color = await prismaDB.color.findUnique({
      where: {
        id: params.colorCode
      }
    })

    return (
      <div className='p-4 flex flex-col flex-1'>
        <StoreColor colors={colors} colorData={color} />
      </div>
    )
  }
  return (
    <div className='p-4 flex flex-col flex-1'>
      <StoreColor colors={colors} />
    </div>
  )
}

export default ColorPage
