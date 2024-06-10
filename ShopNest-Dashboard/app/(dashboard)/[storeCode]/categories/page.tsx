import { format } from 'date-fns'
import { redirect } from 'next/navigation'

import prismaDB from '@/lib/prismaClient'
import { CategoryProps } from '@/components/Categories/CategoryTable/columns'
import StoreCategories from '@/components/Categories/StoreCategories'
import validateObjectId from '@/lib/mongodDBValidate'

const CategoriesPage = async ({ params }: { params: { storeCode: string } }) => {
  const validStoreCode = validateObjectId(params.storeCode)
  if (validStoreCode) {
    const categories = await prismaDB.category.findMany({
      where: {
        storeCode: params.storeCode
      },
      include: { billboard: true },
      orderBy: {
        createdAt: 'desc'
      }
    })


    const formattedCategory: CategoryProps[] = categories?.map((category) => ({
      id: category.id,
      name: category.name,
      billboardLabel: category.billboard.label,
      createdAt: format(category.createdAt, 'MMMM do, yyyy')
    }))

    return (
      <div className='p-4 flex flex-col flex-1'>
        <StoreCategories categories={formattedCategory} />
      </div>
    )
  }

  redirect(`/`) 
}

export default CategoriesPage
