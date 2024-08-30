'use client'
import { useState, useEffect } from 'react'

import { Product } from '@/lib/StoreTypes'
import ProductCard from '@/components/products/productCard'
import useSSE from '@/hooks/useSSE'

interface ProductsProps {
  products: Product[]
  title?: string
}

const RelatedProducts: React.FC<ProductsProps> = ({
  products: productsData,
  title,
}) => {
  const [products, setProducts] = useState(productsData)

  const sseData = useSSE('/api/updates')
  // console.log(sseData) // eslint-disable
  useEffect(() => {
    if (sseData) {
      if (sseData.operationType === 'update' && sseData.ns.coll === 'Product') {
        setProducts((prevProducts) => {
          const updatedProducts = prevProducts.map((product) =>
            product.id === sseData.documentKey._id
              ? { ...product, ...sseData.updateDescription.updatedFields }
              : product
          )
          return updatedProducts
        })
      } else if (
        sseData.operationType === 'insert' &&
        sseData.ns.coll === 'Product'
      ) {
        setProducts((prevProducts) => [...prevProducts, sseData.fullDocument])
      }
    }
  }, [sseData])

  if (products.length === 0) {
    return null
  }

  return (
    <div className=" sm:p-6 lg:p-8">
      {title && (
        <h3 className="text-2xl sm:text-3xl text-primary md:text-4xl font-bold mb-6">
          {title}
        </h3>
      )}
      <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

export default RelatedProducts
