/**
 * Property-Based Testing Configuration Test
 * Validates that fast-check is properly configured and working
 * Feature: frontend-test-coverage, Property 24: Data Transformation Integrity
 * Validates: Requirements 7.1
 */

import { describe, it, expect } from 'vitest';
import { 
  fc, 
  runPropertyTest, 
  userArbitrary, 
  productArbitrary,
  createRoundTripTest,
  createIdempotencyTest,
  invalidStringArbitrary,
} from './property-utils';

describe('Property-Based Testing Configuration', () => {
  it('should generate valid user data', () => {
    runPropertyTest(
      'user data generation',
      userArbitrary,
      (user) => {
        expect(user).toHaveProperty('id');
        expect(user).toHaveProperty('email');
        expect(user).toHaveProperty('firstname');
        expect(user).toHaveProperty('lastname');
        expect(user).toHaveProperty('role');
        expect(['Admin', 'Customer', 'Supplier']).toContain(user.role);
        expect(typeof user.verified).toBe('boolean');
      },
      { iterations: 10 } // Reduced for quick validation
    );
  });

  it('should generate valid product data', () => {
    runPropertyTest(
      'product data generation',
      productArbitrary,
      (product) => {
        expect(product).toHaveProperty('id');
        expect(product).toHaveProperty('name');
        expect(product).toHaveProperty('price');
        expect(product.price).toBeGreaterThan(0);
        expect(product.stock_quantity).toBeGreaterThanOrEqual(0);
        expect(typeof product.is_active).toBe('boolean');
        expect(Array.isArray(product.images)).toBe(true);
        expect(Array.isArray(product.variants)).toBe(true);
      },
      { iterations: 10 }
    );
  });

  it('should handle round-trip JSON serialization', () => {
    createRoundTripTest(
      'JSON serialization',
      userArbitrary,
      (user) => JSON.stringify(user),
      (json) => JSON.parse(json),
      (a, b) => JSON.stringify(a) === JSON.stringify(b)
    );
  });

  it('should demonstrate idempotency with array sorting', () => {
    createIdempotencyTest(
      'array sorting',
      fc.array(fc.integer()),
      (arr) => [...arr].sort((a, b) => a - b),
      (a, b) => JSON.stringify(a) === JSON.stringify(b)
    );
  });

  it('should generate invalid strings for error testing', () => {
    runPropertyTest(
      'invalid string generation',
      invalidStringArbitrary,
      (invalidString) => {
        // All generated values should be invalid in some way
        const isInvalid = 
          invalidString === '' ||
          invalidString === null ||
          invalidString === undefined ||
          (typeof invalidString === 'string' && invalidString.trim() === '') ||
          (typeof invalidString === 'string' && invalidString.length > 500);
        
        expect(isInvalid).toBe(true);
      },
      { iterations: 10 }
    );
  });

  it('should run fast-check with custom configuration', () => {
    const results: number[] = [];
    
    fc.assert(
      fc.property(fc.integer(1, 100), (n) => {
        results.push(n);
        return n > 0 && n <= 100;
      }),
      { numRuns: 5 }
    );
    
    expect(results).toHaveLength(5);
    expect(results.every(n => n >= 1 && n <= 100)).toBe(true);
  });
});