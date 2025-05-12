// components/Footer.js
'use client';
import { footerData } from '@/constant/Footer.const';
import Image from 'next/image';
import Link from 'next/link';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { MdEmail, MdPhone, MdLocationOn } from 'react-icons/md';

const Footer = () => {
  const socialIcons = {
    Facebook: <FaFacebook className="text-xl" />,
    Twitter: <FaTwitter className="text-xl" />,
    Instagram: <FaInstagram className="text-xl" />,
    LinkedIn: <FaLinkedin className="text-xl" />
  };

  return (
    <footer className="bg-white text-gray-800 border-t border-gray-200 pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0">
                <Image
                  src={footerData.logo} 
                  width={80}
                  height={80}
                  alt="Asset Central Report Report Logo" 
                  className="h-16 w-auto object-contain" // Increased height to 16 (4rem)
                />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                Asset Central
                <span className="text-blue-600"> Reports</span>
              </h2>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              {footerData.description}
            </p>
            <div className="flex space-x-4 pt-2">
              {footerData.social.map((item) => (
                <Link 
                  key={item.name} 
                  href={item.href} 
                  className="text-gray-500 hover:text-blue-600 transition-colors duration-300"
                  aria-label={item.name}
                >
                  {socialIcons[item.name]}
                </Link>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          {footerData.links.map((column) => (
            <div key={column.title} className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 uppercase tracking-wider">
                {column.title}
              </h3>
              <ul className="space-y-3">
                {column.items.map((item) => (
                  <li key={item.name}>
                    <Link 
                      href={item.href} 
                      className="text-gray-600 hover:text-blue-600 transition-colors duration-300 flex items-center gap-2 text-sm"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 uppercase tracking-wider">
              Contact Us
            </h3>
            <address className="not-italic text-gray-600 space-y-4">
              <div className="flex items-start gap-3">
                <MdLocationOn className="text-blue-600 mt-1 flex-shrink-0" />
                <span className="text-sm">{footerData.contact.address}</span>
              </div>
              <div className="flex items-center gap-3">
                <MdPhone className="text-blue-600" />
                <Link 
                  href={`tel:${footerData.contact.phone}`} 
                  className="hover:text-blue-600 transition-colors duration-300 text-sm"
                >
                  {footerData.contact.phone}
                </Link>
              </div>
              <div className="flex items-center gap-3">
                <MdEmail className="text-blue-600" />
                <Link 
                  href={`mailto:${footerData.contact.email}`} 
                  className="hover:text-blue-600 transition-colors duration-300 text-sm"
                >
                  {footerData.contact.email}
                </Link>
              </div>
            </address>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 mt-12 pt-8 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Asset Central Report. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;