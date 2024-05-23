import { format } from 'date-fns'

import prismaDB from '@/lib/prismaClient'
import { OrderProps } from '@/components/orders/orderTable/columns'
import StoreOrders from '@/components/orders/StoreOrders'
import { PriceFormatter } from '@/lib/PriceFormatter'
import validateObjectId from '@/lib/mongodDBValidate'
import { redirect } from 'next/navigation'


const OrdersPage = async ({ params }: { params: { storeCode: string } }) => {
  const validStoreCode = validateObjectId(params.storeCode)
  
if(!validStoreCode){
  redirect('/')
}
  
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
    products: [order.orderItems.map((orderItem) => orderItem.product.name).join(',')],
    price: PriceFormatter.format(order.orderItems.reduce((total, order) => total + Number(order.product.price), 0)),
    isPaid: order.isPaid,
    createdAt: format(order.createdAt, 'MMMM do, yyyy')
  }))

  return (
    <div className='p-4 flex flex-col flex-1'>
      <StoreOrders orders={formattedCategory} />
    </div>
  )
}

export default OrdersPage
