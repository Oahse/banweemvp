/**
 * 404 Not Found Page
 * Displayed when a user navigates to a non-existent route
 */

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Search, ArrowLeft, Package, ShoppingBag, HelpCircle } from 'lucide-react';
import { Heading, Body, Text } from '@/components/ui/Text/Text';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  const quickLinks = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Products', href: '/products', icon: Package },
    { name: 'Cart', href: '/cart', icon: ShoppingBag },
    { name: 'Help Center', href: '/faq', icon: HelpCircle },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  const scaleVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <motion.div
      className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4 py-6 font-sans"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-2xl w-full text-center">
        {/* 404 Illustration */}
        <motion.div className="mb-6" variants={scaleVariants}>
          <div className="relative inline-block">
            <Heading level={5} className="text-9xl md:text-[12rem] font-bold text-primary/20 dark:text-primary/10 select-none">
              404
            </Heading>
            <div className="absolute inset-0 flex items-center justify-center">
              <Search className="w-16 h-16 md:w-24 md:h-24 text-primary animate-pulse" />
            </div>
          </div>
        </motion.div>

        {/* Message */}
        <motion.div className="mb-6" variants={itemVariants}>
          <Heading level={5} className="text-base md:text-lg font-bold text-gray-900 dark:text-white mb-2">
            Oops! Page Not Found
          </Heading>
          <Body className="text-sm text-gray-600 dark:text-gray-400 max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved. 
            Don't worry, let's get you back on track!
          </Body>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8"
          variants={itemVariants}
        >
          <motion.button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-all text-sm font-medium w-full sm:w-auto"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </motion.button>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg transition-all text-sm font-medium w-full sm:w-auto"
            >
              <Home className="w-4 h-4" />
              Back to Home
            </Link>
          </motion.div>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          className="border-t border-gray-200 dark:border-gray-700 pt-6"
          variants={itemVariants}
        >
          <Heading level={5} className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
            Quick Links
          </Heading>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {quickLinks.map((link) => (
              <motion.div
                key={link.name}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to={link.href}
                  className="flex flex-col items-center gap-2 p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-primary dark:hover:border-primary hover:shadow-md transition-all group"
                >
                  <link.icon className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors" />
                  <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-primary transition-colors">
                    {link.name}
                  </Text>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Help Text */}
        <motion.div
          className="mt-6 text-sm text-gray-500 dark:text-gray-500"
          variants={itemVariants}
        >
          Need help? <Link to="/contact" className="text-primary hover:underline">Contact our support team</Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default NotFound;
