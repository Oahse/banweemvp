/**
 * Support Float Widget
 * Floating support button at bottom-right with quick access to support options
 */

import React, { useState } from 'react';
import { MessageCircle, X, Mail, HelpCircle, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Text, Heading, Caption } from '@/components/ui/Text/Text';

const SupportFloat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleWidget = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Floating Button */}
      <Button
        onClick={toggleWidget}
        variant="primary"
        size="sm"
        className="fixed bottom-24 right-6 z-50 bg-primary hover:bg-primary-dark text-white rounded-full shadow-lg transition-all duration-300 flex items-center gap-2 px-4 py-3 group font-sans"
        aria-label="Open support widget"
      >
        {isOpen ? (
          <X className="w-5 h-5" />
        ) : (
          <>
            <MessageCircle className="w-5 h-5" />
            <Text as="span" className="text-sm font-medium hidden sm:inline">Need Help?</Text>
          </>
        )}
      </Button>

      {/* Support Widget */}
      {isOpen && (
        <div className="fixed bottom-36 right-6 z-50 w-80 bg-surface rounded-lg shadow-2xl border border-border overflow-hidden animate-slideUp font-sans">
          {/* Header */}
          <div className="bg-primary text-white p-3">
            <Heading level={3} className="text-sm font-bold flex items-center gap-2">
              <MessageCircle className="w-4 h-4" />
              Customer Support
            </Heading>
            <Caption className="text-xs mt-0.5 opacity-90">How can we help you today?</Caption>
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
                <Heading level={4} className="text-sm font-semibold text-copy">WhatsApp</Heading>
                <Caption className="text-xs text-copy-light">Chat with us instantly</Caption>
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
                <Heading level={4} className="text-sm font-semibold text-copy">Contact Us</Heading>
                <Caption className="text-xs text-copy-light">Send us a message</Caption>
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
                <Heading level={4} className="text-sm font-semibold text-copy">FAQs</Heading>
                <Caption className="text-xs text-copy-light">Find quick answers</Caption>
              </div>
              <ExternalLink className="w-3 h-3 text-copy-lighter" />
            </Link>
          </div>

          {/* Contact Info */}
          <div className="bg-surface-elevated p-3 border-t border-border">
            <div className="text-xs text-copy-light space-y-1">
              <div className="flex items-center gap-2">
                <Mail className="w-3 h-3" />
                <Text as="span">support@banwee.com</Text>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-3 h-3" />
                <Text as="span">1-800-BANWEE</Text>
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
