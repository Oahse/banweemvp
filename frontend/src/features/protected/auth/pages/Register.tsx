import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, CheckCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-hot-toast';
import { Input } from '../../../../components/generic/Input';
import { Checkbox } from '../../../../components/generic/Checkbox';
import SocialAuth from '../components/SocialAuth';
import { validation } from '../../../../utils/validation';
import { Button } from '@/components/ui/Button';

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

/**
 * Register component for user account creation.
 * Allows users to register as a customer or supplier.
 */
export const Register = () => {
  // State variables for form fields
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  // State for user type selection (customer or supplier)
  const [userType, setUserType] = useState('customer');
  // State to toggle password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  // State for terms and conditions checkbox
  const [acceptTerms, setAcceptTerms] = useState(false);
  // State for loading indicator during form submission
  const [loading, setLoading] = useState(false);

  // Auth context for registration and authentication status
  const { register, isAuthenticated, isAdmin, isSupplier, intendedDestination, setIntendedDestination } = useAuth();
  // React Router hooks for navigation and location
  const navigate = useNavigate();
  const location = useLocation();

  /**
   * Effect hook to redirect authenticated users.
   * If a user is already logged in, they are redirected based on their role
   * or a 'redirect' parameter in the URL.
   */
  useEffect(() => {
    if (isAuthenticated) {
      // Determines the appropriate redirect path after successful login/registration
      const getRedirectPath = () => {
        // First priority: Check if user was redirected from another page
        if (location.state?.from?.pathname && location.state.from.pathname !== '/register') {
          console.log('Redirecting back to:', location.state.from.pathname);
          return location.state.from.pathname + (location.state.from.search || '');
        }
        
        // Second priority: intended destination (from protected route)
        if (intendedDestination && (intendedDestination as any).path !== '/register') {
          const destination = intendedDestination as any;
          // Always redirect back to the original page where the user was
          // This allows them to continue their shopping experience
          return destination.path;
        }
        
        // Third priority: redirect query parameter
        const params = new URLSearchParams(location.search);
        const redirect = params.get('redirect');
        if (redirect) return redirect;
        
        // Third priority: role-based default
        if (isAdmin) return '/admin';
        if (isSupplier) return '/account/products';
        return '/';
      };
      const redirectPath = getRedirectPath();
      
      // Show success message based on intended action
      if (intendedDestination && (intendedDestination as any).action === 'cart') {
        toast.success('Registration successful! You can now add items to your cart.');
      } else if (intendedDestination && (intendedDestination as any).action === 'wishlist') {
        toast.success('Registration successful! You can now add items to your wishlist.');
      }
      
      navigate(redirectPath);
      // Clear intended destination after navigation
      if (intendedDestination) {
        setIntendedDestination(null);
      }
    }
  }, [isAuthenticated, navigate, location.search, isAdmin, isSupplier, intendedDestination, setIntendedDestination]);

  /**
   * Handles the form submission for user registration.
   * Performs comprehensive client-side validation before attempting to register the user
   * via the authentication context.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Comprehensive client-side validation using validation utility
    // FIXED: Validate firstname and lastname separately
    const firstnameValidation = validation.name(firstname);
    if (!firstnameValidation.valid) {
      toast.error(`First name: ${firstnameValidation.message}`);
      return;
    }

    const lastnameValidation = validation.name(lastname);
    if (!lastnameValidation.valid) {
      toast.error(`Last name: ${lastnameValidation.message}`);
      return;
    }

    const emailValidation = validation.email(email);
    if (!emailValidation.valid) {
      toast.error(emailValidation.message);
      return;
    }

    const passwordValidation = validation.password(password);
    if (!passwordValidation.valid) {
      toast.error(passwordValidation.message);
      return;
    }

    // Check password confirmation
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    // Check terms acceptance
    if (!acceptTerms) {
      toast.error('Please accept the Terms of Service and Privacy Policy');
      return;
    }

    // Validate user type selection
    if (!userType) {
      toast.error('Please select an account type');
      return;
    }

    try {
      setLoading(true); // Show loading indicator
      // FIXED: Pass parameters in correct order: firstname, lastname, email, password
      // This now matches AuthContext.register signature:
      // register(firstname: string, lastname: string, email: string, password: string, phone?: string)
      await register(
        firstname.trim(),
        lastname.trim(),
        email.toLowerCase().trim(),
        password
      );
      toast.success('Registration successful! Welcome to Banwee Organics.');
      // Navigation to dashboard/home is handled by the useEffect hook based on authentication status
    } catch (error: any) {
      // Display specific error message if available
      const errorMessage = error?.response?.data?.message || error?.message || 'Registration failed. Please try again with different credentials.';
      toast.error(errorMessage);
      setLoading(false); // Hide loading indicator
    }
  };

  // Options for selecting user account type
  const userTypeOptions = [
    { value: 'customer', label: 'Customer', description: 'Shop for organic products' },
    { value: 'supplier', label: 'Supplier', description: 'Sell your products on our platform' },
  ];

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
        {/* Show message if redirected from another page */}
        {(location.search.includes('redirect=') || location.state?.from?.pathname) && (
          <motion.div 
            className="mb-4 p-3 bg-primary/10 border border-primary/30 rounded-md"
            variants={itemVariants}
          >
            <p className="text-sm text-copy">
              {location.state?.from?.pathname 
                ? 'Please create an account or log in to continue.'
                : 'Please create an account to continue to your requested page.'
              }
            </p>
          </motion.div>
        )}
        
        <motion.h1 className="text-xl font-bold text-main mb-4 text-center" variants={itemVariants}>
          Create an Account
        </motion.h1>
        <motion.form className="space-y-3" onSubmit={handleSubmit} variants={itemVariants}>
          {/* FIXED: First Name Input */}
          <Input
            label="First Name"
            id="firstname"
            type="text"
            placeholder="John"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            required
          />
          {/* FIXED: Last Name Input */}
          <Input
            label="Last Name"
            id="lastname"
            type="text"
            placeholder="Doe"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            required
          />
          {/* Email Address Input */}
          <Input
            label="Email Address"
            id="email"
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {/* Account Type Selection */}
          <div>
            <label htmlFor="userType" className="block text-xs font-medium text-main mb-1">
              Account Type
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
              {userTypeOptions.map((option) => (
                <div
                  key={option.value}
                  onClick={() => setUserType(option.value)}
                  className={`border rounded-lg p-2 cursor-pointer transition-all ${
                    userType === option.value
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  }`}>
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="text-sm font-medium text-main">{option.label}</h3>
                    {userType === option.value && <CheckCircle size={14} className="text-primary" />}
                  </div>
                  <p className="text-xs text-copy-light">{option.description}</p>
                </div>
              ))}
            </div>
          </div>
          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block text-xs font-medium text-main mb-1">
              Password
            </label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
              </Button>
            </div>
            {/* Password strength indicator (basic example) */}
            <div className="mt-1">
              <div className="h-1 w-full bg-border rounded-full overflow-hidden">
                <div
                  className={`h-full ${
                    password.length === 0
                      ? 'w-0'
                      : password.length < 6
                      ? 'w-1/4 bg-red-500'
                      : password.length < 8
                      ? 'w-2/4 bg-yellow-500'
                      : password.length < 10
                      ? 'w-3/4 bg-blue-500'
                      : 'w-full bg-green-500'
                  }`}>
                </div>
              </div>
              <p className="text-xs text-copy-light mt-1">Password should be at least 8 characters</p>
            </div>
          </div>
          {/* Confirm Password Input */}
          <div>
            <label htmlFor="confirmPassword" className="block text-xs font-medium text-main mb-1">
              Confirm Password
            </label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showConfirmPassword ? <EyeOff size={14} /> : <Eye size={14} />}
              </Button>
            </div>
          </div>
          <Checkbox
            label={
              <>
                I agree to the <Link to="/terms" className="text-primary hover:underline">Terms of Service</Link> and{' '}
                <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
              </>
            }
            id="terms"
            checked={acceptTerms}
            onChange={() => setAcceptTerms(!acceptTerms)}
            required={true}
            error=""
            className=""
          />
          <Button
            type="submit"
            variant="primary"
            fullWidth={true}
            disabled={loading}
            isLoading={loading}
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </Button>
        </motion.form>
        <motion.div variants={itemVariants}>
          <div className="relative flex items-center justify-center my-4">
          <div className="border-t border-border-light w-full"></div>
          <span className="bg-surface px-3 text-xs text-copy-light absolute">Or continue with</span>
        </div>
        <SocialAuth mode="register" />
        <motion.p className="text-center mt-4 text-xs text-copy-light" variants={itemVariants}>
          Already have an account? <Link to="/login" className="text-primary hover:underline">Login</Link>
        </motion.p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Register;