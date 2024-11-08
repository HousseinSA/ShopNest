// app/api/auth/signin/loginWrap.tsx
'use client'; // Ensure this is at the top of your file

import React from 'react';
import { SessionProvider } from 'next-auth/react';
import CartPage from '../page'; // Adjust path as necessary

const CartPageWrapper = () => {
  return (
    <SessionProvider>
      <CartPage />
    </SessionProvider>
  );
};

export default CartPageWrapper;