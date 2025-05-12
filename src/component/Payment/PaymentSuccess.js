'use client';
import { useEffect } from 'react';
import { FaCheck } from 'react-icons/fa';
import { useRouter } from 'next/navigation';



const PaymentSuccess = ({ 
  transactionId, 
  plan, 
  amount, 
  paymentMethod 
}) => {
  const router = useRouter();

  useEffect(() => {
    const updatePayment = async () => {
      try {
        const orderId = typeof window !== 'undefined' ? localStorage.getItem("orderId") : null;
        
        if (!orderId) {
          console.error("No orderId found in localStorage");
          return;
        }

        const response = await fetch(`http://localhost:5000/orders/admin/${orderId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const updateData = await response.json();
        console.log("Payment update successful:", updateData);
      } catch (error) {
        console.error("Error updating payment:", error);
      }
    };

    updatePayment();

    const timer = setTimeout(() => {
      router.push('/');
    }, 12000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="fixed inset-0 bg-gray-100 bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200 max-w-md w-full">
        <div className="p-8 flex flex-col items-center text-center">
          {/* Success Icon */}
          <div className="mb-6 p-4 rounded-full w-20 h-20 flex items-center justify-center bg-green-100">
            <FaCheck className="w-10 h-10 text-green-600" />
          </div>
          
          {/* Title */}
          <h3 className="text-3xl font-bold text-gray-900 mb-2">Payment Successful!</h3>
          <p className="text-gray-600 mb-8">Thank you for your purchase of {plan}</p>
          
          {/* Receipt */}
          <div className="w-full border border-gray-200 rounded-xl p-6 mb-8 text-left">
            <h4 className="text-xl font-bold text-gray-900 mb-4">Receipt</h4>
            <p className="text-gray-500 mb-6">{new Date().toLocaleString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
              hour12: true
            })}</p>
            
            <div className="space-y-4">
              <div>
                <p className="text-gray-500">Transaction ID:</p>
                <p className="font-semibold">{transactionId}</p>
              </div>
              
              <div>
                <p className="text-gray-500">Plan:</p>
                <p className="font-semibold">{plan}</p>
              </div>
              
              <div>
                <p className="text-gray-500">Amount Paid:</p>
                <p className="font-semibold">${amount}</p>
              </div>
              
              <div>
                <p className="text-gray-500">Payment Method:</p>
                <p className="font-semibold">{paymentMethod}</p>
              </div>
              
              <div className="pt-4 border-t border-gray-200">
                <p className="text-gray-500">Total:</p>
                <p className="font-semibold text-xl">${amount}</p>
              </div>
            </div>
          </div>
          
          <p className="text-gray-600 mb-6">Thank you for your business!</p>
          <p className="text-gray-500 text-sm mb-6">This is an official receipt for your records</p>
          
          <div className="flex space-x-4 w-full">
            <button 
              onClick={() => router.push('/')}
              className="flex-1 py-3 px-6 rounded-xl border border-gray-200 hover:border-gray-300 font-medium text-gray-800 transition-all duration-300 hover:bg-gray-50"
            >
              Close
            </button>
            <button 
              onClick={() => {/* Add download receipt functionality */}}
              className="flex-1 py-3 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 font-medium text-white transition-all duration-300"
            >
              Download Receipt
            </button>
          </div>
          
          <p className="text-gray-400 text-sm mt-6">Redirecting in 5 seconds...</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;