import { redirect } from 'next/navigation'
import StoreSize from '@/components/Sizes/size/storeSize'
import validateObjectId from '@/lib/mongodb/mongodDBValidate'

import prismaDB from '@/lib/prismaClient'

async function SizePage({ params }: { params: { sizeCode: string; storeCode: string } }) {
  const validStoreCode = validateObjectId(params.storeCode)
  const validSizeCode = validateObjectId(params.sizeCode)

  if(!validStoreCode){
    redirect('/')
  }
   if(!validSizeCode && params.sizeCode !== 'new') {
    redirect(`/${params.storeCode}/sizes`)
  }


  const sizes = await prismaDB.size.findMany({
    where: {
      storeCode: params.storeCode
    }
  })


  if(validSizeCode){
    const size = await prismaDB.size.findUnique({
      where: {
        id: params.sizeCode
      }
    })
    if(size){
      return (
        <div className='p-4 flex flex-col flex-1'>
          <StoreSize size={size} />
        </div>
      )
    } 
  
   }
  
    return (
      <div className='p-4 flex flex-col  flex-1'>
        <StoreSize  />
      </div>
    )
}

export default SizePage
