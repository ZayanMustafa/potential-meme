// components/TypeWriter.js
'use client';
import { useEffect, useState } from 'react';

const TypeWriter = ({ words, currentIndex }) => {
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    // Reset animation whenever currentIndex changes (from parent)
    setCurrentText('');
    setIsDeleting(false);
  }, [currentIndex]);

  useEffect(() => {
    const typeSpeed = isDeleting ? 50 : 100;
    const pauseBetween = 5000; // Reduced pause for better sync with images
    
    const type = () => {
      const fullText = words[currentIndex];
      
      if (isDeleting) {
        setCurrentText(fullText.substring(0, currentText.length - 1));
      } else {
        setCurrentText(fullText.substring(0, currentText.length + 1));
      }

      if (!isDeleting && currentText === fullText) {
        setTimeout(() => setIsDeleting(true), pauseBetween);
      } else if (isDeleting && currentText === '') {
        setIsDeleting(false);
      }
    };

    const timer = setTimeout(type, typeSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentIndex, words]);

  return (
    <span className="text-blue-400 font-medium">
      {currentText}
      <span className="animate-pulse">|</span>
    </span>
  );
};

export default TypeWriter;