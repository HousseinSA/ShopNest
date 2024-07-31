import prismaDB from '../prismaClient'

export const getTotalRevenue = async (storeCode: string) => {
  const paidOrders = await prismaDB.order.findMany({
    where: {
      storeCode,
      isPaid: true
    },
    include: {
      orderItems: {
        include: {
          product: true
        }
      }
    }
  })

  const totalRevenue = paidOrders.reduce((total, order) => {
    const totalOrder = order.orderItems.reduce((orderSum, item) => {
      return orderSum + item.product.price
    }, 0)
    
    return total + totalOrder
  }, 0)

  return totalRevenue
}
