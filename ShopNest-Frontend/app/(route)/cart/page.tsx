'use client'
import { ShoppingCart } from 'lucide-react'

import Summary from './components/summary'
import CartItem from './components/cartItem'
import OnlyClient from '@/components/globals/OnlyClient'
import Container from '@/components/ui/container'
import useCartState from '@/lib/state/CartState'

const CartPage = () => {
  const { items, deleteItem, deleteAll } = useCartState()
  return (
    <OnlyClient>
      <Container>
        <div className="px-4 py-16 sm:px-6 md:px-8">
          <div className="flex items-center space-x-4">
            <div className="bg-primary rounded-full p-2">
              <ShoppingCart color="white" size={24} />
            </div>
            <h1 className="font-bold text-primary text-3xl">
              Shopping cart
            </h1>
          </div>
          <div className="mt-10 lg:grid lg:grid-cols-12 lg:items-start gap-x-10">
            <div className="lg:col-span-7">
              {items.length === 0 && (
                <p className="font-semibold text-medium text-primary">
                  No items added to cart
                </p>
              )}
              <ul>
                {items.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
              </ul>
            </div>
            <Summary />
          </div>
        </div>
      </Container>
    </OnlyClient>
  )
}

export default CartPage
