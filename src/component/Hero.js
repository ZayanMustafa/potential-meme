// // components/Hero.js
// 'use client';
// import Image from 'next/image';
// import { useState, useEffect } from 'react';
// import { FaCar, FaMotorcycle, FaTruck, FaShip } from 'react-icons/fa';

// const Hero = () => {
//   // Typewriter effect states
//   const vehicleTypes = ['Car', 'Bike', 'Truck', 'Ship'];
//   const [currentTypeIndex, setCurrentTypeIndex] = useState(0);
//   const [currentText, setCurrentText] = useState('');
//   const [isDeleting, setIsDeleting] = useState(false);
  
//   // Slider states
//   const images = [
//     { id: 1, src: '/car.jpg', alt: 'Car report' },
//     { id: 2, src: '/bike.jpg', alt: 'Bike report' },
//     { id: 3, src: '/truck.jpeg', alt: 'Truck report' },
//     { id: 4, src: '/craft.jpg', alt: 'Ship report' },
//   ];
//   const [currentSlide, setCurrentSlide] = useState(0);

//   // Form states
//   const [formData, setFormData] = useState({
//     name: '',
//     vin: '',
//     model: '',
//     year: ''
//   });

//   // Typewriter effect
//   useEffect(() => {
//     const typeSpeed = isDeleting ? 50 : 100;
//     const pauseBetween = 2000;
    
//     const type = () => {
//       const fullText = vehicleTypes[currentTypeIndex];
      
//       if (isDeleting) {
//         setCurrentText(fullText.substring(0, currentText.length - 1));
//       } else {
//         setCurrentText(fullText.substring(0, currentText.length + 1));
//       }

//       if (!isDeleting && currentText === fullText) {
//         setTimeout(() => setIsDeleting(true), pauseBetween);
//       } else if (isDeleting && currentText === '') {
//         setIsDeleting(false);
//         setCurrentTypeIndex((prev) => (prev + 1) % vehicleTypes.length);
//         setCurrentSlide((prev) => (prev + 1) % images.length); // Sync with slider
//       }
//     };

//     const timer = setTimeout(type, typeSpeed);
//     return () => clearTimeout(timer);
//   }, [currentText, isDeleting, currentTypeIndex]);

//   // Auto slider
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % images.length);
//       // Sync typewriter with slider when auto-advancing
//       setCurrentTypeIndex((prev) => (prev + 1) % vehicleTypes.length);
//       setCurrentText('');
//       setIsDeleting(false);
//     }, 5000);
//     return () => clearInterval(interval);
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Handle form submission
//     console.log('Form submitted:', formData);
//   };

//   const getVehicleIcon = () => {
//     switch(vehicleTypes[currentTypeIndex]) {
//       case 'Car': return <FaCar className="text-red-600 text-4xl" />;
//       case 'Bike': return <FaMotorcycle className="text-red-600 text-4xl" />;
//       case 'Truck': return <FaTruck className="text-red-600 text-4xl" />;
//       case 'Ship': return <FaShip className="text-red-600 text-4xl" />;
//       default: return <FaCar className="text-red-600 text-4xl" />;
//     }
//   };

//   return (
//     <section className="relative bg-gray-50 overflow-hidden">
//       {/* Slider */}
//       <div className="absolute inset-0 z-0">
//         {images.map((image, index) => (
//           <div 
//             key={image.id}
//             className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
//           >
//             <Image
//               src={image.src} 
//               width={1920}
//               height={1080}
//               alt={image.alt} 
//               className="w-full h-full object-cover"
//             />
//             <div className="absolute inset-0 bg-black/40"></div>
//           </div>
//         ))}
//       </div>

//       <div className="relative z-10 max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
//           {/* Left side - Form */}
//           <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-xl p-8">
//             <h2 className="text-3xl font-bold text-gray-900 mb-6">Get Your Report</h2>
//             <form onSubmit={handleSubmit}>
//               <div className="space-y-4">
//                 <div>
//                   <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
//                     Full Name
//                   </label>
//                   <input
//                     type="text"
//                     id="name"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleInputChange}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
//                     required
//                   />
//                 </div>
                
//                 <div>
//                   <label htmlFor="vin" className="block text-sm font-medium text-gray-700 mb-1">
//                     VIN/HIN
//                   </label>
//                   <input
//                     type="text"
//                     id="vin"
//                     name="vin"
//                     value={formData.vin}
//                     onChange={handleInputChange}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
//                     required
//                   />
//                 </div>
                
//                 <div>
//                   <label htmlFor="model" className="block text-sm font-medium text-gray-700 mb-1">
//                     Model
//                   </label>
//                   <input
//                     type="text"
//                     id="model"
//                     name="model"
//                     value={formData.model}
//                     onChange={handleInputChange}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
//                     required
//                   />
//                 </div>
                
//                 <div>
//                   <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-1">
//                     Year
//                   </label>
//                   <input
//                     type="number"
//                     id="year"
//                     name="year"
//                     value={formData.year}
//                     onChange={handleInputChange}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
//                     required
//                   />
//                 </div>
                
//                 <button
//                   type="submit"
//                   className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-md transition duration-300"
//                 >
//                   Get Report
//                 </button>
//               </div>
//             </form>
//           </div>

//           {/* Right side - Text content */}
//           <div className="text-white">
//             <div className="flex items-center mb-4">
//               {getVehicleIcon()}
//               <h1 className="ml-3 text-4xl md:text-5xl font-bold">
//                 FUSION
//               </h1>
//             </div>
//             <h2 className="text-3xl md:text-4xl font-semibold mb-6">
//               Get Your Vehicle History Report
//             </h2>
//             <p className="text-xl mb-8">
//               Comprehensive reports for your{' '}
//               <span className="text-red-400 font-medium">
//                 {currentText}
//                 <span className="animate-pulse">|</span>
//               </span>
//             </p>
//             <ul className="space-y-2">
//               <li className="flex items-center">
//                 <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
//                 <span>Accident & Damage History</span>
//               </li>
//               <li className="flex items-center">
//                 <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
//                 <span>Ownership Records</span>
//               </li>
//               <li className="flex items-center">
//                 <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
//                 <span>Service & Maintenance</span>
//               </li>
//               <li className="flex items-center">
//                 <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
//                 <span>Title & Lien Information</span>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Hero;