/**
 * Maintenance Mode Page
 * Displayed when the site is under maintenance or updates
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Wrench, Clock, Mail, Twitter, Facebook, Instagram, RefreshCw } from 'lucide-react';
import { Heading, Body, Text } from '@/components/ui/Text/Text';

interface MaintenanceProps {
  estimatedTime?: string;
  message?: string;
  showCountdown?: boolean;
  endTime?: Date;
}

const Maintenance: React.FC<MaintenanceProps> = ({
  estimatedTime = '2 hours',
  message = 'We are currently performing scheduled maintenance to improve your experience.',
  showCountdown = false,
  endTime,
}) => {
  const [timeRemaining, setTimeRemaining] = useState<string>('');

  useEffect(() => {
    if (showCountdown && endTime) {
      const interval = setInterval(() => {
        const now = new Date().getTime();
        const end = new Date(endTime).getTime();
        const distance = end - now;

        if (distance < 0) {
          setTimeRemaining('Maintenance complete!');
          clearInterval(interval);
        } else {
          const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((distance % (1000 * 60)) / 1000);
          setTimeRemaining(`${hours}h ${minutes}m ${seconds}s`);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [showCountdown, endTime]);

  const socialLinks = [
    { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/banwee', color: 'hover:text-blue-400' },
    { name: 'Facebook', icon: Facebook, href: 'https://facebook.com/banwee', color: 'hover:text-blue-600' },
    { name: 'Instagram', icon: Instagram, href: 'https://instagram.com/banwee', color: 'hover:text-pink-600' },
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
      className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4 py-6 font-sans"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-2xl w-full">
        {/* Logo/Brand */}
        <motion.div className="text-center mb-6" variants={scaleVariants}>
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-3">
            <Wrench className="w-8 h-8 text-primary animate-pulse" />
          </div>
          <Heading level={5} className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-1">
            Under Maintenance
          </Heading>
        </motion.div>

        {/* Main Card */}
        <motion.div
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
          variants={itemVariants}
        >
          {/* Progress Bar */}
          <div className="h-2 bg-gray-200 dark:bg-gray-700">
            <div className="h-full bg-primary animate-pulse" style={{ width: '60%' }}></div>
          </div>

          <div className="p-6">
            {/* Message */}
            <motion.div className="text-center mb-6" variants={itemVariants}>
              <Body className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                {message}
              </Body>
              <Body className="text-sm text-gray-600 dark:text-gray-400">
                We'll be back online shortly. Thank you for your patience!
              </Body>
            </motion.div>

            {/* Time Estimate */}
            <motion.div
              className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4 mb-4"
              variants={scaleVariants}
            >
              <div className="flex items-center justify-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-primary" />
                <Heading level={5} className="text-sm font-semibold text-gray-900 dark:text-white">
                  Estimated Time
                </Heading>
              </div>
              {showCountdown && timeRemaining ? (
                <div className="text-center">
                  <div className="text-xl font-bold text-primary mb-1 animate-pulse">
                    {timeRemaining}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Time remaining
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <div className="text-xl font-bold text-primary">
                    {estimatedTime}
                  </div>
                </div>
              )}
            </motion.div>

            {/* What's Happening */}
            <motion.div className="mb-4" variants={itemVariants}>
              <Heading level={5} className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                What we're working on:
              </Heading>
              <ul className="space-y-1.5">
                {[
                  'System performance improvements',
                  'Security updates and patches',
                  'New features and enhancements',
                  'Database optimization',
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400"
                    variants={itemVariants}
                  >
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 flex-shrink-0 animate-pulse"></div>
                    <Text>{item}</Text>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Contact */}
            <motion.div
              className="border-t border-gray-200 dark:border-gray-700 pt-4"
              variants={itemVariants}
            >
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Mail className="w-3 h-3 text-gray-400" />
                  <a
                    href="mailto:support@banwee.com"
                    className="text-sm text-primary hover:underline"
                  >
                    support@banwee.com
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Text className="text-sm text-gray-600 dark:text-gray-400">Follow us:</Text>
                  {socialLinks.map((social) => (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`text-gray-400 ${social.color} transition-all`}
                      aria-label={social.name}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <social.icon className="w-3 h-3" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Refresh Button */}
            <motion.div className="mt-4 text-center" variants={itemVariants}>
              <motion.button
                onClick={() => window.location.reload()}
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg transition-all text-sm font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <RefreshCw className="w-4 h-4" />
                Check Status
              </motion.button>
            </motion.div>
          </div>
        </motion.div>

        {/* Footer Note */}
        <motion.div
          className="text-center mt-4 text-sm text-gray-500 dark:text-gray-500"
          variants={itemVariants}
        >
          <p>
            For urgent matters, please contact us at{' '}
            <a href="tel:+18002269333" className="text-primary hover:underline">
              1-800-BANWEE
            </a>
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Maintenance;
