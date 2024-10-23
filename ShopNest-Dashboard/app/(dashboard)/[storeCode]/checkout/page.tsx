// // app/checkout/page.js
// 'use client'
// import { useSearchParams } from 'next/navigation';
// import PaymentForm from '@/components/globals/PaymentForm';

// const CheckoutPage = () => {
//   const searchParams = useSearchParams();
//   const productsIds = JSON.parse(searchParams.get('productsIds')) || []; // Parse productsIds from query

//   return (
//     <div>
//       <h1>Checkout</h1>
//       <PaymentForm productsIds={productsIds} />
//     </div>
//   );
// };

// export default CheckoutPage;