'use client'
import { useState } from 'react';
import StripePayment from './StripPayment';
import PayPalPayment from './PaypalPayment';

const PaymentStep = ({ customerInfo, price, vehicleType, onClose, setStep }) => {
  const [paymentMethod, setPaymentMethod] = useState('creditcard');

  const handlePaymentSuccess = async (paymentData) => {
    try {
      // Combine all data to send to your API
      const orderData = {
        ...customerInfo,
        vehicleType,
        price,
        paymentMethod,
        paymentData
      };

      // Send to your backend API
      const response = await fetch('/api/save-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });

      const result = await response.json();
      
      if (result.success) {
        alert('Payment successful! Your report will be generated shortly.');
        onClose();
      } else {
        throw new Error(result.error || 'Payment failed');
      }
    } catch (error) {
      console.error('Payment processing error:', error);
      alert(`Payment failed: ${error.message}`);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h4 className="font-medium mb-2">Payment Method</h4>
        <div className="flex space-x-2 mb-4">
          <button
            onClick={() => setPaymentMethod('creditcard')}
            className={`px-4 py-2 border rounded-md ${paymentMethod === 'creditcard' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
          >
            Credit Card
          </button>
          <button
            onClick={() => setPaymentMethod('paypal')}
            className={`px-4 py-2 border rounded-md ${paymentMethod === 'paypal' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
          >
            PayPal
          </button>
        </div>
        
        {paymentMethod === 'creditcard' ? (
          <StripePayment 
            price={price}
            vehicleType={vehicleType}
            onSuccess={handlePaymentSuccess}
            onClose={onClose}
          />
        ) : (
          <PayPalPayment 
            price={price}
            customerInfo={customerInfo}
            vehicleType={vehicleType}
            onSuccess={handlePaymentSuccess}
            onClose={onClose}
          />
        )}
      </div>
      
      <button
        onClick={() => setStep('form')}
        className="text-blue-600 hover:text-blue-800 text-sm"
      >
        ← Back to form
      </button>
    </div>
  );
};

export default PaymentStep;