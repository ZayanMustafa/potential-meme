// app/package/page.js
'use client';

import PackageCard from "@/component/UI/Card";

const PackageSection = () => {
  const packages = [
    {
      vehicleType: 'Bike',
      price: 35,
      discount: 15,
      features: [
        'Complete History Report',
        'Accident & Damage Records',
        '5+ Previous Owners Check',
        'Theft & Recovery Verification',
        '24/7 Customer Support',
        'Lifetime Updates'
      ]
    },
    {
      vehicleType: 'Car',
      price: 50,
      discount: 15,
      features: [
        'Comprehensive Vehicle History',
        'Accident & Damage Reports',
        'Service & Maintenance Records',
        'Title & Ownership History',
        'Lien & Loan Information',
        'Recall & Warranty Data'
      ]
    },
    {
      vehicleType: 'Truck',
      price: 75,
      discount: 15,
      features: [
        'Commercial Use Verification',
        'Heavy-Duty Inspection Reports',
        'Mileage & Odometer Check',
        'DOT & Safety Compliance',
        'Fleet Maintenance History',
        'Commercial Accident Reports'
      ]
    },
    {
      vehicleType: 'Ship',
      price: 95,
      discount: 25,
      features: [
        'Complete Marine History',
        'Hull & Engine Inspection',
        'Ownership & Registration',
        'Insurance & Loss History',
        'Coast Guard Documentation',
        'Marine Survey Records'
      ]
    }
  ];

  return (
    <div className="bg-gray-100  py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl pt-12 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            Premium Vehicle Report Packages
          </h2>
          <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
            Get detailed history reports with our exclusive limited-time discounts
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {packages.map((pkg, index) => (
            <PackageCard
              key={index}
              vehicleType={pkg.vehicleType}
              price={pkg.price}
              discount={pkg.discount}
              features={pkg.features}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PackageSection;