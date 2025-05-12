

// File : src/component/Payment/CustomerForm.js

'use client'
import { useState } from 'react';
import { FaCheckCircle, FaExclamationTriangle, FaSpinner } from 'react-icons/fa';
import InputField from "../UI/Input";
import { useRouter } from 'next/navigation';



const CustomerForm = ({ customerInfo, setCustomerInfo, setStep }) => {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({
    success: false,
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const requiredFields = ['name', 'email', 'phoneNumber', 'vinNumber', 'vehicleModel', 'year'];
    const missingFields = requiredFields.filter(field => !customerInfo[field]?.trim());
    
    if (missingFields.length > 0) {
      setSubmitStatus({
        success: false,
        message: `Missing required fields: ${missingFields.join(', ')}`
      });
      return false;
    }

    if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(customerInfo.email)) {
      setSubmitStatus({
        success: false,
        message: 'Please enter a valid email address'
      });
      return false;
    }

    return true;
  };

// In handleSubmit function of CustomerForm.js
const handleSubmit = async (e) => {
  e.preventDefault();
  if (!validateForm()) return;
  setIsSubmitting(true);
  
  try {
    const response = await fetch('http://localhost:5000/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: customerInfo.name,
        email: customerInfo.email,
        phoneNumber: customerInfo.phoneNumber,
        vinNumber: customerInfo.vinNumber,
        vehicleModel: customerInfo.vehicleModel,
        year: customerInfo.year.toString()
      })
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.message || 'Order submission failed');
    }

    localStorage.setItem('orderId', data.order._id);
    localStorage.setItem('orderData', JSON.stringify(data.order));
    
    setSubmitStatus({
      success: true,
      message: 'Order submitted successfully!'
    });

    // Only proceed to payment step on success
    setStep('payment');

  } catch (error) {
    setSubmitStatus({
      success: false,
      message: error.message || 'Failed to submit order'
    });
  } finally {
    setIsSubmitting(false);
  }
};




  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {submitStatus.message && (
        <div className={`p-4 rounded-md ${submitStatus.success 
          ? 'bg-green-100 text-green-800' 
          : 'bg-red-100 text-red-800'}`}>
          <div className="flex items-center">
            {submitStatus.success ? (
              <FaCheckCircle className="mr-2" />
            ) : (
              <FaExclamationTriangle className="mr-2" />
            )}
            <span>{submitStatus.message}</span>
          </div>
        </div>
      )}

      <InputField
        label="Full Name"
        name="name"
        value={customerInfo.name}
        onChange={handleInputChange}
        required
      />
      
      <InputField
        label="Email Address"
        name="email"
        type="email"
        value={customerInfo.email}
        onChange={handleInputChange}
        required
      />
      
      <InputField
        label="Phone Number"
        name="phoneNumber"
        type="tel"
        value={customerInfo.phoneNumber}
        onChange={handleInputChange}
        required
      />
      
      <InputField
        label="VIN Number"
        name="vinNumber"
        value={customerInfo.vinNumber}
        onChange={handleInputChange}
        required
      />
      
      <div className="grid grid-cols-2 gap-4">
        <InputField
          label="Vehicle Model"
          name="vehicleModel"
          value={customerInfo.vehicleModel}
          onChange={handleInputChange}
          required
        />
        
        <InputField
          label="Year"
          name="year"
          type="number"
          min="1900"
          max={new Date().getFullYear() + 1}
          value={customerInfo.year}
          onChange={handleInputChange}
          required
        />
      </div>
      
      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full py-3 px-4 text-white rounded-md transition-colors flex justify-center items-center
          ${isSubmitting 
            ? 'bg-blue-400 cursor-not-allowed' 
            : 'bg-blue-600 hover:bg-blue-700'}`}
      >
        {isSubmitting ? (
          <>
            <FaSpinner className="animate-spin mr-2" />
            Processing...
          </>
        ) : (
          'Continue to Payment'
        )}
      </button>
    </form>
  );
};

export default CustomerForm;

