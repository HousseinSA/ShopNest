import prismaDB from '../prismaClient'

export const getSalesCount = async (storeCode: string) => {
  const sales = await prismaDB.order.count({
    where: {
      storeCode,
      isPaid: true
    },
  })


  return sales
}
