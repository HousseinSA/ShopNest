  import { redirect } from 'next/navigation'

  import StoreCategory from '@/components/Categories/category/StoreCategory'
  import validateObjectId from '@/lib/mongodDBValidate'
  import prismaDB from '@/lib/prismaClient'

  async function CategoryPage({ params }: { params: { categoryCode: string; storeCode: string } }) {
    const validStoreCode = validateObjectId(params.storeCode)
    const validCategoryCode = validateObjectId(params.categoryCode)

    if (!validStoreCode) {
      redirect('/')

    }else if(!validCategoryCode){
        redirect(`/${params.storeCode}/categories`)
      }

      const billboards = await prismaDB.billboard.findMany({
        where: {
          storeCode: params.storeCode
        }
      })
      
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

  export default CategoryPage
