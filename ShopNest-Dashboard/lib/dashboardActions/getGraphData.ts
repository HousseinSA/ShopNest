import prismaDB from '../prismaClient'

interface GraphProps {
  name: string
  total: number
}

export const getGraphData = async (storeCode: string) => {
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

  const monthlyRevenue: { [key: number]: number } = {}
  for (let order of paidOrders) {
    const month = order.createdAt.getMonth()
    let revenueForOrder = 0

    for (let item of order.orderItems) {
      revenueForOrder += item.product.price
    }
    monthlyRevenue[month] = (monthlyRevenue[month] || 0) + revenueForOrder
  }

  const graphData: GraphProps[] = [
    { name: 'Jan', total: 0 },
    { name: 'Feb', total: 0 },
    { name: 'Mar', total: 0 },
    { name: 'Apr', total: 0 },
    { name: 'May', total: 0 },
    { name: 'Jui', total: 0 },
    { name: 'jul', total: 0 },
    { name: 'Aug', total: 0 },
    { name: 'Sep', total: 0 },
    { name: 'Oct', total: 0 },
    { name: 'Nov', total: 0 },
    { name: 'Dec', total: 0 }
  ]

  for (const month in monthlyRevenue) {
    graphData[parseInt(month)].total = monthlyRevenue[parseInt(month)]
  }
  return graphData
}
