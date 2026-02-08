/**
 * Maintenance Mode Page
 * Displayed when the site is under maintenance or updates
 */

import React, { useState, useEffect } from 'react';
import { Wrench, Clock, Mail, Twitter, Facebook, Instagram, RefreshCw } from 'lucide-react';

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4 py-12 font-sans">
      <div className="max-w-2xl w-full">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full mb-4">
            <Wrench className="w-10 h-10 text-primary animate-pulse" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Under Maintenance
          </h1>
        </div>

        {/* Main Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          {/* Progress Bar */}
          <div className="h-2 bg-gray-200 dark:bg-gray-700">
            <div className="h-full bg-primary animate-pulse" style={{ width: '60%' }}></div>
          </div>

          <div className="p-8">
            {/* Message */}
            <div className="text-center mb-8">
              <p className="text-base text-gray-700 dark:text-gray-300 mb-6">
                {message}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                We'll be back online shortly. Thank you for your patience!
              </p>
            </div>

            {/* Time Estimate */}
            <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-6 mb-6">
              <div className="flex items-center justify-center gap-3 mb-3">
                <Clock className="w-5 h-5 text-primary" />
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                  Estimated Downtime
                </h3>
              </div>
              {showCountdown && timeRemaining ? (
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-1">
                    {timeRemaining}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    Time remaining
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">
                    {estimatedTime}
                  </div>
                </div>
              )}
            </div>

            {/* What's Happening */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                What we're working on:
              </h3>
              <ul className="space-y-2">
                {[
                  'System performance improvements',
                  'Security updates and patches',
                  'New features and enhancements',
                  'Database optimization',
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-2 text-xs text-gray-600 dark:text-gray-400">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 flex-shrink-0"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <a
                    href="mailto:support@banwee.com"
                    className="text-xs text-primary hover:underline"
                  >
                    support@banwee.com
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-600 dark:text-gray-400">Follow us:</span>
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`text-gray-400 ${social.color} transition-colors`}
                      aria-label={social.name}
                    >
                      <social.icon className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Refresh Button */}
            <div className="mt-6 text-center">
              <button
                onClick={() => window.location.reload()}
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors text-sm font-medium"
              >
                <RefreshCw className="w-4 h-4" />
                Check Status
              </button>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-6 text-xs text-gray-500 dark:text-gray-500">
          <p>
            For urgent matters, please contact us at{' '}
            <a href="tel:+18002269333" className="text-primary hover:underline">
              1-800-BANWEE
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Maintenance;
