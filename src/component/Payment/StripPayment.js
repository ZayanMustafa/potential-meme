'use client';
import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

const StripeForm = ({ price, onSuccess, onClose }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    setProcessing(true);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    if (error) {
      alert(error.message);
      setProcessing(false);
      return;
    }

    // Pass payment data to parent
    onSuccess({
      paymentId: paymentMethod.id,
      last4: paymentMethod.card.last4
    });
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

const StripePayment = ({ price, onSuccess, onClose }) => (
  <Elements stripe={stripePromise}>
    <StripeForm 
      price={price}
      onSuccess={onSuccess}
      onClose={onClose}
    />
  </Elements>
);

export default StripePayment;