import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Input } from '../../../../components/generic/Input';
import { toast } from 'react-hot-toast';
import { validation } from '../../../../utils/validation';
import { AuthAPI } from '../../../../api';
import { extractErrorMessage } from '../../../../utils/api-response';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
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

export const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Enhanced validation using validation utility
    const emailValidation = validation.email(email);
    if (!emailValidation.valid) {
      toast.error(emailValidation.message);
      return;
    }

    setLoading(true);
    
    try {
      // Call the forgot password API
      await AuthAPI.forgotPassword(email.toLowerCase().trim());
      
      toast.success(`Password reset link sent! If an account with ${email} exists, you will receive a password reset link.`);
      setEmail('');
    } catch (error: any) {
      const errorMessage = extractErrorMessage(error);
      toast.error(errorMessage || 'Failed to send reset link. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      className="container mx-auto px-4 py-8 text-copy"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div 
        className="max-w-md mx-auto bg-surface p-6 rounded-lg shadow-sm border border-border-light"
        variants={itemVariants}
      >
        <motion.h1 className="text-xl font-bold text-main mb-4 text-center" variants={itemVariants}>
          Forgot Your Password?
        </motion.h1>
        <motion.p className="text-xs text-copy-light text-center mb-4" variants={itemVariants}>
          Enter your email address below and we'll send you a link to reset your password.
        </motion.p>
        <motion.form className="space-y-3" onSubmit={handleSubmit} variants={itemVariants}>
          <Input
            label="Email Address"
            id="email"
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            required
            error=""
            className=""
          />
          <button
            type="submit"
            className="w-full bg-primary hover:bg-primary-dark text-white py-2 rounded-md transition-colors flex justify-center items-center text-sm"
            disabled={loading}>
            {loading ? (
              <span className="flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Sending Link...
              </span>
            ) : (
              'Send Reset Link'
            )}
          </button>
        </motion.form>
        <motion.p className="text-center mt-4 text-xs text-copy-light" variants={itemVariants}>
          Remember your password? <Link to="/login" className="text-primary hover:underline">Login</Link>
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

export default ForgotPassword;