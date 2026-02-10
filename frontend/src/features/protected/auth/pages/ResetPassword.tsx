import React, { useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';
import { Input } from '@/components/ui/Form';
import { toast } from 'react-hot-toast';
import { extractErrorMessage } from '@/utils/api-response';
import { Button } from '@/components/ui/Button';
import { Heading, Body } from '@/components/ui/Text/Text';

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

export const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    if (!token) {
      toast.error('No reset token found.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/v1/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, new_password: password }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message || 'Password reset successfully!');
        setTimeout(() => navigate('/login'), 2000);
      } else {
        toast.error(extractErrorMessage(data) || 'Failed to reset password.');
      }
    } catch (error) {
      toast.error(extractErrorMessage(error) || 'An error occurred while resetting your password.');
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
        <Heading level={5} className="text-xl font-bold text-main mb-4 text-center">Reset Password</Heading>
        <Body className="text-sm text-copy-light text-center mb-4">
          Enter your new password below.
        </Body>
        <motion.form className="space-y-3" onSubmit={handleSubmit} variants={itemVariants}>
          <Input
            label="New Password"
            id="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            suffix={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="p-1 hover:bg-surface-elevated rounded transition-colors"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            }
          />
          <Input
            label="Confirm New Password"
            id="confirmPassword"
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            suffix={
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="p-1 hover:bg-surface-elevated rounded transition-colors"
              >
                {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            }
          />
          <Button
            type="submit"
            variant="primary"
            fullWidth={true}
            disabled={loading}
            isLoading={loading}
          >
            {loading ? 'Resetting...' : 'Reset Password'}
          </Button>
        </motion.form>
        <motion.p className="text-center mt-4 text-sm text-copy-light" variants={itemVariants}>
          Remember your password? <Link to="/login" className="text-primary hover:underline">Login</Link>
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

export default ResetPassword;
