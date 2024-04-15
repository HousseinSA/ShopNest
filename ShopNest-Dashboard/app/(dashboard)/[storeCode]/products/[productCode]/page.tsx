import { redirect } from 'next/navigation'

import StoreProduct from '@/components/products/Product/StoreProduct'
import validateObjectId from '@/lib/mongodDBValidate'
import prismaDB from '@/lib/prismaClient'

async function ProductPage({ params }: { params: { productCode: string; storeCode: string } }) {
  const validProductCode = validateObjectId(params.productCode)
  const validStoreCode = validateObjectId(params.storeCode)

  const categories = await prismaDB.category.findMany({
    where: {
      storeCode: params.storeCode
    }
  })
  const sizes = await prismaDB.size.findMany({
    where: {
      storeCode: params.storeCode
    }
  })
  const colors = await prismaDB.color.findMany({
    where: {
      storeCode: params.storeCode
    }
  })
  if (validProductCode && validStoreCode) {
    const product = await prismaDB.product.findUnique({
      where: {
        id: params.productCode,
        storeCode: params.storeCode
      },
      include: { images: true }
    })
    return (
      <div className='p-4 flex flex-col flex-1'>
        <StoreProduct categories={categories} sizes={sizes} colors={colors} productData={product} />
      </div>
    )
  }
  if (!validStoreCode) return redirect(`/`)
  return (
    <div className='p-4 flex flex-col flex-1'>
      <StoreProduct categories={categories} sizes={sizes} colors={colors} />
    </div>
  )
}

export default ProductPage
