'use client'
import {ShoppingBag} from 'lucide-react'
import { useRouter } from 'next/navigation'


import OnlyClient from '@/components/globals/OnlyClient'
import useCartState from '@/lib/state/CartState'
import {Button} from '@/components/ui/button'




const CartButton = () => {

  const route = useRouter()

const {items} = useCartState() 

  return (
    <OnlyClient>
    <div  className=' w-8 h-8 md:h-11 md:w-11'>
      <Button id='cart-icon' onClick={()=>route.push('/cart')}   className='relative bg-primary rounded-full p-2 w-full h-full  disabled:cursor-not-allowed transition hover:primary-foreground flex items-center text-white'>
        <ShoppingBag  size={18} color='white'/>
      <div className='absolute md:-top-2 -top-1.5 w-4 h-4  md:w-5 md:h-5 -left-1 justify-center flex items-center bg-red-500 rounded-full'>
        <span className='text-xs font-semibold md:font-bold lg:text-sm'>{items.length}</span>
      </div>
      </Button>
    </div>
    </OnlyClient>
  )
}

export default CartButton