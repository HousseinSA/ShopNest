import prismaDB from '../prismaClient'

export const getInStockCount = async (storeCode: string) => {
  const inStockProducts = await prismaDB.product.count({
    where: {
      storeCode,
      isArchived: false
    },
  })


  return inStockProducts
}
