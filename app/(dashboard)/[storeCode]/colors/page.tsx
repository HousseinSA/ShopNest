import { format } from 'date-fns'

import prismaDB from '@/lib/prismaClient'
import { ColorProps } from '@/components/colors/ColorTable/columns'
import StoreColors from '@/components/colors/StoreColors'
const CategoriesPage = async ({ params }: { params: { storeCode: string } }) => {
  const colors = await prismaDB.color.findMany({
    where: {
      storeCode: params.storeCode
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  const formattedCategory: ColorProps[] = colors?.map((color) => ({
    id: color.id,
    name: color.name,
    value: color.value,
    createdAt: format(color.createdAt, 'MMMM do, yyyy')
  }))

  return (
    <div className='p-4 flex flex-col flex-1'>
      <StoreColors colors={formattedCategory} />
    </div>
  )
}

export default CategoriesPage
