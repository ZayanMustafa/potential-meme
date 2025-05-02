import InputField from "../UI/Input";

const CustomerForm = ({ customerInfo, setCustomerInfo, setStep, vehicleType }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation
    if (!customerInfo.name || !customerInfo.email || !customerInfo.vin) {
      alert('Please fill in all required fields');
      return;
    }
    setStep('payment');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <InputField
        label="Full Name"
        id="name"
        name="name"
        value={customerInfo.name}
        onChange={handleInputChange}
      />
      
      <InputField
        label="Email Address"
        id="email"
        name="email"
        type="email"
        value={customerInfo.email}
        onChange={handleInputChange}
      />
      
      <InputField
        label="Phone Number"
        id="phone"
        name="phone"
        type="tel"
        value={customerInfo.phone}
        onChange={handleInputChange}
      />
      
      <InputField
        label="VIN Number"
        id="vin"
        name="vin"
        value={customerInfo.vin}
        onChange={handleInputChange}
      />
      
      <div className="grid grid-cols-2 gap-4">
        <InputField
          label="Vehicle Model"
          id="model"
          name="model"
          value={customerInfo.model}
          onChange={handleInputChange}
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
        />
      </div>
      
      <button
        type="submit"
        className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
      >
        Continue to Payment
      </button>
    </form>
  );
};

export default CustomerForm;