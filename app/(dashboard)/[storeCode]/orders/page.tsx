import { format } from 'date-fns'

import prismaDB from '@/lib/prismaClient'
import { OrderProps } from '@/components/orders/orderTable/columns'
import StoreOrders from '@/components/orders/StoreOrders'
const ColorsPage = async ({ params }: { params: { storeCode: string } }) => {
  const orders = await prismaDB.order.findMany({
    where: {
      storeCode: params.storeCode
    },
    include: { orderItems: { include: { product: true } } },
    orderBy: {
      createdAt: 'desc'
    }
  })

  const formattedCategory: OrderProps[] = orders?.map((order) => ({
    id: order.id,
    phone: order.phone,
    address: order.address,
    createdAt: format(order.createdAt, 'MMMM do, yyyy')
  }))

  return (
    <div className='p-4 flex flex-col flex-1'>
      <StoreOrders orders={formattedCategory} />
    </div>
  )
}

export default ColorsPage
