import { format } from 'date-fns'

import { ProductProps } from '@/components/products/ProductsTable/columns'
import StoreProducts from '@/components/products/StoreProducts'
import prismaDB from '@/lib/prismaClient'
import { PriceFormatter } from '@/lib/PriceFormatter'
import validateObjectId from '@/lib/mongodb/mongodDBValidate'

import { redirect } from 'next/navigation'
const ProductsPage = async ({ params }: { params: { storeCode: string } }) => {
  const validBillBoardCode = validateObjectId(params.storeCode)

  if (validBillBoardCode) {
    const products = await  prismaDB.product.findMany({
      where: {
        storeCode: params.storeCode
      },
      include: { category: true, size: true, color: true,images:true },
      orderBy: {
        createdAt: 'desc'
      }
    })

    const formattedProducts: ProductProps[] = products?.map((product) => ({
      id: product.id,
      name: product.name,
      price: PriceFormatter.format(product.price),
      images:product.images, 
      isFeatured: product.isFeatured,
      isArchived: product.isArchived,
      category: product.category.name,
      size: product.size.value,
      color: product.color.value,
      createdAt: format(product.createdAt, 'MMMM do, yyyy')
    }))

    return (
      <div className='p-4 flex flex-col flex-1'>
        <StoreProducts products={formattedProducts} />
      </div>
    )
  }
  redirect(`/`)
}

export default ProductsPage
