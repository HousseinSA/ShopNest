import { redirect } from 'next/navigation'

import StoreProduct from '@/app/(dashboard)/[storeCode]/products/components/Product/StoreProduct'
import validateObjectId from  '@/lib/mongodb/mongodDBValidate'

import prismaDB from '@/lib/prismaClient'

async function ProductPage({ params }: { params: { productCode: string; storeCode: string } }) {
  const validStoreCode = validateObjectId(params.storeCode)
  const validProductCode = validateObjectId(params.productCode)
  if (!validStoreCode) {
    redirect(`/`)
  }

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

  if (validProductCode) {
    const product = await prismaDB.product.findUnique({
      where: {
        id: params.productCode,
        storeCode: params.storeCode
      },
      include: { images: true }
    })
    if (product) {  
      return (
        <div className='p-4 flex flex-col flex-1'>
          <StoreProduct categories={categories} sizes={sizes} colors={colors} productData={product} />
        </div>
      )
    }
  }

  // Redirect if productCode is not valid and params.productCode is not 'new'
  if (!validProductCode && params.productCode !== 'new') {
    redirect(`/${params.storeCode}/products`)
  }



  // Return StoreProduct without product data if productCode is invalid or product is not found
  return (
    <div className='p-4 flex flex-col flex-1'>
      <StoreProduct categories={categories} sizes={sizes} colors={colors} />
    </div>
  )
}

export default ProductPage
