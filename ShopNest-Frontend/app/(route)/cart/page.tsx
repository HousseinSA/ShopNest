'use client'
import React from 'react'
import { ShoppingBag, ShoppingCart } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from '@headlessui/react'

import Summary from './components/summary'
import CartItem from './components/cartItem'
import Container from '@/components/ui/container'
import useCartState from '@/lib/state/CartState'
  

const CartPage = () => {
  const { items } = useCartState()
const {data:session} = useSession()
  // @ts-expect-error ignore id
  const userId = session?.user?.id 
  const router = useRouter()

  const userItems = items.filter((item) => item.userId === userId)

  return (
      <Container>
        <div className="px-4 py-16 sm:px-6 md:px-8 min-h-screen">
          <div className="flex items-center space-x-4">
            <div className="bg-primary rounded-full p-2">
              <ShoppingCart color="white" size={24} />
            </div>
            <h1 className="font-bold text-primary text-3xl">Shopping cart</h1>
          </div>
          <div className="mt-10 lg:grid lg:grid-cols-12 lg:items-start gap-x-10">
            <div className="lg:col-span-7">
              {userItems.length === 0 && (
                <div className="flex items-center gap-8">
                  <p className="font-semibold text-medium text-primary">
                    Cart is empty!
                  </p>
                  <Button
                    onClick={() => router.push('/')}
                    className="relative bg-primary gap-3 rounded-full p-3 px-4 disabled:cursor-not-allowed transition hover:primary-foreground flex items-center text-white"
                  >
                    <ShoppingBag size={18} color="white" />
                    Add products
                  </Button>
                </div>
              )}
              <ul>
                {userItems.map(({ product }) => (
                  <CartItem key={product.id} item={product} />
                ))}
              </ul>
            </div>
            {userItems.length > 0 && <Summary />}
          </div>
        </div>
      </Container>
  )
}

export default CartPage
