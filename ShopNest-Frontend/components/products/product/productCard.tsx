'use client'
import React, { useRef, MouseEventHandler } from 'react'
import { useRouter } from 'next/navigation'
import { Scaling, ShoppingCart } from 'lucide-react'
import { CldImage } from 'next-cloudinary'

import { Product as ProductData } from '@/lib/StoreTypes'
import ButtonIcon from '@/components/ui/IconButton'
import Currency from '@/components/products/currency'
import usePreviewModal from '@/lib/state/ModalState'
import useCartState from '@/lib/state/CartState'
import { triggerAnimation } from '@/components/products/addToCartTrigger'
import { CapitalizedFirstLetter } from '@/components/globals/CapitalizedFirstLetter'
interface Product {
  product: ProductData
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

  const existingItem = items.find((item) => item.product.id === product.id)

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
      <div className=" aspect-square relative bg-white rounded-xl">
        <CldImage
          ref={imgRef}
          fill
          src={product.images[0]?.url}
          alt={product.name}
          className="w-full h-full object-contain object-center rounded-xl"
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
        <p className="font-bold text-md text-primary">
          {CapitalizedFirstLetter(product.category.name)}
        </p>
        <p className="text-base text-highlight m-0">
          {CapitalizedFirstLetter(product.name)}
        </p>
      </div>
      {/* price */}
      <Currency data={product.price} />
    </div>
  )
}

export default ProductCard
