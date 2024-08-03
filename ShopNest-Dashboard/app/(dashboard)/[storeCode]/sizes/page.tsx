import { format } from 'date-fns'

import prismaDB from '@/lib/prismaClient'
import { SizeProps } from '@/components/Sizes/SizesTable/columns'
import StoreSizes from '@/components/Sizes/StoreSizes'
import validateObjectId from '@/lib/mongodb/mongodDBValidate'

const SizesPage = async ({ params }: { params: { storeCode: string } }) => {
  const validStoreCode = validateObjectId(params.storeCode)
  if (validStoreCode) {
    const sizes = await prismaDB.size.findMany({
      where: {
        storeCode: params.storeCode
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    const formattedSizes: SizeProps[] = sizes?.map((size) => ({
      id: size.id,
      name: size.name,
      value:size.value,
      createdAt: format(size.createdAt, 'MMMM do, yyyy')
    }))

    return (
      <div className='p-4 flex flex-col flex-1'>
        <StoreSizes sizes={formattedSizes} />
      </div>
    )
  }
  
}

export default SizesPage
