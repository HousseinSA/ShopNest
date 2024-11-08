'use client'

import { Product } from '@/lib/StoreTypes'
import ProductCard from '@/components/products/product/productCard'

interface ProductsProps {
  products: Product[]
  title?: string
}

const RelatedProducts: React.FC<ProductsProps> = ({
  products,
  title,
}) => {



  if (products.length === 0) {
    return null
  }

  return (
    <div className="sm:px-4 sm:pb-4 mb-4 lg:px-10 lg:py-10 pb-20 ">
      {products.length !== 0 && <hr className="my-3 md:my-4 " />}
      {title && (
        <h3 className=" text-primary text-xl sm:text-xl md:text-2xl font-semibold mb-4">
          {title}
        </h3>
      )}
      <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

export default RelatedProducts
