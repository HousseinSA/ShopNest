import { redirect } from 'next/navigation'
import StoreCategory from '@/components/Categories/category/StoreCategory'
import validateObjectId from '@/lib/mongodDBValidate'
import prismaDB from '@/lib/prismaClient'

async function CategoryPage({ params }: { params: { categoryCode: string; storeCode: string } }) {
  const validStoreCode = validateObjectId(params.storeCode)
  const validCategoryCode = validateObjectId(params.categoryCode)

  if (!validStoreCode) {
    redirect('/')
  }

  if (!validCategoryCode && params.categoryCode !== 'new' )  {
    redirect(`/${params.storeCode}/categories`)
  }

  const billboards = await prismaDB.billboard.findMany({
    where: {
      storeCode: params.storeCode
    }
  })
   if (validCategoryCode){
    const category = await prismaDB.category.findUnique({
      where: {
        id: params.categoryCode
      }
    })
    if(category ){
      return (
        <div className='p-4 flex flex-col flex-1'>
          <StoreCategory billboards={billboards} categoryData={category} />
        </div>
      )
    }
   
    
   }

   return (
    <div className='p-4 flex flex-col flex-1'>
      <StoreCategory billboards={billboards} />
    </div>
  )
  
}

export default CategoryPage
