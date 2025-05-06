// 'use client';
// import { useState } from 'react';
// import { loadStripe } from '@stripe/stripe-js';
// import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
// import InputField from './UI/Input';
// // import InputField from './ui/InputField';

// const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

// const CheckoutForm = ({ vehicleType, price, onClose, customerInfo }) => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [processing, setProcessing] = useState(false);

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     setProcessing(true);

//     const { error, paymentMethod } = await stripe.createPaymentMethod({
//       type: 'card',
//       card: elements.getElement(CardElement),
//     });

//     if (error) {
//       console.error(error);
//       setProcessing(false);
//       return;
//     }

//     // Send paymentMethod.id and customer info to your backend
//     const response = await fetch('/api/process-payment', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         paymentMethodId: paymentMethod.id,
//         amount: price * 100,
//         vehicleType,
//         customerInfo
//       }),
//     });

//     const result = await response.json();
//     setProcessing(false);

//     if (result.success) {
//       alert('Payment successful!');
//       onClose();
//     } else {
//       alert('Payment failed: ' + result.error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <CardElement className="p-2 border border-gray-300 rounded" />
      
//       <div className="flex justify-between items-center">
//         <span className="text-xl font-bold">Total: ${price.toFixed(2)}</span>
//         <div className="space-x-2">
//           <button
//             type="button"
//             onClick={onClose}
//             className="px-4 py-2 border border-gray-300 rounded"
//           >
//             Cancel
//           </button>
//           <button
//             type="submit"
//             disabled={!stripe || processing}
//             className="px-4 py-2 bg-red-600 text-white rounded disabled:opacity-50"
//           >
//             {processing ? 'Processing...' : 'Pay Now'}
//           </button>
//         </div>
//       </div>
//     </form>
//   );
// };

// const PaymentModalSection = ({ show, onClose, vehicleType, price }) => {
//   const [step, setStep] = useState('form'); // 'form' or 'payment'
//   const [paymentMethod, setPaymentMethod] = useState('creditcard'); // 'creditcard' or 'paypal'
//   const [customerInfo, setCustomerInfo] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     vin: '',
//     model: '',
//     year: ''
//   });

//   if (!show) return null;

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setCustomerInfo(prev => ({ ...prev, [name]: value }));
//   };

//   const handleFormSubmit = (e) => {
//     e.preventDefault();
//     // Validate form here if needed
//     setStep('payment');
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
//         <div className="flex justify-between items-center mb-4">
//           <h3 className="text-xl font-bold">
//             {step === 'form' 
//               ? `Get Your ${vehicleType} Report` 
//               : `Complete Your Purchase`}
//           </h3>
//           <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
//             &times;
//           </button>
//         </div>
        
//         {step === 'form' ? (
//           <form onSubmit={handleFormSubmit} className="space-y-4">
//             <InputField
//               label="Full Name"
//               id="name"
//               name="name"
//               value={customerInfo.name}
//               onChange={handleInputChange}
//             />
            
//             <InputField
//               label="Email Address"
//               id="email"
//               name="email"
//               type="email"
//               value={customerInfo.email}
//               onChange={handleInputChange}
//             />
            
//             <InputField
//               label="Phone Number"
//               id="phone"
//               name="phone"
//               type="tel"
//               value={customerInfo.phone}
//               onChange={handleInputChange}
//             />
            
//             <InputField
//               label="VIN Number"
//               id="vin"
//               name="vin"
//               value={customerInfo.vin}
//               onChange={handleInputChange}
//             />
            
//             <div className="grid grid-cols-2 gap-4">
//               <InputField
//                 label="Vehicle Model"
//                 id="model"
//                 name="model"
//                 value={customerInfo.model}
//                 onChange={handleInputChange}
//               />
              
//               <InputField
//                 label="Year"
//                 id="year"
//                 name="year"
//                 type="number"
//                 min="1900"
//                 max={new Date().getFullYear() + 1}
//                 value={customerInfo.year}
//                 onChange={handleInputChange}
//               />
//             </div>
            
//             <button
//               type="submit"
//               className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
//             >
//               Continue to Payment
//             </button>
//           </form>
//         ) : (
//           <div className="space-y-6">
//             <div>
//               <h4 className="font-medium mb-2">Payment Method</h4>
//               <div className="flex space-x-2 mb-4">
//                 <button
//                   onClick={() => setPaymentMethod('creditcard')}
//                   className={`px-4 py-2 border rounded-md ${paymentMethod === 'creditcard' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
//                 >
//                   Credit Card
//                 </button>
//                 <button
//                   onClick={() => setPaymentMethod('paypal')}
//                   className={`px-4 py-2 border rounded-md ${paymentMethod === 'paypal' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
//                 >
//                   PayPal
//                 </button>
//               </div>
              
//               {paymentMethod === 'creditcard' ? (
//                 <Elements stripe={stripePromise}>
//                   <CheckoutForm 
//                     vehicleType={vehicleType} 
//                     price={price} 
//                     onClose={onClose}
//                     customerInfo={customerInfo}
//                   />
//                 </Elements>
//               ) : (
//                 <div className="p-4 border border-gray-300 rounded-md bg-gray-50">
//                   <p className="text-center mb-4">You&apos;ll be redirected to PayPal to complete your payment</p>
//                   <button
//                     onClick={() => {
//                       // Implement PayPal redirect logic here
//                       alert('Redirecting to PayPal...');
//                     }}
//                     className="w-full py-3 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors"
//                   >
//                     Pay with PayPal
//                   </button>
//                 </div>
//               )}
//             </div>
            
//             <button
//               onClick={() => setStep('form')}
//               className="text-blue-600 hover:text-blue-800 text-sm"
//             >
//               ← Back to form
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PaymentModalSection;