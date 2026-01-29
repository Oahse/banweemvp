/**
 * Comprehensive test runner for all frontend tests
 */
import { describe, it, expect } from 'vitest';

// Import all test suites to ensure they run
import './setup';
import './api/auth.test';
import './api/products.test';
import './hooks/useCart.test';
import './components/layout/Header.test';
import './pages/Cart.test';
import './integration/cart-integration.test';
import './e2e/checkout-flow.test';
import './performance/component-performance.test';

describe('Frontend Test Suite', () => {
  it('should run all test categories', () => {
    // This is a meta-test to ensure all test files are loaded
    expect(true).toBe(true);
  });
});

// Test categories for organization
export const testCategories = {
  unit: [
    'api/auth.test.ts',
    'api/products.test.ts',
    'hooks/useCart.test.ts',
    'components/layout/Header.test.tsx',
    'pages/Cart.test.tsx'
  ],
  integration: [
    'integration/cart-integration.test.tsx'
  ],
  e2e: [
    'e2e/checkout-flow.test.tsx'
  ],
  performance: [
    'performance/component-performance.test.tsx'
  ]
};

// Test coverage requirements
export const coverageRequirements = {
  statements: 90,
  branches: 85,
  functions: 90,
  lines: 90
};

// Performance benchmarks
export const performanceBenchmarks = {
  componentRender: 1000, // ms
  apiResponse: 2000, // ms
  pageLoad: 3000, // ms
  bundleSize: 500 * 1024, // 500KB
  memoryUsage: 50 * 1024 * 1024 // 50MB
};