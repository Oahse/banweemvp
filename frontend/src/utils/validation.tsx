import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

// Enhanced validation helpers
export const validation = {
  email: (email: string): { valid: boolean; message: string } => {
    if (!email) {
      return { valid: false, message: 'Email is required' };
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { valid: false, message: 'Please enter a valid email address' };
    }
    
    if (email.length > 254) {
      return { valid: false, message: 'Email address is too long' };
    }
    
    return { valid: true, message: '' };
  },

  password: (password: string): { valid: boolean; message: string } => {
    if (!password) {
      return { valid: false, message: 'Password is required' };
    }
    
    if (password.length < 8) {
      return { valid: false, message: 'Password must be at least 8 characters long' };
    }
    
    if (password.length > 128) {
      return { valid: false, message: 'Password cannot exceed 128 characters' };
    }
    
    // Check for at least one letter and one number
    const hasLetter = /[A-Za-z]/.test(password);
    const hasNumber = /\d/.test(password);
    
    if (!hasLetter || !hasNumber) {
      return { valid: false, message: 'Password must contain at least one letter and one number' };
    }
    
    return { valid: true, message: '' };
  },

  name: (name: string): { valid: boolean; message: string } => {
    if (!name) {
      return { valid: false, message: 'Name is required' };
    }
    
    const trimmedName = name.trim();
    
    if (trimmedName.length < 2) {
      return { valid: false, message: 'Name must be at least 2 characters long' };
    }
    
    if (trimmedName.length > 50) {
      return { valid: false, message: 'Name cannot exceed 50 characters' };
    }
    
    // Allow letters, spaces, hyphens, and apostrophes
    const nameRegex = /^[A-Za-z\s\-']+$/;
    if (!nameRegex.test(trimmedName)) {
      return { valid: false, message: 'Name can only contain letters, spaces, hyphens, and apostrophes' };
    }
    
    return { valid: true, message: '' };
  },

  phone: (phone: string): { valid: boolean; message: string } => {
    if (!phone) {
      return { valid: false, message: 'Phone number is required' };
    }
    
    // Remove all non-digit characters for validation
    const digitsOnly = phone.replace(/\D/g, '');
    
    if (digitsOnly.length < 10) {
      return { valid: false, message: 'Phone number must be at least 10 digits' };
    }
    
    if (digitsOnly.length > 15) {
      return { valid: false, message: 'Phone number cannot exceed 15 digits' };
    }
    
    return { valid: true, message: '' };
  },

  postalCode: (code: string, country: string = 'US'): { valid: boolean; message: string } => {
    if (!code) {
      return { valid: false, message: 'Postal code is required' };
    }
    
    const trimmedCode = code.trim();
    
    // Country-specific validation
    switch (country.toUpperCase()) {
      case 'US':
        const usZipRegex = /^\d{5}(-\d{4})?$/;
        if (!usZipRegex.test(trimmedCode)) {
          return { valid: false, message: 'Please enter a valid US ZIP code (e.g., 12345 or 12345-6789)' };
        }
        break;
      case 'CA':
        const caPostalRegex = /^[A-Za-z]\d[A-Za-z] ?\d[A-Za-z]\d$/;
        if (!caPostalRegex.test(trimmedCode)) {
          return { valid: false, message: 'Please enter a valid Canadian postal code (e.g., K1A 0A6)' };
        }
        break;
      case 'GB':
        const ukPostcodeRegex = /^[A-Za-z]{1,2}\d[A-Za-z\d]? ?\d[A-Za-z]{2}$/;
        if (!ukPostcodeRegex.test(trimmedCode)) {
          return { valid: false, message: 'Please enter a valid UK postcode (e.g., SW1A 1AA)' };
        }
        break;
      default:
        // Generic validation for other countries
        if (trimmedCode.length < 3 || trimmedCode.length > 10) {
          return { valid: false, message: 'Postal code must be between 3 and 10 characters' };
        }
    }
    
    return { valid: true, message: '' };
  },

  quantity: (quantity: number | string, maxStock?: number): { valid: boolean; message: string } => {
    const qty = typeof quantity === 'string' ? parseInt(quantity) : quantity;
    
    if (isNaN(qty)) {
      return { valid: false, message: 'Quantity must be a valid number' };
    }
    
    if (qty < 1) {
      return { valid: false, message: 'Quantity must be at least 1' };
    }
    
    if (qty > 50) {
      return { valid: false, message: 'Maximum quantity per item is 50' };
    }
    
    if (maxStock && qty > maxStock) {
      return { valid: false, message: `Only ${maxStock} items available in stock` };
    }
    
    return { valid: true, message: '' };
  },

  couponCode: (code: string): { valid: boolean; message: string } => {
    if (!code) {
      return { valid: false, message: 'Coupon code is required' };
    }
    
    const trimmedCode = code.trim();
    
    if (trimmedCode.length < 3) {
      return { valid: false, message: 'Coupon code must be at least 3 characters' };
    }
    
    if (trimmedCode.length > 20) {
      return { valid: false, message: 'Coupon code cannot exceed 20 characters' };
    }
    
    // Allow alphanumeric characters, hyphens, and underscores
    const codeRegex = /^[A-Za-z0-9\-_]+$/;
    if (!codeRegex.test(trimmedCode)) {
      return { valid: false, message: 'Coupon code can only contain letters, numbers, hyphens, and underscores' };
    }
    
    return { valid: true, message: '' };
  }
};

// Legacy functions for backward compatibility
export const isValidEmail = (email) => {
  return validation.email(email).valid;
};

export const isValidPhone = (phone) => {
  return validation.phone(phone).valid;
};

export const isValidPostalCode = (code) => {
  return validation.postalCode(code).valid;
};

// Form validation helper
export const validateForm = (fields: Record<string, any>, rules: Record<string, (value: any) => { valid: boolean; message: string }>): { valid: boolean; errors: Record<string, string> } => {
  const errors: Record<string, string> = {};
  let isValid = true;
  
  for (const [fieldName, rule] of Object.entries(rules)) {
    const fieldValue = fields[fieldName];
    const result = rule(fieldValue);
    
    if (!result.valid) {
      errors[fieldName] = result.message;
      isValid = false;
    }
  }
  
  return { valid: isValid, errors };
};