import { format } from 'date-fns'

import { BillboardProps } from '@/components/Billboards/BillboardsTable/columns'
import StoreBillBoards from '@/components/Billboards/StoreBillBoards'
import prismaDB from '@/lib/prismaClient'
const BillboardsPage = async ({ params }: { params: { storeCode: string } }) => {
  const billBoards = await prismaDB.billboard.findMany({
    where: {
      storeCode: params.storeCode
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  const formatedBillboards: BillboardProps[] = billBoards?.map((item) => ({
    id: item.id,
    label: item.label,
    createdAt: format(item.createdAt, 'MMMM do, yyyy')
  }))

  return (
    <div className='p-4 flex flex-col flex-1'>
      <StoreBillBoards billBoards={formatedBillboards} />
    </div>
  )
}

export default BillboardsPage
