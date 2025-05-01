// components/Footer.js
'use client';
import { footerData } from '@/constant/Footer.const';
import Image from 'next/image';
// import { footerData } from '../constants/footerData';
import Link from 'next/link';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { MdEmail, MdPhone, MdLocationOn } from 'react-icons/md';

const Footer = () => {
  // Map social media names to their corresponding icons
  const socialIcons = {
    Facebook: <FaFacebook />,
    Twitter: <FaTwitter />,
    Instagram: <FaInstagram />,
    LinkedIn: <FaLinkedin />
  };

  return (
    <footer className="bg-white text-gray-800 border-t border-gray-200 pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="space-y-4 bg-dark ">
            <div className="flex items-center">
              <Image
                src={footerData.logo} 
                width={100}
                height={50}
                alt="Vehicle History Report Logo" 
                className="h-12  w-auto"
              />
            </div>
            <p className="text-gray-600">{footerData.description}</p>
            <div className="flex space-x-4">
              {footerData.social.map((item) => (
                <Link 
                  key={item.name} 
                  href={item.href} 
                  className="text-gray-500 hover:text-red-600 transition text-2xl"
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
              <h3 className="text-lg font-semibold text-red-600">{column.title}</h3>
              <ul className="space-y-2">
                {column.items.map((item) => (
                  <li key={item.name}>
                    <Link 
                      href={item.href} 
                      className="text-gray-600 hover:text-red-600 transition flex items-center gap-1"
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
            <h3 className="text-lg font-semibold text-red-600">Contact Us</h3>
            <address className="not-italic text-gray-600 space-y-3">
              <p className="flex items-center gap-2">
                <MdLocationOn className="text-red-600" />
                {footerData.contact.address}
              </p>
              <p className="flex items-center gap-2">
                <MdPhone className="text-red-600" />
                <Link 
                  href={`tel:${footerData.contact.phone}`} 
                  className="hover:text-red-600 transition"
                >
                  {footerData.contact.phone}
                </Link>
              </p>
              <p className="flex items-center gap-2">
                <MdEmail className="text-red-600" />
                <Link 
                  href={`mailto:${footerData.contact.email}`} 
                  className="hover:text-red-600 transition"
                >
                  {footerData.contact.email}
                </Link>
              </p>
            </address>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 mt-12 pt-8 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} Vehicle History Reports. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;