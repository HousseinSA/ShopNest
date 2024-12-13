import { format } from 'date-fns'

import { ProductProps } from '@/app/(dashboard)/[storeCode]/products/components/ProductsTable/columns'
import StoreProducts from '@/app/(dashboard)/[storeCode]/products/components/StoreProducts'
import prismaDB from '@/lib/prismaClient'
import { PriceFormatter } from '@/lib/PriceFormatter'
import validateObjectId from  '@/lib/mongodb/mongodDBValidate'
import { userInfo } from '@/lib/userInfo' 
import NotRegisteredUser from '@/components/globals/NotRegisteredUser'

import { redirect } from 'next/navigation'
const ProductsPage = async ({ params }: { params: { storeCode: string } }) => {
  const validBillBoardCode = validateObjectId(params.storeCode)

  const {userId} = await userInfo(params.storeCode)

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
         {!userId && <NotRegisteredUser/>}
        <StoreProducts products={formattedProducts} />
      </div>
    )
  }
  redirect(`/`)
}

export default ProductsPage
