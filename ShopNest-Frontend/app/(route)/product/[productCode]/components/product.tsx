'use client'
import React, {useRef} from 'react'


import { Product as productProp } from '@/lib/StoreTypes'
import Gallery from "@/components/products/product/galleryComponent/gallery";
import Info from "@/components/products/product/info";

interface productProps {
    product: productProp
}

const Product:React.FC<productProps> = ({product}) => {
    const imgRef = useRef<HTMLImageElement>(null)
    return (
    <div className="grid grid-cols-1 w-full mb-0 sm:px-6 lg:px-8 lg:grid-cols-2 lg:gap-8">
    <Gallery  imgRef={imgRef} images={product.images} 
     />
    <div className="mt-10 md:mt-16 lg:mt-0">
      <Info imgRef={imgRef} product={product}
       />
    </div>
  </div>
  )
}

export default Product