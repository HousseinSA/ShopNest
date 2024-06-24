'use client'

import OnlyClient from "@/components/globals/OnlyClient"
import Container from "@/components/ui/container"
import useCartState from "@/lib/state/CartState"

const CartPage = () => {
  const {items, deleteItem, deleteAll}  = useCartState()
  return (
    <OnlyClient>
      <div className="bg-white">
        <Container>
          <div className="px-4 py-16 sm:px-6 md:px-8">
            <h1 className="font-bold text-primary-mainColor text-3xl">Shopping Cart</h1>
          </div>
        </Container>
         </div>
    </OnlyClient>
  )
}

export default CartPage