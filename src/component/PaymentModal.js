// components/PaymentModal.js
'use client';
import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

const CheckoutForm = ({ vehicleType, price, onClose }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    if (error) {
      console.error(error);
      setProcessing(false);
      return;
    }

    // Send paymentMethod.id to your backend
    const response = await fetch('/api/process-payment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        paymentMethodId: paymentMethod.id,
        amount: price * 100, 
        vehicleType,
      }),
    });

    const result = await response.json();
    setProcessing(false);

    if (result.success) {
      alert('Payment successful!');
      onClose();
    } else {
      alert('Payment failed: ' + result.error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <CardElement className="p-2 border border-gray-300 rounded" />
      
      <div className="flex justify-between items-center">
        <span className="text-xl font-bold">Total: ${price.toFixed(2)}</span>
        <div className="space-x-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!stripe || processing}
            className="px-4 py-2 bg-red-600 text-white rounded disabled:opacity-50"
          >
            {processing ? 'Processing...' : 'Pay Now'}
          </button>
        </div>
      </div>
    </form>
  );
};

const PaymentModal = ({ show, onClose, vehicleType, price }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Complete Your {vehicleType} Report Purchase</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            &times;
          </button>
        </div>
        
        <div className="mb-6">
          <h4 className="font-medium mb-2">Payment Method</h4>
          <div className="flex space-x-2 mb-4">
            <button className="px-4 py-2 border border-gray-300 rounded">
              Credit Card
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded">
              PayPal
            </button>
          </div>
          
          <Elements stripe={stripePromise}>
            <CheckoutForm 
              vehicleType={vehicleType} 
              price={price} 
              onClose={onClose} 
            />
          </Elements>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;