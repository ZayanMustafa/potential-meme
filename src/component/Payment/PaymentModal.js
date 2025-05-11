//  File : component/Payment/PaymentModal.js

'use client';
import { useState } from 'react';
import CustomerForm from './CustomerForm';
import PaymentStep from './PaymentSetup';

const PaymentModal = ({ show, onClose, vehicleType, price }) => {
  const [step, setStep] = useState('form');
  const [customerInfo, setCustomerInfo] = useState({
  name: '',
  email: '',
  phoneNumber: '',
  vinNumber: '',
  vehicleModel: '',
  year: ''
});

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">
            {step === 'form' 
              ? `Get Your ${vehicleType} Report` 
              : `Complete Your Purchase`}
          </h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            &times;
          </button>
        </div>

        {step === 'form' ? (
          <CustomerForm
            customerInfo={customerInfo}
            setCustomerInfo={setCustomerInfo}
            setStep={setStep}
            vehicleType={vehicleType}
          />
        ) : (
          <PaymentStep
            customerInfo={customerInfo}
            price={price}
            vehicleType={vehicleType}
            onClose={onClose}
            setStep={setStep}
          />
        )}
      </div>
    </div>
  );
};

export default PaymentModal;