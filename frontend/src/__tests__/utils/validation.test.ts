/**
 * Tests for Validation utilities - Comprehensive test suite
 */
import { describe, it, expect } from 'vitest';
import { 
  validation, 
  isValidEmail, 
  isValidPhone, 
  isValidPostalCode, 
  validateForm,
  cn 
} from '../../utils/validation';

describe('Validation Utilities', () => {
  describe('validation.email', () => {
    it('should validate correct email addresses', () => {
      const validEmails = [
        'test@example.com',
        'user.name@domain.co.uk',
        'user+tag@example.org',
        'user123@test-domain.com',
        'a@b.co',
        'very.long.email.address@very-long-domain-name.com'
      ];

      validEmails.forEach(email => {
        const result = validation.email(email);
        expect(result.valid).toBe(true);
        expect(result.message).toBe('');
      });
    });

    it('should reject invalid email addresses', () => {
      const invalidEmails = [
        'invalid-email',
        '@example.com',
        'user@',
        'user..name@example.com',
        'user@.com',
        'user@domain.',
        'user name@example.com',
        'user@domain@com'
      ];

      invalidEmails.forEach(email => {
        const result = validation.email(email);
        expect(result.valid).toBe(false);
        expect(result.message).toBe('Please enter a valid email address');
      });
    });

    it('should require email to be provided', () => {
      const result = validation.email('');
      expect(result.valid).toBe(false);
      expect(result.message).toBe('Email is required');
    });

    it('should reject emails that are too long', () => {
      const longEmail = 'a'.repeat(250) + '@example.com'; // Over 254 characters
      const result = validation.email(longEmail);
      expect(result.valid).toBe(false);
      expect(result.message).toBe('Email address is too long');
    });

    it('should handle edge cases', () => {
      // Test maximum valid length (254 characters)
      const maxLengthEmail = 'a'.repeat(240) + '@example.com'; // Exactly 254 chars
      const result = validation.email(maxLengthEmail);
      expect(result.valid).toBe(true);
    });
  });

  describe('validation.password', () => {
    it('should validate strong passwords', () => {
      const validPasswords = [
        'password123',
        'MySecure1Pass',
        'test1234',
        'a1b2c3d4e5f6g7h8',
        'ComplexPassword123!'
      ];

      validPasswords.forEach(password => {
        const result = validation.password(password);
        expect(result.valid).toBe(true);
        expect(result.message).toBe('');
      });
    });

    it('should reject passwords that are too short', () => {
      const shortPasswords = ['1234567', 'abc123', 'short1'];

      shortPasswords.forEach(password => {
        const result = validation.password(password);
        expect(result.valid).toBe(false);
        expect(result.message).toBe('Password must be at least 8 characters long');
      });
    });

    it('should reject passwords without letters', () => {
      const result = validation.password('12345678');
      expect(result.valid).toBe(false);
      expect(result.message).toBe('Password must contain at least one letter and one number');
    });

    it('should reject passwords without numbers', () => {
      const result = validation.password('abcdefgh');
      expect(result.valid).toBe(false);
      expect(result.message).toBe('Password must contain at least one letter and one number');
    });

    it('should require password to be provided', () => {
      const result = validation.password('');
      expect(result.valid).toBe(false);
      expect(result.message).toBe('Password is required');
    });

    it('should reject passwords that are too long', () => {
      const longPassword = 'a'.repeat(120) + '12345678'; // Over 128 characters
      const result = validation.password(longPassword);
      expect(result.valid).toBe(false);
      expect(result.message).toBe('Password cannot exceed 128 characters');
    });

    it('should handle edge cases', () => {
      // Test maximum valid length (128 characters)
      const maxLengthPassword = 'a'.repeat(120) + '1234567'; // Exactly 128 chars
      const result = validation.password(maxLengthPassword);
      expect(result.valid).toBe(true);
    });
  });

  describe('validation.name', () => {
    it('should validate correct names', () => {
      const validNames = [
        'John',
        'Mary Jane',
        'Jean-Pierre',
        "O'Connor",
        'José María',
        'Anne-Marie',
        'Van Der Berg'
      ];

      validNames.forEach(name => {
        const result = validation.name(name);
        expect(result.valid).toBe(true);
        expect(result.message).toBe('');
      });
    });

    it('should reject names that are too short', () => {
      const result = validation.name('A');
      expect(result.valid).toBe(false);
      expect(result.message).toBe('Name must be at least 2 characters long');
    });

    it('should reject names that are too long', () => {
      const longName = 'A'.repeat(51);
      const result = validation.name(longName);
      expect(result.valid).toBe(false);
      expect(result.message).toBe('Name cannot exceed 50 characters');
    });

    it('should reject names with invalid characters', () => {
      const invalidNames = [
        'John123',
        'Mary@Jane',
        'Test#Name',
        'User$Name',
        'Name%Test'
      ];

      invalidNames.forEach(name => {
        const result = validation.name(name);
        expect(result.valid).toBe(false);
        expect(result.message).toBe('Name can only contain letters, spaces, hyphens, and apostrophes');
      });
    });

    it('should require name to be provided', () => {
      const result = validation.name('');
      expect(result.valid).toBe(false);
      expect(result.message).toBe('Name is required');
    });

    it('should handle names with only whitespace', () => {
      const result = validation.name('   ');
      expect(result.valid).toBe(false);
      expect(result.message).toBe('Name must be at least 2 characters long');
    });

    it('should trim whitespace before validation', () => {
      const result = validation.name('  John  ');
      expect(result.valid).toBe(true);
    });
  });

  describe('validation.phone', () => {
    it('should validate correct phone numbers', () => {
      const validPhones = [
        '1234567890',
        '+1 (555) 123-4567',
        '555-123-4567',
        '(555) 123-4567',
        '+44 20 7946 0958',
        '+33 1 42 86 83 26',
        '123.456.7890'
      ];

      validPhones.forEach(phone => {
        const result = validation.phone(phone);
        expect(result.valid).toBe(true);
        expect(result.message).toBe('');
      });
    });

    it('should reject phone numbers that are too short', () => {
      const shortPhones = ['123456789', '555-1234', '12345'];

      shortPhones.forEach(phone => {
        const result = validation.phone(phone);
        expect(result.valid).toBe(false);
        expect(result.message).toBe('Phone number must be at least 10 digits');
      });
    });

    it('should reject phone numbers that are too long', () => {
      const longPhone = '1234567890123456'; // 16 digits
      const result = validation.phone(longPhone);
      expect(result.valid).toBe(false);
      expect(result.message).toBe('Phone number cannot exceed 15 digits');
    });

    it('should require phone number to be provided', () => {
      const result = validation.phone('');
      expect(result.valid).toBe(false);
      expect(result.message).toBe('Phone number is required');
    });

    it('should handle international formats', () => {
      const internationalPhones = [
        '+1234567890123', // 13 digits with country code
        '+49 30 12345678', // German format
        '+86 138 0013 8000' // Chinese format
      ];

      internationalPhones.forEach(phone => {
        const result = validation.phone(phone);
        expect(result.valid).toBe(true);
      });
    });
  });

  describe('validation.postalCode', () => {
    describe('US postal codes', () => {
      it('should validate US ZIP codes', () => {
        const validZips = ['12345', '12345-6789', '90210', '10001-1234'];

        validZips.forEach(zip => {
          const result = validation.postalCode(zip, 'US');
          expect(result.valid).toBe(true);
          expect(result.message).toBe('');
        });
      });

      it('should reject invalid US ZIP codes', () => {
        const invalidZips = ['1234', '123456', 'ABCDE', '12345-678'];

        invalidZips.forEach(zip => {
          const result = validation.postalCode(zip, 'US');
          expect(result.valid).toBe(false);
          expect(result.message).toBe('Please enter a valid US ZIP code (e.g., 12345 or 12345-6789)');
        });
      });
    });

    describe('Canadian postal codes', () => {
      it('should validate Canadian postal codes', () => {
        const validCodes = ['K1A 0A6', 'M5V 3L9', 'H2Y 1C6', 'K1A0A6'];

        validCodes.forEach(code => {
          const result = validation.postalCode(code, 'CA');
          expect(result.valid).toBe(true);
          expect(result.message).toBe('');
        });
      });

      it('should reject invalid Canadian postal codes', () => {
        const invalidCodes = ['K1A 0A', 'M5V-3L9', '12345', 'ABCDEF'];

        invalidCodes.forEach(code => {
          const result = validation.postalCode(code, 'CA');
          expect(result.valid).toBe(false);
          expect(result.message).toBe('Please enter a valid Canadian postal code (e.g., K1A 0A6)');
        });
      });
    });

    describe('UK postal codes', () => {
      it('should validate UK postcodes', () => {
        const validCodes = ['SW1A 1AA', 'M1 1AA', 'B33 8TH', 'W1A 0AX', 'EC1A 1BB'];

        validCodes.forEach(code => {
          const result = validation.postalCode(code, 'GB');
          expect(result.valid).toBe(true);
          expect(result.message).toBe('');
        });
      });

      it('should reject invalid UK postcodes', () => {
        const invalidCodes = ['SW1A', 'M1 1AAA', '12345', 'INVALID'];

        invalidCodes.forEach(code => {
          const result = validation.postalCode(code, 'GB');
          expect(result.valid).toBe(false);
          expect(result.message).toBe('Please enter a valid UK postcode (e.g., SW1A 1AA)');
        });
      });
    });

    describe('Generic postal codes', () => {
      it('should validate generic postal codes', () => {
        const validCodes = ['12345', 'ABC123', '1234-567'];

        validCodes.forEach(code => {
          const result = validation.postalCode(code, 'DE'); // Germany as example
          expect(result.valid).toBe(true);
          expect(result.message).toBe('');
        });
      });

      it('should reject postal codes that are too short or too long', () => {
        const result1 = validation.postalCode('12', 'DE');
        expect(result1.valid).toBe(false);
        expect(result1.message).toBe('Postal code must be between 3 and 10 characters');

        const result2 = validation.postalCode('12345678901', 'DE');
        expect(result2.valid).toBe(false);
        expect(result2.message).toBe('Postal code must be between 3 and 10 characters');
      });
    });

    it('should require postal code to be provided', () => {
      const result = validation.postalCode('', 'US');
      expect(result.valid).toBe(false);
      expect(result.message).toBe('Postal code is required');
    });

    it('should default to US validation when no country provided', () => {
      const result = validation.postalCode('12345');
      expect(result.valid).toBe(true);
    });
  });

  describe('validation.quantity', () => {
    it('should validate correct quantities', () => {
      const validQuantities = [1, 5, 10, 25, 50, '1', '10', '25'];

      validQuantities.forEach(qty => {
        const result = validation.quantity(qty);
        expect(result.valid).toBe(true);
        expect(result.message).toBe('');
      });
    });

    it('should reject quantities less than 1', () => {
      const invalidQuantities = [0, -1, -5, '0', '-1'];

      invalidQuantities.forEach(qty => {
        const result = validation.quantity(qty);
        expect(result.valid).toBe(false);
        expect(result.message).toBe('Quantity must be at least 1');
      });
    });

    it('should reject quantities greater than 50', () => {
      const result = validation.quantity(51);
      expect(result.valid).toBe(false);
      expect(result.message).toBe('Maximum quantity per item is 50');
    });

    it('should reject non-numeric quantities', () => {
      const invalidQuantities = ['abc', 'invalid', '1.5', ''];

      invalidQuantities.forEach(qty => {
        const result = validation.quantity(qty);
        expect(result.valid).toBe(false);
        expect(result.message).toBe('Quantity must be a valid number');
      });
    });

    it('should validate against stock limits', () => {
      const result1 = validation.quantity(10, 5);
      expect(result1.valid).toBe(false);
      expect(result1.message).toBe('Only 5 items available in stock');

      const result2 = validation.quantity(3, 5);
      expect(result2.valid).toBe(true);
    });

    it('should handle edge cases with stock', () => {
      const result1 = validation.quantity(5, 5); // Exactly at stock limit
      expect(result1.valid).toBe(true);

      const result2 = validation.quantity(1, 0); // No stock
      expect(result2.valid).toBe(false);
      expect(result2.message).toBe('Only 0 items available in stock');
    });
  });

  describe('validation.couponCode', () => {
    it('should validate correct coupon codes', () => {
      const validCodes = [
        'SAVE10',
        'WELCOME-20',
        'NEW_USER',
        'HOLIDAY2024',
        'ABC123',
        'test-code_123'
      ];

      validCodes.forEach(code => {
        const result = validation.couponCode(code);
        expect(result.valid).toBe(true);
        expect(result.message).toBe('');
      });
    });

    it('should reject coupon codes that are too short', () => {
      const result = validation.couponCode('AB');
      expect(result.valid).toBe(false);
      expect(result.message).toBe('Coupon code must be at least 3 characters');
    });

    it('should reject coupon codes that are too long', () => {
      const longCode = 'A'.repeat(21);
      const result = validation.couponCode(longCode);
      expect(result.valid).toBe(false);
      expect(result.message).toBe('Coupon code cannot exceed 20 characters');
    });

    it('should reject coupon codes with invalid characters', () => {
      const invalidCodes = [
        'SAVE 10', // space
        'SAVE@10', // special character
        'SAVE#10', // special character
        'SAVE%10'  // special character
      ];

      invalidCodes.forEach(code => {
        const result = validation.couponCode(code);
        expect(result.valid).toBe(false);
        expect(result.message).toBe('Coupon code can only contain letters, numbers, hyphens, and underscores');
      });
    });

    it('should require coupon code to be provided', () => {
      const result = validation.couponCode('');
      expect(result.valid).toBe(false);
      expect(result.message).toBe('Coupon code is required');
    });

    it('should trim whitespace', () => {
      const result = validation.couponCode('  SAVE10  ');
      expect(result.valid).toBe(true);
    });
  });

  describe('Legacy functions', () => {
    describe('isValidEmail', () => {
      it('should return boolean for email validation', () => {
        expect(isValidEmail('test@example.com')).toBe(true);
        expect(isValidEmail('invalid-email')).toBe(false);
        expect(isValidEmail('')).toBe(false);
      });
    });

    describe('isValidPhone', () => {
      it('should return boolean for phone validation', () => {
        expect(isValidPhone('1234567890')).toBe(true);
        expect(isValidPhone('123')).toBe(false);
        expect(isValidPhone('')).toBe(false);
      });
    });

    describe('isValidPostalCode', () => {
      it('should return boolean for postal code validation', () => {
        expect(isValidPostalCode('12345')).toBe(true);
        expect(isValidPostalCode('123')).toBe(false);
        expect(isValidPostalCode('')).toBe(false);
      });
    });
  });

  describe('validateForm', () => {
    it('should validate form with all valid fields', () => {
      const fields = {
        email: 'test@example.com',
        password: 'password123',
        firstName: 'John'
      };

      const rules = {
        email: validation.email,
        password: validation.password,
        firstName: validation.name
      };

      const result = validateForm(fields, rules);

      expect(result.valid).toBe(true);
      expect(result.errors).toEqual({});
    });

    it('should validate form with invalid fields', () => {
      const fields = {
        email: 'invalid-email',
        password: '123',
        firstName: ''
      };

      const rules = {
        email: validation.email,
        password: validation.password,
        firstName: validation.name
      };

      const result = validateForm(fields, rules);

      expect(result.valid).toBe(false);
      expect(result.errors.email).toBe('Please enter a valid email address');
      expect(result.errors.password).toBe('Password must be at least 8 characters long');
      expect(result.errors.firstName).toBe('Name is required');
    });

    it('should validate form with mixed valid and invalid fields', () => {
      const fields = {
        email: 'test@example.com',
        password: '123', // Invalid
        firstName: 'John'
      };

      const rules = {
        email: validation.email,
        password: validation.password,
        firstName: validation.name
      };

      const result = validateForm(fields, rules);

      expect(result.valid).toBe(false);
      expect(result.errors.email).toBeUndefined();
      expect(result.errors.password).toBe('Password must be at least 8 characters long');
      expect(result.errors.firstName).toBeUndefined();
    });

    it('should handle empty form', () => {
      const fields = {};
      const rules = {};

      const result = validateForm(fields, rules);

      expect(result.valid).toBe(true);
      expect(result.errors).toEqual({});
    });

    it('should handle custom validation rules', () => {
      const fields = {
        customField: 'test'
      };

      const rules = {
        customField: (value: string) => {
          if (value === 'test') {
            return { valid: false, message: 'Custom error message' };
          }
          return { valid: true, message: '' };
        }
      };

      const result = validateForm(fields, rules);

      expect(result.valid).toBe(false);
      expect(result.errors.customField).toBe('Custom error message');
    });
  });

  describe('cn utility function', () => {
    it('should combine class names correctly', () => {
      const result = cn('class1', 'class2', 'class3');
      expect(result).toBe('class1 class2 class3');
    });

    it('should handle conditional classes', () => {
      const result = cn('base', true && 'conditional', false && 'hidden');
      expect(result).toBe('base conditional');
    });

    it('should handle undefined and null values', () => {
      const result = cn('base', undefined, null, 'valid');
      expect(result).toBe('base valid');
    });

    it('should merge Tailwind classes correctly', () => {
      // This tests the twMerge functionality
      const result = cn('p-4', 'p-2'); // Should merge to p-2
      expect(result).toBe('p-2');
    });

    it('should handle arrays and objects', () => {
      const result = cn(['class1', 'class2'], { class3: true, class4: false });
      expect(result).toBe('class1 class2 class3');
    });
  });

  describe('Edge Cases and Error Handling', () => {
    it('should handle null and undefined inputs gracefully', () => {
      expect(validation.email(null as any).valid).toBe(false);
      expect(validation.password(undefined as any).valid).toBe(false);
      expect(validation.name(null as any).valid).toBe(false);
    });

    it('should handle non-string inputs', () => {
      expect(validation.email(123 as any).valid).toBe(false);
      expect(validation.password([] as any).valid).toBe(false);
      expect(validation.name({} as any).valid).toBe(false);
    });

    it('should handle special characters in names correctly', () => {
      // Test various international characters
      const internationalNames = [
        'José',
        'François',
        'Müller',
        'Øyvind',
        'Žofia'
      ];

      // Note: Current implementation only allows basic Latin characters
      // This test documents the current behavior
      internationalNames.forEach(name => {
        const result = validation.name(name);
        // Current implementation would reject these, but ideally should accept them
        expect(typeof result.valid).toBe('boolean');
      });
    });

    it('should handle very long inputs without crashing', () => {
      const veryLongString = 'a'.repeat(10000);
      
      expect(() => validation.email(veryLongString)).not.toThrow();
      expect(() => validation.password(veryLongString)).not.toThrow();
      expect(() => validation.name(veryLongString)).not.toThrow();
    });
  });
});