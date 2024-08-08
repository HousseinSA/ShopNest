import prismaDB from '@/lib/prismaClient'
import { redirect } from 'next/navigation'
import StoreColor from '@/components/colors/color/StoreColor'
import validateObjectId from  '@/lib/mongodb/mongodDBValidate'


async function ColorPage({ params }: { params: { colorCode: string; storeCode: string } }) {
  const validStoreCode = validateObjectId(params.storeCode)
  const validColorCode = validateObjectId(params.colorCode)

  if (!validStoreCode) {
    redirect('/')
  } else if (!validColorCode && params.colorCode !== 'new') {
    redirect(`/${params.storeCode}/colors`)
  }


  if (validColorCode) {
    const color = await prismaDB.color.findUnique({
      where: {
        id: params.colorCode
      }
    })

    if (color) {
      return (
        <div className='p-4 flex flex-col flex-1'>
          <StoreColor  colorData={color} />
        </div>
      )
    }
  }

  return (
    <div className='p-4 flex flex-col flex-1'>
      <StoreColor  />
    </div>
  )
}

export default ColorPage
