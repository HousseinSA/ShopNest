import { format } from 'date-fns'

import prismaDB from '@/lib/prismaClient'
import { CategoryProps } from '@/components/Categories/CategoryTable/columns'
import StoreCategories from '@/components/Categories/StoreCategories'
const CategoriesPage = async ({ params }: { params: { storeCode: string } }) => {
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

export default CategoriesPage
