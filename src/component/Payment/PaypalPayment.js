'use client';
import { useState, useEffect } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

const PayPalPayment = ({ price, customerInfo, vehicleType, onSuccess, onClose }) => {
  const [paid, setPaid] = useState(false);

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [{
        amount: {
          value: price.toFixed(2),
          currency_code: 'USD'
        },
        description: `${vehicleType} Vehicle Report`
      }],
      application_context: {
        shipping_preference: 'NO_SHIPPING'
      }
    });
  };

  const onApprove = async (data, actions) => {
    const order = await actions.order.capture();
    onSuccess({
      paymentId: order.id,
      payerEmail: order.payer.email_address
    });
    setPaid(true);
  };

  return (
    <PayPalScriptProvider options={{ 
      'client-id': process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
      currency: 'USD'
    }}>
      <div className="p-4 border border-gray-300 rounded-md bg-gray-50">
        {paid ? (
          <div className="text-center text-green-600">
            Payment successful! Redirecting...
          </div>
        ) : (
          <>
            <p className="text-center mb-4">You&apos;ll be redirected to PayPal to complete your payment</p>
            <PayPalButtons
              style={{ layout: 'vertical' }}
              createOrder={createOrder}
              onApprove={onApprove}
              onError={(err) => {
                console.error('PayPal error:', err);
                alert('PayPal payment failed');
              }}
            />
          </>
        )}
      </div>
    </PayPalScriptProvider>
  );
};

export default PayPalPayment;