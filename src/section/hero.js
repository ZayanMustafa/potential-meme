// components/Hero.js
'use client';
import { useState } from 'react';
import FormSection from '@/component/Hero/Form';
import ImageSlider from '@/component/Hero/ImageSlider';
import InfoSection from '@/component/Hero/InfoSection';
import TypeWriter from '@/component/Hero/TypeWritter';


const HeroSection = () => {
  const vehicleTypes = ['Car', 'Bike', 'Truck', 'Ship'];
  const [currentTypeIndex, setCurrentTypeIndex] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    vin: '',
    model: '',
    year: ''
  });

  const images = [
    { id: 1, src: '/car.jpg', alt: 'Car report' },
    { id: 2, src: '/bike.jpg', alt: 'Bike report' },
    { id: 3, src: '/truck.jpg', alt: 'Truck report' },
    { id: 4, src: '/boat.jpg', alt: 'Ship report' },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <section className="relative bg-gray-50  h-[700px] min-h-[1200px]">
      <ImageSlider
        images={images}
        currentSlide={currentSlide}
        setCurrentSlide={setCurrentSlide}
      />

      <div className="relative z-2 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <InfoSection
              currentTypeIndex={currentTypeIndex}
              currentText={

                 <TypeWriter
                 words={vehicleTypes}
                 currentIndex={currentSlide} 
                 />
              }
            />
            <FormSection
              formData={formData}
              handleInputChange={handleInputChange}
              handleSubmit={handleSubmit}
            />

          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;