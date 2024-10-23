// "use client"; // Ensure this component is client-side

// import React, { useState } from 'react';
// import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
// import axios from 'axios';
// import toast from 'react-hot-toast';

// const PaymentForm = ({ productsIds }) => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     setLoading(true);

//     if (!stripe || !elements) {
//       return;
//     }

//     const cardElement = elements.getElement(CardElement);

//     try {
//       const response = await axios.post('/api/checkout', { productsIds });

//       const { clientSecret } = response.data;

//       const result = await stripe.confirmCardPayment(clientSecret, {
//         payment_method: {
//           card: cardElement,
//           billing_details: {
//             name: 'Demo User', // Pre-filled demo name
//             phone: '123-456-7890', // Pre-filled demo phone
//             // Include other pre-filled details if necessary
//           },
//         },
//       });

//       if (result.error) {
//         toast.error(result.error.message);
//       } else {
//         if (result.paymentIntent.status === 'succeeded') {
//           toast.success('Payment successful!');
//           // Optionally redirect or show success message
//         }
//       }
//     } catch (error) {
//       console.error('Error during payment:', error);
//       toast.error('Payment failed. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <CardElement options={{ hidePostalCode: true }} />
//       <button type="submit" disabled={!stripe || loading}>
//         {loading ? 'Processing...' : 'Pay Now'}
//       </button>
//       <div>
//         <strong>Test Card Information:</strong><br />
//         <div>Card Number: <code>4242 4242 4242 4242</code></div>
//         <div>Expiration: <code>12/34</code></div>
//         <div>CVC: <code>123</code></div>
//         <div>ZIP: <code>12345</code></div>
//         <small>Use this card for testing successful payments.</small>
//       </div>
//     </form>
//   );
// };

// export default PaymentForm;