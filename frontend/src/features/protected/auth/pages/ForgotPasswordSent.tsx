import { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, CheckCircle, RefreshCw, ArrowLeft } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { AuthAPI } from '@/api';
import { extractErrorMessage } from '@/utils/api-response';
import { Heading, Body, Text } from '@/components/ui/Text/Text';
import { Button } from '@/components/ui/Button';

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

/**
 * ForgotPasswordSent component
 * Shown after user requests password reset to confirm email was sent
 */
export const ForgotPasswordSent = () => {
  const location = useLocation();
  const email = location.state?.email || 'your email';
  const [resending, setResending] = useState(false);
  const [resent, setResent] = useState(false);

  const handleResendEmail = async () => {
    setResending(true);
    try {
      await AuthAPI.forgotPassword(email);
      setResent(true);
      toast.success('Password reset email resent successfully!');
    } catch (error) {
      toast.error(extractErrorMessage(error) || 'Failed to resend email. Please try again.');
    } finally {
      setResending(false);
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
        className="max-w-md mx-auto bg-surface p-8 rounded-lg shadow-sm border border-border-light text-center"
        variants={itemVariants}
      >
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        >
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle size={32} className="text-green-600" />
          </div>
        </motion.div>

        <Heading level={5} className="text-2xl font-bold text-main mb-2">
          Check Your Email
        </Heading>
        
        <Body className="text-copy-light mb-6">
          We've sent a password reset link to
        </Body>
        
        <Text className="text-primary font-semibold mb-6 break-all">
          {email}
        </Text>

        {/* Email Icon */}
        <motion.div
          className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6"
          animate={{ 
            scale: [1, 1.1, 1],
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          <Mail size={40} className="text-primary" />
        </motion.div>

        <Body className="text-sm text-copy mb-6">
          Click the link in the email to reset your password. The link will expire in 1 hour.
        </Body>

        {/* Instructions */}
        <motion.div 
          className="bg-surface-elevated p-4 rounded-lg mb-6 text-left"
          variants={itemVariants}
        >
          <Text className="text-sm font-semibold text-main mb-2">What to do next:</Text>
          <ul className="text-sm text-copy-light space-y-2">
            <li className="flex items-start">
              <span className="text-primary mr-2">1.</span>
              <span>Check your email inbox (and spam folder)</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">2.</span>
              <span>Click the "Reset Your Password" link</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">3.</span>
              <span>Create a new strong password</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">4.</span>
              <span>Login with your new password</span>
            </li>
          </ul>
        </motion.div>

        {/* Resend Email Button */}
        {!resent ? (
          <Button
            variant="outline"
            fullWidth
            onClick={handleResendEmail}
            disabled={resending}
            isLoading={resending}
            className="mb-4"
          >
            {resending ? (
              'Resending...'
            ) : (
              <>
                <RefreshCw size={16} className="mr-2" />
                Resend Reset Link
              </>
            )}
          </Button>
        ) : (
          <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
            <Text className="text-sm text-green-700">
              ✓ Password reset email resent successfully!
            </Text>
          </div>
        )}

        {/* Back to Login Link */}
        <Link 
          to="/login" 
          className="inline-flex items-center text-sm text-copy-light hover:text-primary transition-colors"
        >
          <ArrowLeft size={16} className="mr-1" />
          Back to Login
        </Link>

        {/* Help Text */}
        <motion.div 
          className="mt-6 pt-6 border-t border-border-light"
          variants={itemVariants}
        >
          <Text className="text-xs text-copy-light">
            Didn't receive the email? Check your spam folder or contact{' '}
            <a href="mailto:support@banwee.com" className="text-primary hover:underline">
              support@banwee.com
            </a>
          </Text>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ForgotPasswordSent;
