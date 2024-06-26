'use client'
import React, { useEffect } from 'react'
import axios from 'axios'
import {useSearchParams} from 'next/navigation'
import toast from 'react-hot-toast'

import Currency from '@/components/products/currency'
import { Button } from '@/components/ui/button'
import useCartState from '@/lib/state/CartState'

const Summary = () => {
    const searchParams = useSearchParams()
  const { items, deleteAll } = useCartState()
  const removeAll = () => deleteAll()
const totalPrice = items.reduce((total, item)=> total + Number(item.price), 0)

// useEffect to give feedback message

useEffect(()=>{
        if(searchParams.get('success')){
            removeAll()
            toast.success('Payment Completed')
        }
        if(searchParams.get('canceled')){
            toast.error('Something went wrong')
        }
},[searchParams, removeAll ])



const onSummary = async ()=>{
const response = await axios.post(`${process.env.NEXT_PUBLIC_STORE_URL}/checkout`,{
    productsIds: items.map(item=>item.id)
})
window.location  = response.data.url 
}

  return (
    <div className="mt-10 rounded-lg px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8 bg-gray-50 ">
      <h2 className="text-lg font-medium text-primary-mainColor">
        Order Summary{' '}
      </h2>
      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <div className="text-base font-medium text-primary-mainColor">
            Order Total
          </div>
          <Currency data={totalPrice} />
        </div>
      </div>
      <Button onClick={onSummary} className="w-full mt-5 rounded-2xl bg-primary-mainColor hover:bg-primary-hoverMain ">
        Checkout
      </Button>
    </div>
  )
}

export default Summary
