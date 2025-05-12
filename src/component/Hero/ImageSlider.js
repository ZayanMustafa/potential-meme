// components/ImageSlider.js
'use client';
import { useEffect } from 'react';
import Image from 'next/image';

const ImageSlider = ({ images, currentSlide, setCurrentSlide }) => {
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 5000); //  5 seconds 
    return () => clearInterval(interval);
  }, [images.length, setCurrentSlide]);

  return (
    <div className="absolute inset-0 z-0">
      {images.map((image, index) => (
        <div 
          key={image.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
        >
          <Image
            src={image.src} 
            alt={image.alt} 
            width={1920}
            height={1080}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
      ))}
    </div>
  );
};

export default ImageSlider;