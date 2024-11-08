  'use client'
  import { ShoppingBag } from 'lucide-react'
  import { useRouter } from 'next/navigation'

  import useCartState from '@/lib/state/CartState'
  import { Button } from '@/components/ui/button'
  import { useSession } from 'next-auth/react'

    
  const CartButton = () => {
    const route = useRouter()
    const { items } = useCartState()

    const {data:session} = useSession()
    // @ts-expect-error ignore id
    const userId = session?.user?.id // Adjust according to your session structure
    const userItems = items.filter((item) => item.userId === userId) // Filter items for the logged-in user


    return (
        <div className=" w-8 h-8 md:h-11 md:w-11">
          <Button
            id="cart-icon"
            onClick={() => route.push('/cart')}
            className="relative bg-primary rounded-full p-2 w-full h-full disabled:cursor-not-allowed transition hover:primary-foreground flex items-center text-white"
          >
            <ShoppingBag size={18} color="white" />
            {userItems.length > 0 
            &&
            <div className="absolute md:-top-2 -top-1.5 w-4 h-4  md:w-6 md:h-6 -left-1  justify-center flex items-center bg-red-500 rounded-full">
              <span className="text-xs text-center font-semibold md:font-bold lg:text-sm">
                {userItems.length}
              </span>
            </div>
  }
          </Button>
        </div>
    )
  }

  export default CartButton
