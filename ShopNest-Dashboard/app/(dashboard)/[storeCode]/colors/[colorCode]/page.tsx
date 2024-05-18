import prismaDB from '@/lib/prismaClient'
import { redirect } from 'next/navigation'

import StoreColor from '@/components/colors/color/StoreColor'
import validateObjectId from '@/lib/mongodDBValidate'
async function ColorPage({ params }: { params: { colorCode: string; storeCode: string } }) {
  const validStoreCode = validateObjectId(params.storeCode)
  const validColorCode = validateObjectId(params.colorCode)

  
  if(!validStoreCode){
    redirect('/')
  }else if (!validColorCode ){
    redirect(`/${params.storeCode}/colors`)
  }

    const color = await prismaDB.color.findUnique({
      where: {
        id: params.colorCode
      }
    })

    const colors = await prismaDB.color.findMany({
      where: {
        storeCode: params.storeCode
      }
    })

     if(color ){
       return (
         <div className='p-4 flex flex-col flex-1'>
           <StoreColor colors={colors} colorData={color} />
         </div>
       )
     }

     else {

       return (
         <div className='p-4 flex flex-col flex-1'>
           <StoreColor colors={colors} />
         </div>
       )
     }


}

export default ColorPage
