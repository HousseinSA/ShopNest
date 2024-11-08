import React from 'react'

import getProducts from '@/lib/fetchData/getProducts'
import getProduct from '@/lib/fetchData/getProduct'
import Container from '@/components/ui/container'
import Product from './components/product'
import RelatedProducts from '@/components/products/product/RelatedProducts'

interface ProductProps {
  params: {
    productCode: string
  }
}

export const revalidate = 0
const ProductPage = async ({ params }: ProductProps) => {
  const product = await getProduct(params.productCode)
  const productByCategory = await getProducts({
    categoryCode: product.category.id,
  })
  const relatedProducts = productByCategory?.filter(
    (item) => item.id !== product.id
  )

  return (
    <Container>
      <Product product={product} />
      <RelatedProducts title="Related products" products={relatedProducts} />
    </Container>
  )
}

export default ProductPage
