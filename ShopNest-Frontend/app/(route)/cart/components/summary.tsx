'use client'
import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import { useSearchParams } from 'next/navigation'
import toast from 'react-hot-toast'

import Currency from '@/components/products/currency'
import useCartState from '@/lib/state/CartState'
import FormButton from "@/components/globals/formButton"

const Summary = () => {
  const searchParams = useSearchParams()
  const { items, deleteAll } = useCartState()
  const removeAll = () => deleteAll()
  const [loading, setLoading] = useState(false)
  const totalPrice = items.reduce(
    (total, item) => total + Number(item.price),
    0
  )

  const toastShown = useRef(false)

  // useEffect to handle cart actions based on URL params
  useEffect(() => {
    const success = searchParams.get('success')
    const canceled = searchParams.get('canceled')
    
    if (success) {
      removeAll()
      setLoading(false)
    }
    
    if (canceled) {
      setLoading(false)
    }
  }, [searchParams, removeAll])

  // Separate useEffect for toast messages
  useEffect(() => {
    const success = searchParams.get('success')
    const canceled = searchParams.get('canceled')

    if (success && !toastShown.current) {
      toast.success('Payment Completed', {
        duration: 2000,
        position: 'bottom-center',
      })
      toastShown.current = true
    }
    
    if (canceled && !toastShown.current) {
      toast.error('Something went wrong', {
        duration: 2000,
        position: 'bottom-center',
      })
      toastShown.current = true
    }

    // Reset the ref when the params change
    return () => {
      toastShown.current = false
    }
  }, [searchParams])

  const onSummary = async () => {
    setLoading(true)
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_STORE_URL}/checkout`,
        {
          productsIds: items.map((item) => item.id),
        }
      )
      
      window.location = response.data.url
    } catch (error) {
      console.error('Checkout error:', error)
      toast.error('Failed to initiate checkout')
      setLoading(false)
    }
  }

  return (
    <div className="mt-10 rounded-lg px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8 bg-gray-50 ">
      <h2 className="text-lg font-medium text-primary">
        Order Summary
      </h2>
      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <div className="text-base font-medium text-primary">
            Order Total
          </div>
          <Currency data={totalPrice} />
        </div>
      </div>
      <FormButton 
        onClick={onSummary}
        className="w-full mt-5 rounded-2xl "
        loading={loading}
        disabled={items.length === 0}
      >
        {loading ? 'Processing...' : 'Checkout'}
      </FormButton>
    </div>
  )
}

export default Summary