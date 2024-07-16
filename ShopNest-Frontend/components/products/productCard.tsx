'use client'
import React, { useState, useRef, useEffect, MouseEventHandler } from 'react'
import { useRouter } from 'next/navigation'
import { Scaling, ShoppingCart } from 'lucide-react'
import { CldImage } from 'next-cloudinary'

import { Product as ProductData } from '@/lib/StoreTypes'
import ButtonIcon from '@/components/ui/IconButton'
import Currency from '@/components/products/currency'
import usePreviewModal from '@/lib/state/ModalState'
import useCartState from '@/lib/state/CartState'
import { triggerAnimation } from '@/components/products/addToCartTrigger'
import Image from 'next/image'

interface testingProduct {
  name: string
  id: string
  image: string
  price: number
  category: string
}
interface Product {
  product: ProductData
  // product: testingProduct
}

const ProductCard: React.FC<Product> = ({ product }) => {
  const route = useRouter()
  const imgRef = useRef<HTMLImageElement>(null)

  const onClick = () => {
    route.push(`/product/${product.id}`)
  }

  // previewModal handler state
  const { open } = usePreviewModal()
  const onPreview: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation()
    open(product)
  }

  // cart handler state
  const { addItem, items } = useCartState()

  const existingItem = items.find((item) => item.id === product.id)

  const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation()
    addItem(product)
    if (!existingItem) {
      triggerAnimation(imgRef)
    }
  }

  return (
    <div
      onClick={onClick}
      className="rounded-xl cursor-pointer bg-white group border p-3 shadow-md relative"
    >
      <div className="aspect-square relative bg-white rounded-xl ">
        <CldImage
          ref={imgRef}
          removeBackground
          fill
          src={product.images[0].url}
          alt={product.name}
          className="aspect-square object-contain object-center rounded-xl"
        />
        <div className="opacity-0 group-hover:opacity-100 transition absolute w-full px-6 bottom-5">
          <div className="flex justify-center gap-x-4">
            <ButtonIcon
              icon={<Scaling size={15} color="white" />}
              onClick={onPreview}
            />
            <ButtonIcon
              onClick={onAddToCart}
              icon={<ShoppingCart size={15} color="white" />}
            />
          </div>
        </div>
      </div>
      {/* description */}
      <div>
        <p className="font-bold text-lg capitalize text-primary ">
          {product.category.name}
          {/* {product.category} */}
        </p>
        <p className="text-sm font-semibold capitalize text-gray-700 m-0 ">
          {product.name}
        </p>
      </div>
      {/* price */}
      <Currency data={product.price} />
    </div>
  )
}

export default ProductCard
