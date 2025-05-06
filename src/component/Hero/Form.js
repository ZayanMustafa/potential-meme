// components/FormSection.js
'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import InputField from "../UI/Input";

const FormSection = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: '',
    vin: '',
    model: '',
    year: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const savedData = localStorage.getItem('formData');
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const newData = { ...prev, [name]: value };
      // Save to localStorage on each change
      localStorage.setItem('formData', JSON.stringify(newData));
      return newData;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // Simulate processing delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Form data saved locally:', formData);
      router.push('/package');
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while processing the form');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-end ms-auto me-2">
      <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-2xl p-8 sm:p-10 w-full max-w-2xl">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">
          Get Your Report
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <InputField
              label="Full Name"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              inputSize="lg"
              required
            />

            <InputField
              label="VIN/HIN"
              id="vin"
              name="vin"
              value={formData.vin}
              onChange={handleInputChange}
              inputSize="lg"
              required
            />

            <InputField
              label="Model"
              id="model"
              name="model"
              value={formData.model}
              onChange={handleInputChange}
              inputSize="lg"
              required
            />
            <InputField
              label="Year"
              id="year"
              name="year"
              type="number"
              value={formData.year}
              onChange={handleInputChange}
              inputSize="lg"
              required
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-5 px-6 rounded-lg transition duration-300 text-xl ${
                isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? 'Processing...' : 'Get Report'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormSection;