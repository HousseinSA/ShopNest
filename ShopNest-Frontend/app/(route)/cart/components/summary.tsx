'use client'
import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';

import Currency from '@/components/products/currency';
import useCartState from '@/lib/state/CartState';
import FormButton from "@/components/globals/formButton";

type summaryProps ={
  storeId:string
}
const Summary = ({storeId}:summaryProps) => {
  const searchParams = useSearchParams();
  const { items, deleteAll, userId } = useCartState();
  
  // Memoize removeAll to avoid it being recreated on each render
  const removeAll = useCallback(() => {
    deleteAll();
  }, [deleteAll]);

  const [loading, setLoading] = useState(false);
  const userItems = items.filter (item => item.userId === userId)
  // Calculate total price using product price
  const totalPrice = userItems.reduce(
    (total, item) => total + Number(item.product.price), // Access price through product
    0
  );

  // useEffect to give feedback message
  useEffect(() => {
    const success = searchParams.get('success');
    const canceled = searchParams.get('canceled');

    if (success) {
      removeAll(); // Call the memoized removeAll function
      toast.success('Payment Completed');
      setLoading(false);
    }

    if (canceled) {
      toast.error('Something went wrong');
      setLoading(false);
    }
  }, [searchParams, removeAll]);

  const onSummary = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_STORE_URL}${storeId}/checkout`,
        {
          productsIds: userItems.map((item) => item.product.id), // Access id through product
        }
      );
      
      window.location.href = response.data.url; // Use href for clarity
    }catch (error) {
      // Assert that error is an instance of Error
      const message = (error as Error).message || 'Checkout failed. Please try again.';
      toast.error(message);
      setLoading(false);
    }
  };

  return (
    <div className="mt-10 rounded-lg px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8 bg-gray-50">
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
        className="w-full mt-5 rounded-2xl"
        loading={loading}
        disabled={userItems.length === 0}
      >
        {loading ? 'Checking' : 'Checkout'}
      </FormButton>
    </div>
  );
}

export default Summary;