import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, CheckCircle, XCircle, Lock } from 'lucide-react';
import { Input } from '@/components/ui/Form';
import { toast } from 'react-hot-toast';
import { extractErrorMessage } from '@/utils/api-response';
import { validation } from '@/utils/validation';
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

export const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resetStatus, setResetStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      setResetStatus('error');
      setErrorMessage('No reset token found. Please request a new password reset link.');
    }
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate password
    const passwordValidation = validation.password(password);
    if (!passwordValidation.valid) {
      toast.error(passwordValidation.message);
      return;
    }

    // Check if passwords match
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
        setResetStatus('success');
        toast.success(data.message || 'Password reset successfully!');
        setTimeout(() => navigate('/login'), 3000);
      } else {
        setResetStatus('error');
        const error = extractErrorMessage(data) || 'Failed to reset password.';
        setErrorMessage(error);
        toast.error(error);
      }
    } catch (error) {
      setResetStatus('error');
      const errorMsg = extractErrorMessage(error) || 'An error occurred while resetting your password.';
      setErrorMessage(errorMsg);
      toast.error(errorMsg);
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
        <AnimatePresence mode="wait">
          {resetStatus === 'idle' && (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Lock Icon */}
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock size={32} className="text-primary" />
              </div>

              <Heading level={5} className="text-2xl font-bold text-main mb-2 text-center">
                Reset Your Password
              </Heading>
              
              <Body className="text-sm text-copy-light text-center mb-6">
                Enter your new password below. Make sure it's strong and secure.
              </Body>

              <motion.form className="space-y-4" onSubmit={handleSubmit} variants={itemVariants}>
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

                {/* Password Requirements */}
                {password && (
                  <div className="bg-surface-elevated p-3 rounded-lg">
                    <Text className="text-xs font-semibold text-main mb-2">Password must contain:</Text>
                    <ul className="text-xs text-copy-light space-y-1">
                      <li className={password.length >= 8 ? 'text-green-600' : ''}>
                        {password.length >= 8 ? '✓' : '○'} At least 8 characters
                      </li>
                      <li className={/[A-Z]/.test(password) ? 'text-green-600' : ''}>
                        {/[A-Z]/.test(password) ? '✓' : '○'} One uppercase letter
                      </li>
                      <li className={/[a-z]/.test(password) ? 'text-green-600' : ''}>
                        {/[a-z]/.test(password) ? '✓' : '○'} One lowercase letter
                      </li>
                      <li className={/[0-9]/.test(password) ? 'text-green-600' : ''}>
                        {/[0-9]/.test(password) ? '✓' : '○'} One number
                      </li>
                    </ul>
                  </div>
                )}

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

                {/* Password Match Indicator */}
                {confirmPassword && (
                  <div className={`text-xs ${password === confirmPassword ? 'text-green-600' : 'text-red-600'}`}>
                    {password === confirmPassword ? '✓ Passwords match' : '✗ Passwords do not match'}
                  </div>
                )}

                <Button
                  type="submit"
                  variant="primary"
                  fullWidth={true}
                  disabled={loading || !password || !confirmPassword || password !== confirmPassword}
                  isLoading={loading}
                >
                  {loading ? 'Resetting...' : 'Reset Password'}
                </Button>
              </motion.form>

              <motion.p className="text-center mt-6 text-sm text-copy-light" variants={itemVariants}>
                Remember your password?{' '}
                <Link to="/login" className="text-primary hover:underline font-medium">
                  Login here
                </Link>
              </motion.p>
            </motion.div>
          )}

          {resetStatus === 'success' && (
            <motion.div
              key="success"
              className="text-center space-y-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
            >
              <CheckCircle size={64} className="mx-auto text-green-500" />
              <Heading level={5} className="text-2xl font-bold text-main">
                Password Reset Successfully!
              </Heading>
              <Body className="text-copy-light">
                Your password has been reset. You can now login with your new password.
              </Body>
              <Body className="text-sm text-copy-light">
                Redirecting to login page...
              </Body>
              <Link 
                to="/login" 
                className="inline-block w-full bg-primary hover:bg-primary-dark text-white py-2 rounded-md transition-colors text-sm mt-4"
              >
                Go to Login
              </Link>
            </motion.div>
          )}

          {resetStatus === 'error' && (
            <motion.div
              key="error"
              className="text-center space-y-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
            >
              <XCircle size={64} className="mx-auto text-red-500" />
              <Heading level={5} className="text-2xl font-bold text-main">
                Reset Failed
              </Heading>
              <Body className="text-red-600">
                {errorMessage}
              </Body>

              {/* Show request new link option if token is expired */}
              {errorMessage.toLowerCase().includes('expired') && (
                <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <Text className="text-sm text-yellow-800 mb-3">
                    Your password reset link has expired. Request a new one to reset your password.
                  </Text>
                  <Link 
                    to="/forgot-password" 
                    className="inline-block w-full bg-primary hover:bg-primary-dark text-white py-2 rounded-md transition-colors text-sm"
                  >
                    Request New Reset Link
                  </Link>
                </div>
              )}

              <Link 
                to="/login" 
                className="inline-block text-primary hover:underline text-sm mt-4"
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

export default ResetPassword;
