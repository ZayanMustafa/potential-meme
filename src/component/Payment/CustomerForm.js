import { useState } from 'react';
import { FaCheckCircle, FaExclamationTriangle, FaSpinner } from 'react-icons/fa';
import InputField from "../UI/Input";

const CustomerForm = ({ customerInfo, setCustomerInfo, setStep, vehicleType }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({
    success: false,
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ success: false, message: '' });
  
    // Basic validation
    const requiredFields = ['name', 'email', 'phone', 'vin', 'model', 'year'];
    const missingFields = requiredFields.filter(field => !customerInfo[field]);
  
    if (missingFields.length > 0) {
      setSubmitStatus({
        success: false,
        message: `Please fill in all required fields: ${missingFields.join(', ')}`
      });
      setIsSubmitting(false);
      return;
    }
  
    try {
      const response = await fetch('http://localhost:5000/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: customerInfo.name,
          email: customerInfo.email,
          phone: customerInfo.phone,
          vin: customerInfo.vin,
          model: customerInfo.model,
          year: customerInfo.year
        })
      });
  
      // First check if the response is OK (status 200-299)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      // Then try to parse the JSON
      let data;
      try {
        data = await response.json();
      } catch (jsonError) {
        throw new Error('Invalid JSON response from server');
      }
  
      if (data && data.success) {
        setSubmitStatus({
          success: true,
          message: 'Your data is submitted successfully! Redirecting to payment...'
        });
        setTimeout(() => setStep('payment'), 2000);
      } else {
        setSubmitStatus({
          success: false,
          message: data?.message || 'Order placement failed. Please try again.'
        });
      }
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitStatus({
        success: false,
        message: error.message || 'Failed to submit order. Please try again later.'
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
        id="name"
        name="name"
        value={customerInfo.name}
        onChange={handleInputChange}
        required
      />
      
      <InputField
        label="Email Address"
        id="email"
        name="email"
        type="email"
        value={customerInfo.email}
        onChange={handleInputChange}
        required
      />
      
      <InputField
        label="Phone Number"
        id="phone"
        name="phone"
        type="tel"
        value={customerInfo.phone}
        onChange={handleInputChange}
        required
      />
      
      <InputField
        label="VIN Number"
        id="vin"
        name="vin"
        value={customerInfo.vin}
        onChange={handleInputChange}
        required
      />
      
      <div className="grid grid-cols-2 gap-4">
        <InputField
          label="Vehicle Model"
          id="model"
          name="model"
          value={customerInfo.model}
          onChange={handleInputChange}
          required
        />
        
        <InputField
          label="Year"
          id="year"
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
        className={`w-full py-3 text-white rounded-md transition-colors flex justify-center items-center
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