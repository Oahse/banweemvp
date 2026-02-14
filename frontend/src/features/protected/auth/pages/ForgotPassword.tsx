import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, ArrowLeft } from 'lucide-react';
import { Input } from '@/components/ui/Form';
import { toast } from 'react-hot-toast';
import { validation } from '@/utils/validation';
import { AuthAPI } from '@/api';
import { extractErrorMessage } from '@/utils/api-response';
import { Button } from '@/components/ui/Button';
import { Heading, Body, Text } from '@/components/ui/Text/Text';

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
  const navigate = useNavigate();

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
      
      // Navigate to confirmation page with email
      navigate('/forgot-password-sent', { state: { email: email.toLowerCase().trim() } });
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
        className="max-w-md mx-auto bg-surface p-8 rounded-lg shadow-sm border border-border-light"
        variants={itemVariants}
      >
        {/* Back to Login Link */}
        <Link 
          to="/login" 
          className="inline-flex items-center text-sm text-copy-light hover:text-primary transition-colors mb-6"
        >
          <ArrowLeft size={16} className="mr-1" />
          Back to Login
        </Link>

        <Heading level={5} className="text-2xl font-bold text-main mb-2 text-center">
          Forgot Your Password?
        </Heading>
        
        <Body className="text-sm text-copy-light text-center mb-6">
          No worries! Enter your email address and we'll send you a link to reset your password.
        </Body>

        <motion.form className="space-y-4" onSubmit={handleSubmit} variants={itemVariants}>
          <Input
            label="Email Address"
            id="email"
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            prefix={<Mail size={16} />}
          />

          <Button
            type="submit"
            variant="primary"
            fullWidth={true}
            disabled={loading}
            isLoading={loading}
          >
            {loading ? 'Sending...' : 'Send Reset Link'}
          </Button>
        </motion.form>

        {/* Help Text */}
        <motion.div 
          className="mt-6 pt-6 border-t border-border-light text-center"
          variants={itemVariants}
        >
          <Text className="text-xs text-copy-light">
            Remember your password?{' '}
            <Link to="/login" className="text-primary hover:underline font-medium">
              Login here
            </Link>
          </Text>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ForgotPassword;