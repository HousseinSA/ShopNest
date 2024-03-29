import StoreProduct from '@/components/products/Product/ProductComp/StoreProduct'
import validateObjectId from '@/lib/mongodDBValidate'
import prismaDB from '@/lib/prismaClient'

async function ProductPage({ params }: { params: { productCode: string; storeCode: string } }) {
  const validBillBoardCode = validateObjectId(params.productCode)
  const categories = await prismaDB.category.findMany({
    where: {
      id: params.storeCode
    }
  })
  const billboards = await prismaDB.billboard.findMany({
    where: {
      id: params.storeCode
    }
  })
  const sizes = await prismaDB.size.findMany({
    where: {
      id: params.storeCode
    }
  })
  const colors = await prismaDB.color.findMany({
    where: {
      id: params.storeCode
    }
  })
  if (validBillBoardCode) {
    const product = await prismaDB.product.findUnique({
      where: {
        id: params.productCode
      }
    })
    return (
      <div className='p-4 flex flex-col flex-1'>
        <StoreProduct categories={categories} sizes={sizes} colors={colors} productData={product} />
      </div>
    )
  }

  return (
    <div className='p-4 flex flex-col flex-1'>
      <StoreProduct categories={categories} sizes={sizes} colors={colors} />
    </div>
  )
}

export default ProductPage
