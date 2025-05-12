'use client';
import { FaCar, FaMotorcycle, FaTruck, FaShip } from 'react-icons/fa';

const InfoSection = ({ currentTypeIndex, currentText }) => {
  const getVehicleIcon = () => {
    const vehicleTypes = ['Car', 'Bike', 'Truck', 'Ship'];
    switch(vehicleTypes[currentTypeIndex]) {
      case 'Car': return <FaCar className="text-blue-600 text-5xl" />;
      case 'Bike': return <FaMotorcycle className="text-blue-600 text-5xl" />;
      case 'Truck': return <FaTruck className="text-blue-600 text-5xl" />;
      case 'Ship': return <FaShip className="text-blue-600 text-5xl" />;
      default: return <FaCar className="text-blue-600 text-5xl" />;
    }
  };

  return (
    <div className="text-white text-left  mt-24 sm:mt-28 md:mt-32">
      <div className="flex justify-start items-center mb-6">
        {getVehicleIcon()}
        <h1 className="text-6xl md:text-6xl font-bold ml-4">
          Asset  
        </h1>
      </div>
      <h2 className="text-4xl md:text-5xl font-semibold mb-8">
        Central Report
      </h2>
      <p className="text-2xl mb-10">
        Instant reports for your{' '}
        <span className="text-blue-400 font-medium">
          {currentText}
        </span>
      </p>
      <ul className="space-y-3 text-xl">
        <li className="flex items-center">
          <span className="w-2 h-2 bg-blue-500 rounded-full me-5"></span>
          <span>Accident & Damage History</span>
        </li>
        <li className="flex items-center">
          <span className="w-2 h-2 bg-blue-500 rounded-full me-5"></span>
          <span>Ownership Records</span>
        </li>
        <li className="flex items-center">
          <span className="w-2 h-2 bg-blue-500 rounded-full me-5"></span>
          <span>Service History</span>
        </li>
        <li className="flex items-center">
          <span className="w-2 h-2 bg-blue-500 rounded-full me-5"></span>
          <span>Title Verification</span>
        </li>
      </ul>
    </div>
  );
};

export default InfoSection;


