// File : src/compoent/UI/Card.js

'use client';
import { useState } from 'react';
import { FaCar, FaShip, FaTruck, FaCheck } from 'react-icons/fa';
import { RiEBikeFill } from 'react-icons/ri';
import PaymentModal from '../Payment/PaymentModal';

const vehicleIcons = {
  Bike: RiEBikeFill,
  Car: FaCar,
  Truck: FaTruck,
  Ship: FaShip
};

const PackageCard = ({ vehicleType, price, discount, features }) => {
  const [showModal, setShowModal] = useState(false);
  const discountedPrice = price * (1 - discount / 100);
  const IconComponent = vehicleIcons[vehicleType] || FaCar;
  
  return (
    <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200 hover:shadow-2xl transition-all duration-300 h-full flex flex-col">
      {/* Vertical Discount Ribbon */}
      {discount > 0 && (
        <div className="absolute top-0 left-0 h-full w-8 flex items-center justify-center bg-blue-500">
          <div className="text-white font-bold text-lg transform -rotate-90 whitespace-nowrap">
            {discount}% OFF
          </div>
        </div>
      )}
      
      <div className={`p-8 flex-1 flex flex-col ${discount > 0 ? 'pl-12' : ''}`}>
        {/* Vehicle Icon */}
        <div className="mb-6 p-4 rounded-full w-20 h-20 flex items-center justify-center bg-blue-50">
          <IconComponent className="w-10 h-10 text-blue-600" />
        </div>
        
        {/* Title */}
        <h3 className="text-3xl font-bold text-gray-900 mb-4">{vehicleType} Report</h3>
        
        {/* Price */}
        <div className="mb-6">
          <span className="text-4xl font-bold text-gray-900">${discountedPrice.toFixed(2)}</span>
          {discount > 0 && (
            <span className="ml-3 text-xl text-gray-500 line-through">${price.toFixed(2)}</span>
          )}
          <span className="block text-gray-500 mt-1">one-time payment</span>
        </div>
        
        {/* Features */}
        <ul className="space-y-3 mb-8 flex-1">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <FaCheck className="flex-shrink-0 h-5 w-5 text-green-500 mr-3 mt-0.5" />
              <span className="text-lg text-gray-700">{feature}</span>
            </li>
          ))}
        </ul>
        
        {/* CTA Button */}
        <button
          onClick={() => setShowModal(true)}
          className="w-full py-4 px-6 rounded-xl text-xl border border-gray-200 hover:border-gray-300 font-bold text-gray-800 transition-all duration-300 hover:bg-gray-50"
        >
          Get {vehicleType} Report
        </button>
      </div>
      
      {/* Payment Modal */}
      <PaymentModal
        show={showModal}
        onClose={() => setShowModal(false)}
        vehicleType={vehicleType}
        price={discountedPrice}
      />
    </div>
  );
};

export default PackageCard;