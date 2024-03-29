import { format } from 'date-fns'

import prismaDB from '@/lib/prismaClient'
import { SizeProps } from '@/components/Sizes/SizesTable/columns'
import StoreSizes from '@/components/Sizes/StoreSizes'
const SizesPage = async ({ params }: { params: { storeCode: string } }) => {
  const sizes = await prismaDB.size.findMany({
    where: {
      storeCode: params.storeCode
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  const formatedSizes: SizeProps[] = sizes?.map((size) => ({
    id: size.id,
    name: size.name,
    value: size.value,
    createdAt: format(size.createdAt, 'MMMM do, yyyy')
  }))

  return (
    <div className='p-4 flex flex-col flex-1'>
      <StoreSizes sizes={formatedSizes} />
    </div>
  )
}

export default SizesPage
