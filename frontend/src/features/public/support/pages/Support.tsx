/**
 * Dedicated Support Page
 * Comprehensive customer support page with multiple contact options
 */

import React from 'react';
import CustomerSupport from '../components/CustomerSupport';
import { MessageCircle, Phone, Mail, Clock, HelpCircle } from 'lucide-react';

const Support: React.FC = () => {

  const faqItems = [
    {
      question: "How do I track my order?",
      answer: "You can track your order by going to 'My Orders' in your account or using the tracking link sent to your email."
    },
    {
      question: "What is your return policy?",
      answer: "We offer a 30-day return policy for most items. Items must be in original condition with tags attached."
    },
    {
      question: "How long does shipping take?",
      answer: "Standard shipping takes 3-5 business days. Express shipping takes 1-2 business days."
    },
    {
      question: "How do I cancel my order?",
      answer: "You can cancel your order within 1 hour of placing it by going to 'My Orders' and clicking 'Cancel Order'."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, PayPal, Apple Pay, and Google Pay."
    }
  ];

  const contactMethods = [
    {
      icon: <MessageCircle />,
      title: "WhatsApp Support",
      description: "Get instant help via WhatsApp",
      availability: "24/7",
      responseTime: "< 2 minutes",
      action: "Chat Now",
      primary: true
    },
    {
      icon: <Phone />,
      title: "Phone Support",
      description: "Speak directly with our team",
      availability: "9 AM - 9 PM EST",
      responseTime: "Immediate",
      action: "Call Now",
      primary: false
    },
    {
      icon: <Mail />,
      title: "Email Support",
      description: "Send us a detailed message",
      availability: "24/7",
      responseTime: "< 4 hours",
      action: "Send Email",
      primary: false
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-6 font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-base md:text-lg font-bold text-gray-900 dark:text-white mb-2">
            How Can We Help You? 🤝
          </h1>
          <p className="text-xs text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Our customer support team is here to help you 24/7. Get instant assistance via WhatsApp 
            or choose from our other support options below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Main Support Widget */}
          <div className="lg:col-span-2">
            <CustomerSupport />
          </div>

          {/* Contact Methods */}
          <div className="space-y-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-3">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-3">
                Contact Methods
              </h3>
              
              <div className="space-y-3">
                {contactMethods.map((method, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg border-2 ${
                      method.primary 
                        ? 'border-blue-500 dark:border-blue-600 bg-blue-50 dark:bg-blue-900/20' 
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                    } transition-colors`}
                  >
                    <div className="flex items-start space-x-2">
                      <div className="flex-shrink-0">
                        <div className="w-6 h-6 flex items-center justify-center">
                          {React.cloneElement(method.icon as React.ReactElement, { 
                            className: `w-6 h-6 ${method.primary ? 'text-blue-600 dark:text-blue-400' : 'text-blue-600 dark:text-blue-400'}` 
                          })}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-0.5">
                          {method.title}
                        </h4>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                          {method.description}
                        </p>
                        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                          <span>{method.availability}</span>
                          <span className="font-medium text-blue-600 dark:text-blue-400">
                            {method.responseTime}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Support Hours */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-3">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-3 flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                Support Hours
              </h3>
              
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">WhatsApp Support:</span>
                  <span className="font-medium text-blue-600 dark:text-blue-400">24/7</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Phone Support:</span>
                  <span className="font-medium text-gray-900 dark:text-white">9 AM - 9 PM EST</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Email Support:</span>
                  <span className="font-medium text-gray-900 dark:text-white">24/7</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-4">
            <h2 className="text-sm font-bold text-gray-900 dark:text-white mb-3 flex items-center">
              <HelpCircle className="w-4 h-4 mr-1" />
              Frequently Asked Questions
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {faqItems.map((item, index) => (
                <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-3 bg-gray-50 dark:bg-gray-900/50">
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                    {item.question}
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>
            
            <div className="mt-4 text-center">
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                Can't find what you're looking for?
              </p>
              <button className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white px-4 py-2 rounded-lg transition-colors text-sm">
                Contact Support
              </button>
            </div>
          </div>
        </div>

        {/* Emergency Support */}
        <div className="mt-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
          <div className="flex items-center space-x-2">
            <div className="flex-shrink-0">
              <div className="w-6 h-6 bg-red-600 dark:bg-red-700 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xs">!</span>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-red-800 dark:text-red-400">
                Emergency Support
              </h3>
              <p className="text-xs text-red-700 dark:text-red-300">
                For urgent issues like payment problems or order emergencies, 
                use our WhatsApp urgent support for immediate assistance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Support };
export default Support;