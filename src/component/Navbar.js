// components/Navbar.js
'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiHome, FiInfo, FiPackage, FiMail } from 'react-icons/fi';
import { FaCar } from 'react-icons/fa';

const Navbar = () => {
  const [activeLink, setActiveLink] = useState('Home');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', path: '/', icon: <FiHome className="text-lg" /> },
    { name: 'About', path: '/about', icon: <FiInfo className="text-lg" /> },
    { name: 'Package', path: '/package', icon: <FiPackage className="text-lg" /> },
    { name: 'Contact Us', path: '/contact', icon: <FiMail className="text-lg" /> },
  ];

  return (
    <>
      {/* Desktop Navigation (stays at top) */}
      <nav
        className={`hidden md:block fixed w-full z-50 transition-all duration-300 ${
          scrolled ? 'bg-white shadow-md py-2' : 'bg-white/95 backdrop-blur-sm py-3'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <Link href="/" className="flex items-center">
              <FaCar className="h-7 w-7 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">ASSEST</span>
            </Link>

            <div className="flex items-center space-x-6">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.path}
                  className={`flex items-center text-base ${
                    activeLink === item.name ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
                  }`}
                  onClick={() => setActiveLink(item.name)}
                >
                  {/* <span className="mr-1.5">{item.icon}</span> */}
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Tab Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
        <div className="flex justify-around">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              className={`flex flex-col items-center justify-center py-3 px-2 w-full ${
                activeLink === item.name ? 'text-blue-600' : 'text-gray-500'
              }`}
              onClick={() => setActiveLink(item.name)}
            >
              <div className="text-xl mb-1">{item.icon}</div>
              <span className="text-xs">{item.name}</span>
              {activeLink === item.name && (
                <div className="w-1/2 h-1 bg-blue-600 rounded-t-full mt-1"></div>
              )}
            </Link>
          ))}
        </div>
      </div>

      {/* Add padding to prevent content from being hidden behind the bottom bar */}
      <div className="pb-16 md:pb-0"></div>
    </>
  );
};

export default Navbar;