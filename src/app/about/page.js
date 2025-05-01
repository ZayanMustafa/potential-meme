// components/AboutPage.js
'use client';
import FAQItem from '@/component/FAQ';
import { ABOUT_CONTENT, COUNTRIES, FAQS } from '@/constant/About.const';
import { useState } from 'react';

const AboutPage = () => {
    const [activeFaq, setActiveFaq] = useState(null);

    const toggleFaq = (index) => {
        setActiveFaq(activeFaq === index ? null : index);
    };

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
            {/* Hero Section */}
            <div className="text-center mt-15 mb-12 sm:mb-18">
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{ABOUT_CONTENT.title}</h1>
                <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">{ABOUT_CONTENT.description}</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-16">
                {ABOUT_CONTENT.stats.map((stat, index) => (
                    <div key={index} className="bg-white p-4 sm:p-6 rounded-xl shadow-sm sm:shadow-md text-center border border-gray-200">
                        <p className="text-3xl sm:text-4xl font-bold text-red-600 mb-2">{stat.value}</p>
                        <p className="text-base sm:text-lg text-gray-700">{stat.label}</p>
                    </div>
                ))}
            </div>

            {/* Countries Section */}
            <div className="mb-12 sm:mb-16">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8 text-center">Countries We Serve</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {COUNTRIES.map((country, index) => (
                        <div key={index} className="bg-white p-4 sm:p-6 rounded-xl shadow-sm sm:shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
                            <div className="flex items-center mb-3 sm:mb-4">
                                <span className="text-2xl sm:text-3xl mr-3 sm:mr-4">{country.icon}</span>
                                <h3 className="text-xl sm:text-2xl font-bold text-gray-900">{country.name}</h3>
                            </div>
                            <p className="text-sm sm:text-base text-gray-600">{country.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* FAQ Section */}
            <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8 text-center">Frequently Asked Questions</h2>
                <div className="space-y-3 sm:space-y-4 max-w-3xl mx-auto">
                    {FAQS.map((faq, index) => (
                        <FAQItem
                            key={index}
                            question={faq.question}
                            answer={faq.answer}
                            isOpen={activeFaq === index}
                            onClick={() => toggleFaq(index)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AboutPage;