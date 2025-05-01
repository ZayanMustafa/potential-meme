// app/package/page.js
'use client';

import PackageCard from "@/component/UI/Card";
import { packages } from "@/constant/Packages";

const PackageSection = () => {
 

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