'use client';
import FAQItem from '@/component/FAQ';
import { ABOUT_CONTENT, MISSION_VISION, HISTORY, COUNTRIES, FAQS } from '@/constant/About.const';
import { useState } from 'react';

const AboutPage = () => {
    const [activeFaq, setActiveFaq] = useState(null);

    const toggleFaq = (index) => {
        setActiveFaq(activeFaq === index ? null : index);
    };

    return (
        <div className=" max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
            {/* Hero Section */}
            <section className=" mt-10 text-center mb-16 sm:mb-20">
                <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                    {ABOUT_CONTENT.title}
                </h1>
                <p className="text-xl sm:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                    {ABOUT_CONTENT.description}
                </p>
            </section>

            {/* Mission Section */}
            <section className="bg-white p-8 sm:p-10 rounded-2xl shadow-md border border-gray-100 mb-16 sm:mb-20">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">
                        <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                            {MISSION_VISION.mission.title}
                        </span>
                    </h2>
                    <div className="space-y-6">
                        {MISSION_VISION.mission.content.map((paragraph, index) => (
                            <p key={index} className="text-lg sm:text-xl text-gray-700 leading-relaxed">
                                {paragraph}
                            </p>
                        ))}
                    </div>
                </div>
            </section>

            {/* Vision Section */}
            <section className="bg-gradient-to-br from-blue-50 to-white p-8 sm:p-10 rounded-2xl shadow-md border border-blue-100 mb-16 sm:mb-20">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">
                        <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                            {MISSION_VISION.vision.title}
                        </span>
                    </h2>
                    <div className="space-y-6">
                        {MISSION_VISION.vision.content.map((paragraph, index) => (
                            <p key={index} className="text-lg sm:text-xl text-gray-700 leading-relaxed">
                                {paragraph}
                            </p>
                        ))}
                    </div>
                </div>
            </section>

            {/* History Section */}
            <section className="mb-16 sm:mb-20">
                <div className="text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                        Our Journey
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-blue-700 mx-auto"></div>
                </div>
                
                <div className="relative max-w-4xl mx-auto">
                    <div className="absolute left-5 sm:left-1/2 h-full w-0.5 bg-gradient-to-b from-blue-200 to-blue-500"></div>
                    
                    <div className="space-y-12">
                        {HISTORY.map((item, index) => (
                            <div key={index} className="relative pl-10 sm:pl-0">
                                <div className={`flex flex-col sm:flex-row ${index % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'} items-center gap-8`}>
                                    <div className="absolute -left-1 sm:left-1/2 w-4 h-4 -ml-2 rounded-full bg-blue-600 border-4 border-blue-100"></div>
                                    <div className={`flex-1 ${index % 2 === 0 ? 'sm:pr-8 sm:text-right' : 'sm:pl-8 sm:text-left'} order-2 sm:order-none`}>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-3">{item.year}</h3>
                                        <p className="text-lg text-gray-700">{item.content}</p>
                                    </div>
                                    <div className={`flex-1 ${index % 2 === 0 ? 'sm:order-first' : 'sm:order-last'}`}>
                                        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 h-full">
                                            <div className="text-5xl text-blue-600 mb-4 me-4">
                                                {index === 0 && '🚀'}
                                                {index === 1 && '🌎'}
                                                {index === 2 && '💡'}
                                                {index === 3 && '🏆'}
                                            </div>
                                            <h4 className="text-xl font-semibold text-gray-800 mb-2">
                                                {index === 0 && 'Foundation'}
                                                {index === 1 && 'Expansion'}
                                                {index === 2 && 'Innovation'}
                                                {index === 3 && 'Leadership'}
                                            </h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="mb-16 sm:mb-20">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
                    {ABOUT_CONTENT.stats.map((stat, index) => (
                        <div key={index} className="bg-gradient-to-br from-white to-blue-50 p-6 sm:p-8 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300">
                            <p className="text-4xl sm:text-5xl font-bold text-blue-600 mb-3 text-center ms-4">
                                {stat.value}
                            </p>
                            <p className="text-lg sm:text-xl text-gray-700 font-medium text-center">
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Countries Section */}
            <section className="mb-16 sm:mb-20">
                <div className="text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                        Global Coverage
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Asset Central Report provides comprehensive asset verification across multiple jurisdictions
                    </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {COUNTRIES.map((country, index) => (
                        <div key={index} className="bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300 group">
                            <div className="flex items-start mb-4">
                                <span className="text-4xl mr-4">{country.icon}</span>
                                <div>
                                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                                        {country.name}
                                    </h3>
                                    <div className="w-12 h-1 bg-blue-500 mt-2"></div>
                                </div>
                            </div>
                            <p className="text-gray-600">
                                {country.description}
                            </p>
                            <div className="mt-4 pt-4 border-t border-gray-100">
                                <span className="inline-block px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-medium">
                                    {index % 3 === 0 && 'Full Coverage'}
                                    {index % 3 === 1 && 'Government Verified'}
                                    {index % 3 === 2 && 'Real-time Data'}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* FAQ Section */}
            <section className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-xl text-gray-600">
                        Everything you need to know about Asset Central Report
                    </p>
                </div>
                
                <div className="space-y-4">
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
                
                <div className="mt-12 text-center">
                    <p className="text-lg text-gray-600 mb-6">
                        Still have questions?
                    </p>
                    <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
                        Contact Our Support Team
                    </button>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;