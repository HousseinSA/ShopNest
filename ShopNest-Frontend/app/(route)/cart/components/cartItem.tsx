'use client'
import { CldImage } from 'next-cloudinary'
import { X } from 'lucide-react'

import { Product } from '@/lib/StoreTypes'
import ButtonIcon from '@/components/ui/IconButton'
import useCartState from '@/lib/state/CartState'
import Currency from '@/components/products/currency'
import {CapitalizedFirstLetter} from '@/components/globals/CapitalizedFirstLetter'

interface CartItemProps {
  item: Product
}
const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { deleteItem } = useCartState()

  const removeItem = ()=>{
    deleteItem(item.id)
  }
  return (
    <li className="flex py-6 border-b last:border-b-0 gap-x-4 sm:gap-x-6">
      <div className="relative h-24 w-24 rounded-md overflow-hidden sm:h-48 sm:w-48">
        <CldImage removeBackground
          fill
          src={item.images[0].url}
          className="aspect-square object-contain object-center rounded-xl"
          alt={item.name}
        />
      </div>
      <div className="relative flex flex-col flex-1 justify-between">
        <div className="absolute top-0 right-0 z-10">
          <ButtonIcon
            onClick={removeItem}
            icon={<X size={15} color="white" />}
            className='hover:bg-red-500'
          />
        </div>
        <div className="relative pr-9 sm:pr-0 sm:grid sm:grid-cols-2 sm:gap-x-4">
          <div className="flex justify-between">
            <p className="text-highlight font-semibold text-lg ">{CapitalizedFirstLetter(item.name)}</p>
          </div>
          <div className="mt-1 text-sm capitalize flex items-center gap-x-4">
            <p className="text-gray-500">{item.color.name}</p>
            <p className="text-gray-500 border-l pl-4">{item.size.name }</p>
          </div>
          <Currency data={item.price}/>
        </div>
      </div>
    </li>
  )
}

export default CartItem
