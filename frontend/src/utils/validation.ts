/**
 * Validation utilities for form inputs
 */

export interface ValidationResult {
  valid: boolean;
  message: string;
}

export const validation = {
  /**
   * Validate name (first name or last name)
   */
  name: (name: string): ValidationResult => {
    if (!name || name.trim().length === 0) {
      return { valid: false, message: 'Name is required' };
    }
    if (name.trim().length < 2) {
      return { valid: false, message: 'Name must be at least 2 characters' };
    }
    if (name.trim().length > 50) {
      return { valid: false, message: 'Name must be less than 50 characters' };
    }
    // Check for valid characters (letters, spaces, hyphens, apostrophes)
    if (!/^[a-zA-Z\s'-]+$/.test(name.trim())) {
      return { valid: false, message: 'Name can only contain letters, spaces, hyphens, and apostrophes' };
    }
    return { valid: true, message: 'Valid name' };
  },

  /**
   * Validate email address
   */
  email: (email: string): ValidationResult => {
    if (!email || email.trim().length === 0) {
      return { valid: false, message: 'Email is required' };
    }
    // Basic email regex pattern
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return { valid: false, message: 'Please enter a valid email address' };
    }
    return { valid: true, message: 'Valid email' };
  },

  /**
   * Validate password
   */
  password: (password: string): ValidationResult => {
    if (!password || password.length === 0) {
      return { valid: false, message: 'Password is required' };
    }
    if (password.length < 8) {
      return { valid: false, message: 'Password must be at least 8 characters' };
    }
    if (password.length > 128) {
      return { valid: false, message: 'Password must be less than 128 characters' };
    }
    // Check for at least one letter and one number
    if (!/[a-zA-Z]/.test(password)) {
      return { valid: false, message: 'Password must contain at least one letter' };
    }
    if (!/[0-9]/.test(password)) {
      return { valid: false, message: 'Password must contain at least one number' };
    }
    return { valid: true, message: 'Valid password' };
  },

  /**
   * Validate coupon code
   */
  couponCode: (code: string): ValidationResult => {
    if (!code || code.trim().length === 0) {
      return { valid: false, message: 'Coupon code is required' };
    }
    if (code.trim().length < 3) {
      return { valid: false, message: 'Coupon code must be at least 3 characters' };
    }
    if (code.trim().length > 20) {
      return { valid: false, message: 'Coupon code must be less than 20 characters' };
    }
    // Check for valid characters (alphanumeric and hyphens)
    if (!/^[a-zA-Z0-9-]+$/.test(code.trim())) {
      return { valid: false, message: 'Coupon code can only contain letters, numbers, and hyphens' };
    }
    return { valid: true, message: 'Valid coupon code' };
  },
};
