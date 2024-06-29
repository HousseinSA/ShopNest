'use client'
import React, {useRef} from 'react'


import { Product } from '@/lib/StoreTypes'
import Gallery from "@/components/products/product/galleryComponent/gallery";
import Info from "@/components/products/product/info";

interface ProductMainProps {
    product: Product
}

const ProductMain:React.FC<ProductMainProps> = ({product}) => {
    const imgRef = useRef<HTMLImageElement>(null)
    return (
    <div className="grid grid-cols-1 w-full  lg:grid-cols-2 lg:gap-8">
    <Gallery  imgRef={imgRef} images={product.images} 
     />
    <div className="mt-10 px-4 md:mt-16 lg:mt-0">
      <Info imgRef={imgRef} product={product}
       />
    </div>
  </div>
  )
}

export default ProductMain