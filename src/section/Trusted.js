// components/TrustedWorldwide.js
'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaGlobeAmericas, FaShieldAlt, FaHandshake } from 'react-icons/fa';

const countries = [
  { code: 'sa', name: 'Saudi Arabia', image: 'https://flagcdn.com/w80/sa.png' },
  { code: 'us', name: 'United States', image: 'https://flagcdn.com/w80/us.png' },
  { code: 'pk', name: 'Pakistan', image: 'https://flagcdn.com/w80/pk.png' },
  { code: 'om', name: 'Oman', image: 'https://flagcdn.com/w80/om.png' },
  { code: 'in', name: 'India', image: 'https://flagcdn.com/w80/in.png' },
  { code: 'bd', name: 'Bangladesh', image: 'https://flagcdn.com/w80/bd.png' }
];

const TrustedWorldwide = () => {
  return (
    <div className="bg-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-gray-900 mb-4"
          >
            Trusted Across Borders
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="w-24 h-1 bg-gradient-to-r from-red-500 to-red-600 mx-auto mb-8"
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Providing verified vehicle reports in {countries.length} countries worldwide
          </motion.p>
        </div>

        {/* Flags Grid */}
        <motion.div 
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          {countries.map((country) => (
            <motion.div
              key={country.code}
              whileHover={{ y: -8, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="flex flex-col items-center group"
            >
              <div className="relative w-24 h-24 mb-4 rounded-full overflow-hidden shadow-lg border-2 border-white group-hover:border-red-400 transition-all duration-300">
                <Image
                    width={96}
                    height={96} 
                  src={country.image} 
                  alt={country.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/30 to-transparent" />
              </div>
              <p className="text-lg font-medium text-gray-900 group-hover:text-red-600 transition-colors">
                {country.name}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Global Coverage */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-white to-blue-50 p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all"
          >
            <div className="bg-gradient-to-r from-red-500 to-red-600 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6 shadow-md">
              <FaGlobeAmericas className="text-white text-2xl" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">Global Standards</h3>
            <p className="text-gray-600 text-center">Certified vehicle reports meeting international verification protocols</p>
          </motion.div>

          {/* Data Security */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-white to-blue-50 p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all"
          >
            <div className="bg-gradient-to-r from-red-500 to-red-600 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6 shadow-md">
              <FaShieldAlt className="text-white text-2xl" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">Military-Grade Security</h3>
            <p className="text-gray-600 text-center">256-bit SSL encryption protects all your searches and personal data</p>
          </motion.div>

          {/* Trusted Partners */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-white to-blue-50 p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all"
          >
            <div className="bg-gradient-to-r from-red-500 to-red-600 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6 shadow-md">
              <FaHandshake className="text-white text-2xl" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">Government Verified</h3>
            <p className="text-gray-600 text-center">Direct integration with official vehicle registries in all served countries</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default TrustedWorldwide;