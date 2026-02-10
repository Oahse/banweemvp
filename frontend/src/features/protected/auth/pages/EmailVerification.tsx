import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, Loader } from 'lucide-react';
import { extractErrorMessage } from '../../../../utils/api-response';
import { Heading, Body, Text } from '@/components/ui/Text/Text';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3 }
  }
};

export const EmailVerification = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [verificationStatus, setVerificationStatus] = useState('pending');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!token) {
      setVerificationStatus('error');
      setMessage('No verification token found.');
      return;
    }

    const verifyEmail = async () => {
      try {
        const response = await fetch(`/v1/auth/verify-email?token=${token}`);
        const data = await response.json();

        if (response.ok) {
          setVerificationStatus('success');
          setMessage(data.message || 'Email verified successfully!');
        } else {
          setVerificationStatus('error');
          setMessage(extractErrorMessage(data) || 'Failed to verify email.');
        }
      } catch (error) {
        setVerificationStatus('error');
        setMessage(extractErrorMessage(error) || 'An error occurred while verifying your email.');
      }
    };

    verifyEmail();
  }, [token]);

  return (
    <motion.div 
      className="container mx-auto px-4 py-8 text-copy"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div 
        className="max-w-md mx-auto bg-surface p-6 rounded-lg shadow-sm border border-border-light text-center"
        variants={itemVariants}
      >
        <Heading level={1} className="text-xl font-bold text-main mb-4">Email Verification</Heading>
        
        <AnimatePresence mode="wait">
          {verificationStatus === 'pending' && (
            <motion.div 
              className="space-y-3"
              key="pending"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
            <Loader size={48} className="mx-auto text-primary animate-spin" />
            <Body className="text-sm text-copy-light">Verifying your email...</Body>
          </motion.div>
        )}
        
        {verificationStatus === 'success' && (
          <motion.div 
            className="space-y-3"
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
          >
            <CheckCircle size={48} className="mx-auto text-green-500" />
            <Body className="text-sm text-copy">{message}</Body>
            <Link 
              to="/login" 
              className="inline-block w-full bg-primary hover:bg-primary-dark text-white py-2 rounded-md transition-colors text-sm mt-3"
            >
              Go to Login
            </Link>
          </motion.div>
        )}
        
        {verificationStatus === 'error' && (
          <motion.div 
            className="space-y-3"
            key="error"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
          >
            <XCircle size={48} className="mx-auto text-red-500" />
            <Body className="text-sm text-red-600">{message}</Body>
            <Link 
              to="/login" 
              className="inline-block text-primary hover:underline text-xs mt-2"
            >
              Back to Login
            </Link>
          </motion.div>
        )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default EmailVerification;
