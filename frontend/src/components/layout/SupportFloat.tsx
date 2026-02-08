/**
 * Support Float Widget
 * Floating support button at bottom-right with quick access to support options
 */

import React, { useState } from 'react';
import { MessageCircle, X, Mail, Phone, HelpCircle, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const SupportFloat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleWidget = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={toggleWidget}
        className="fixed bottom-6 right-6 z-50 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white rounded-full shadow-lg transition-all duration-300 flex items-center gap-2 px-4 py-3 group font-sans"
        aria-label="Open support widget"
      >
        {isOpen ? (
          <X className="w-5 h-5" />
        ) : (
          <>
            <MessageCircle className="w-5 h-5" />
            <span className="text-sm font-medium hidden sm:inline">Need Help?</span>
          </>
        )}
      </button>

      {/* Support Widget */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden animate-slideUp font-sans">
          {/* Header */}
          <div className="bg-blue-600 dark:bg-blue-700 text-white p-3">
            <h3 className="text-sm font-bold flex items-center gap-2">
              <MessageCircle className="w-4 h-4" />
              Customer Support
            </h3>
            <p className="text-xs mt-0.5 opacity-90">
              How can we help you today?
            </p>
          </div>

          {/* Quick Actions */}
          <div className="p-3 space-y-2">
            <Link
              to="/contact"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors group"
            >
              <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center group-hover:bg-blue-200 dark:group-hover:bg-blue-900/50">
                <Mail className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold text-gray-900 dark:text-white">Contact Us</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Send us a message</div>
              </div>
              <ExternalLink className="w-3 h-3 text-gray-400 dark:text-gray-500" />
            </Link>

            <Link
              to="/faq"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors group"
            >
              <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center group-hover:bg-blue-200 dark:group-hover:bg-blue-900/50">
                <HelpCircle className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold text-gray-900 dark:text-white">FAQs</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Find quick answers</div>
              </div>
              <ExternalLink className="w-3 h-3 text-gray-400 dark:text-gray-500" />
            </Link>

            <Link
              to="/support"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors group"
            >
              <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center group-hover:bg-purple-200 dark:group-hover:bg-purple-900/50">
                <MessageCircle className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold text-gray-900 dark:text-white">Support Center</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Get comprehensive help</div>
              </div>
              <ExternalLink className="w-3 h-3 text-gray-400 dark:text-gray-500" />
            </Link>
          </div>

          {/* Contact Info */}
          <div className="bg-gray-50 dark:bg-gray-900/50 p-3 border-t border-gray-200 dark:border-gray-700">
            <div className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
              <div className="flex items-center gap-2">
                <Mail className="w-3 h-3" />
                <span>support@banwee.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3 h-3" />
                <span>1-800-BANWEE</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 dark:bg-black/40"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
};

export default SupportFloat;
