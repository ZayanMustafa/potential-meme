// components/Testimonials.js
'use client';
import { useState, useEffect } from 'react';
import { FaQuoteLeft, FaChevronLeft, FaChevronRight, FaStar } from 'react-icons/fa';

const testimonials = [
  {
    id: 1,
    name: 'Ahmed Al-Saud',
    role: 'Car Dealer, Riyadh',
    content: 'The vehicle reports saved me from purchasing a flood-damaged car. The service is worth every riyal!',
    rating: 5,
    country: '🇸🇦'
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    role: 'Used Car Buyer, Texas',
    content: 'I avoided a stolen vehicle thanks to their comprehensive report. Excellent customer support too!',
    rating: 4,
    country: '🇺🇸'
  },
  {
    id: 3,
    name: 'Raj Patel',
    role: 'Fleet Manager, Mumbai',
    content: 'Our company runs 50+ vehicles. These reports help us maintain our fleet with confidence.',
    rating: 5,
    country: '🇮🇳'
  },
  {
    id: 4,
    name: 'Fatima Khan',
    role: 'Private Buyer, Karachi',
    content: 'Discovered hidden accident history that the seller tried to conceal. Lifesaver service!',
    rating: 5,
    country: '🇵🇰'
  }
];

const Testimonials = () => {
  const [current, setCurrent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = () => {
    setCurrent((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  // Auto-rotate testimonials every 5 seconds
  useEffect(() => {
    let interval;
    if (isAutoPlaying) {
      interval = setInterval(nextSlide, 5000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  return (
    <div className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
        <div className="w-20 h-1 bg-blue-600 mx-auto mb-6"></div>
        <p className="text-xl text-gray-600">
          Trusted by vehicle buyers across {testimonials.length} countries
        </p>
      </div>

      <div 
        className="relative max-w-3xl mx-auto overflow-hidden"
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
      >
        {/* Testimonials Slider */}
        <div 
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id}
              className="w-full flex-shrink-0 px-4"
            >
              <div className="bg-white p-8 rounded-xl shadow-md border border-gray-200">
                <FaQuoteLeft className="text-blue-600 text-3xl mb-6 opacity-30" />
                <p className="text-lg text-gray-700 mb-6">{testimonial.content}</p>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                    <p className="text-gray-600">{testimonial.role} {testimonial.country}</p>
                  </div>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <FaStar 
                        key={i} 
                        className={`${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'} ml-1`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button 
          onClick={prevSlide}
          className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 bg-white p-3 rounded-full shadow-md border border-gray-200 hover:bg-blue-50 text-blue-600 transition-colors"
        >
          <FaChevronLeft />
        </button>
        <button 
          onClick={nextSlide}
          className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 bg-white p-3 rounded-full shadow-md border border-gray-200 hover:bg-blue-50 text-blue-600 transition-colors"
        >
          <FaChevronRight />
        </button>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-8 space-x-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-3 h-3 rounded-full ${i === current ? 'bg-blue-600' : 'bg-gray-300'}`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;