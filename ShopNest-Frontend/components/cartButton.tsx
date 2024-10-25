'use client'
import { ShoppingBag } from 'lucide-react'
import { useRouter } from 'next/navigation'
import useCartState from '@/lib/state/CartState'
import { Button } from '@/components/ui/button'

const CartButton = () => {
  const route = useRouter()

  const { items } = useCartState()

  return (
      <div className=" w-8 h-8 md:h-11 md:w-11">
        <Button
          id="cart-icon"
          onClick={() => route.push('/cart')}
          className="relative bg-primary rounded-full p-2 w-full h-full disabled:cursor-not-allowed transition hover:primary-foreground flex items-center text-white"
        >
          <ShoppingBag size={18} color="white" />
          {items.length > 0 
          &&
          <div className="absolute md:-top-2 -top-1.5 w-4 h-4  md:w-6 md:h-6 -left-1  justify-center flex items-center bg-red-500 rounded-full">
            <span className="text-xs text-center font-semibold md:font-bold lg:text-sm">
              {items.length}
            </span>
          </div>
}
        </Button>
      </div>
  )
}

export default CartButton
