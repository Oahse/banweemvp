/**
 * Support Float Widget
 * Floating support button at bottom-right with quick access to support options
 */

import React, { useState } from 'react';
import { MessageCircle, X, Mail, HelpCircle, ExternalLink } from 'lucide-react';
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
        className="fixed bottom-6 right-6 z-50 bg-primary hover:bg-primary-dark text-white rounded-full shadow-lg transition-all duration-300 flex items-center gap-2 px-4 py-3 group font-sans"
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
        <div className="fixed bottom-24 right-6 z-50 w-80 bg-surface rounded-lg shadow-2xl border border-border overflow-hidden animate-slideUp font-sans">
          {/* Header */}
          <div className="bg-primary text-white p-3">
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
            <a
              href="https://wa.me/18002269333"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 p-3 rounded-lg border border-border hover:border-primary hover:bg-primary/10 transition-colors group"
            >
              <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center group-hover:bg-primary/30">
                <MessageCircle className="w-4 h-4 text-primary" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold text-copy">WhatsApp</div>
                <div className="text-xs text-copy-light">Chat with us instantly</div>
              </div>
              <ExternalLink className="w-3 h-3 text-copy-lighter" />
            </a>

            <Link
              to="/contact"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 p-3 rounded-lg border border-border hover:border-primary hover:bg-primary/10 transition-colors group"
            >
              <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center group-hover:bg-primary/30">
                <Mail className="w-4 h-4 text-primary" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold text-copy">Contact Us</div>
                <div className="text-xs text-copy-light">Send us a message</div>
              </div>
              <ExternalLink className="w-3 h-3 text-copy-lighter" />
            </Link>

            <Link
              to="/faq"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 p-3 rounded-lg border border-border hover:border-primary hover:bg-primary/10 transition-colors group"
            >
              <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center group-hover:bg-primary/30">
                <HelpCircle className="w-4 h-4 text-primary" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold text-copy">FAQs</div>
                <div className="text-xs text-copy-light">Find quick answers</div>
              </div>
              <ExternalLink className="w-3 h-3 text-copy-lighter" />
            </Link>
          </div>

          {/* Contact Info */}
          <div className="bg-surface-elevated p-3 border-t border-border">
            <div className="text-xs text-copy-light space-y-1">
              <div className="flex items-center gap-2">
                <Mail className="w-3 h-3" />
                <span>support@banwee.com</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-3 h-3" />
                <span>1-800-BANWEE</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
};

export default SupportFloat;
