/**
 * 404 Not Found Page
 * Displayed when a user navigates to a non-existent route
 */

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home, Search, ArrowLeft, Package, ShoppingBag, HelpCircle } from 'lucide-react';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  const quickLinks = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Products', href: '/products', icon: Package },
    { name: 'Cart', href: '/cart', icon: ShoppingBag },
    { name: 'Help Center', href: '/faq', icon: HelpCircle },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4 py-12 font-sans">
      <div className="max-w-2xl w-full text-center">
        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="relative inline-block">
            <h1 className="text-9xl md:text-[12rem] font-bold text-primary/20 dark:text-primary/10 select-none">
              404
            </h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <Search className="w-16 h-16 md:w-24 md:h-24 text-primary animate-pulse" />
            </div>
          </div>
        </div>

        {/* Message */}
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3">
            Oops! Page Not Found
          </h2>
          <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved. 
            Don't worry, let's get you back on track!
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-sm font-medium w-full sm:w-auto"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors text-sm font-medium w-full sm:w-auto"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </Link>
        </div>

        {/* Quick Links */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">
            Quick Links
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {quickLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="flex flex-col items-center gap-2 p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-primary dark:hover:border-primary hover:shadow-md transition-all group"
              >
                <link.icon className="w-6 h-6 text-gray-400 group-hover:text-primary transition-colors" />
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300 group-hover:text-primary transition-colors">
                  {link.name}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Help Text */}
        <div className="mt-8 text-xs text-gray-500 dark:text-gray-500">
          Need help? <Link to="/contact" className="text-primary hover:underline">Contact our support team</Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
