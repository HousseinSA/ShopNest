'use client'
import { ShoppingCart } from 'lucide-react'
import { Product } from '@/lib/StoreTypes'
import Currency from '@/components/products/currency'
import { Button } from '@/components/ui/button'
import useCartState from '@/lib/state/CartState'
import { ReactEventHandler } from 'react'
import { triggerAnimation } from '@/components/products/addToCartTrigger'
import { CapitalizedFirstLetter } from '@/globals/CapitalizedFirstLetter'

interface InfoProps {
  product: Product
  imgRef: React.RefObject<HTMLDivElement>
}

const Info: React.FC<InfoProps> = ({ product, imgRef }) => {
  const { addItem, items } = useCartState()
  const existingItem = items.find((item) => item.id === product.id)

  // add cart item state
  const onAddItem: ReactEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation()
    addItem(product)
    if (!existingItem) {
      triggerAnimation(imgRef)
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-primary">{CapitalizedFirstLetter(product.name)}</h1>
      <div className="flex items-end mt-3">
        <Currency className="text-2xl text-highlight" data={product.price} />
      </div>
      <hr className="my-4" />
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-x-4">
          <h3 className="font-bold text-primary">Size:</h3>
          <div className="font-semibold text-highlight capitalize">{product.size.name}</div>
        </div>
        <div className="flex items-center gap-x-4">
          <h3 className="font-bold text-primary">Color:</h3>
          {product.color.value === 'white' ? (
            <div className="font-semibold capitalize text-highlight ">white</div>
          ) : (
            <div
              className="w-10 h-10 text-highlight  rounded-full"
              style={{ background: product.color.value }}
            ></div>
          )}
        </div>
        <div className="mt-5">
          <Button
            onClick={onAddItem}
            className="bg-primary flex gap-x-2 hover:primary-foreground"
          >
            <ShoppingCart />
            Add To Cart
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Info
