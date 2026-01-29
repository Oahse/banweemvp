/**
 * Tests for Pricing Service - Comprehensive test suite aligned with backend reality
 */
import { describe, it, expect, beforeEach } from 'vitest';
import PricingService, { PriceBreakdown, PriceValidationResult } from '../../utils/pricing';

describe('PricingService', () => {
  describe('validatePrices', () => {
    const backendPricing: PriceBreakdown = {
      subtotal: 100.00,
      shipping: {
        method_id: 'standard',
        method_name: 'Standard Shipping',
        cost: 9.99
      },
      tax: {
        rate: 0.08,
        amount: 8.00,
        location: 'NY, US'
      },
      total: 117.99,
      currency: 'USD',
      calculated_at: '2024-01-15T10:00:00Z'
    };

    it('should validate matching prices within tolerance', () => {
      const frontendPricing = {
        subtotal: 100.00,
        shipping: { cost: 9.99 },
        tax: { amount: 8.00 },
        total: 117.99
      };

      const result = PricingService.validatePrices(frontendPricing, backendPricing);

      expect(result.isValid).toBe(true);
      expect(result.discrepancies).toHaveLength(0);
      expect(result.warnings).toHaveLength(0);
    });

    it('should validate prices with small rounding differences within tolerance', () => {
      const frontendPricing = {
        subtotal: 100.01, // 1 cent difference
        shipping: { cost: 9.98 }, // 1 cent difference
        tax: { amount: 8.01 }, // 1 cent difference
        total: 117.98 // 1 cent difference
      };

      const result = PricingService.validatePrices(frontendPricing, backendPricing);

      expect(result.isValid).toBe(true);
      expect(result.discrepancies).toHaveLength(0);
    });

    it('should detect significant price discrepancies', () => {
      const frontendPricing = {
        subtotal: 95.00, // $5 difference
        shipping: { cost: 12.99 }, // $3 difference
        tax: { amount: 10.00 }, // $2 difference
        total: 120.00 // $2.01 difference
      };

      const result = PricingService.validatePrices(frontendPricing, backendPricing);

      expect(result.isValid).toBe(false);
      expect(result.discrepancies).toHaveLength(4);
      
      // Check subtotal discrepancy
      const subtotalDisc = result.discrepancies.find(d => d.field === 'subtotal');
      expect(subtotalDisc).toBeDefined();
      expect(subtotalDisc?.frontend).toBe(95.00);
      expect(subtotalDisc?.backend).toBe(100.00);
      expect(subtotalDisc?.difference).toBe(5.00);
      expect(subtotalDisc?.percentage).toBe(5.00);

      // Check warnings for significant discrepancies
      expect(result.warnings.length).toBeGreaterThan(0);
      expect(result.warnings[0]).toContain('subtotal price mismatch');
    });

    it('should handle missing frontend values', () => {
      const frontendPricing = {
        subtotal: 100.00
        // Missing shipping, tax, and total
      };

      const result = PricingService.validatePrices(frontendPricing, backendPricing);

      expect(result.isValid).toBe(true); // Only validates provided values
      expect(result.discrepancies).toHaveLength(0);
    });

    it('should handle zero values correctly', () => {
      const backendWithZeros: PriceBreakdown = {
        ...backendPricing,
        shipping: { method_id: 'free', method_name: 'Free Shipping', cost: 0 },
        tax: { rate: 0, amount: 0, location: 'No Tax' }
      };

      const frontendPricing = {
        subtotal: 100.00,
        shipping: { cost: 0 },
        tax: { amount: 0 },
        total: 100.00
      };

      const result = PricingService.validatePrices(frontendPricing, backendWithZeros);

      expect(result.isValid).toBe(true);
      expect(result.discrepancies).toHaveLength(0);
    });

    it('should calculate percentage differences correctly', () => {
      const frontendPricing = {
        subtotal: 110.00, // 10% higher
        shipping: { cost: 5.00 }, // 50% lower
        total: 125.00
      };

      const result = PricingService.validatePrices(frontendPricing, backendPricing);

      const subtotalDisc = result.discrepancies.find(d => d.field === 'subtotal');
      const shippingDisc = result.discrepancies.find(d => d.field === 'shipping');

      expect(subtotalDisc?.percentage).toBe(10.00);
      expect(shippingDisc?.percentage).toBeCloseTo(49.95, 1); // ~50% difference
    });
  });

  describe('formatCurrency', () => {
    it('should format USD currency correctly', () => {
      expect(PricingService.formatCurrency(99.99)).toBe('$99.99');
      expect(PricingService.formatCurrency(0)).toBe('$0.00');
      expect(PricingService.formatCurrency(1234.56)).toBe('$1,234.56');
    });

    it('should format different currencies', () => {
      expect(PricingService.formatCurrency(99.99, 'EUR')).toBe('€99.99');
      expect(PricingService.formatCurrency(99.99, 'GBP')).toBe('£99.99');
      expect(PricingService.formatCurrency(99.99, 'CAD')).toBe('CA$99.99');
    });

    it('should handle negative amounts', () => {
      expect(PricingService.formatCurrency(-10.50)).toBe('-$10.50');
    });

    it('should handle large amounts', () => {
      expect(PricingService.formatCurrency(1234567.89)).toBe('$1,234,567.89');
    });
  });

  describe('calculateDiscountPercentage', () => {
    it('should calculate discount percentage correctly', () => {
      expect(PricingService.calculateDiscountPercentage(100, 90)).toBe(10);
      expect(PricingService.calculateDiscountPercentage(50, 25)).toBe(50);
      expect(PricingService.calculateDiscountPercentage(199.99, 149.99)).toBe(25);
    });

    it('should handle zero original price', () => {
      expect(PricingService.calculateDiscountPercentage(0, 10)).toBe(0);
    });

    it('should handle same prices (no discount)', () => {
      expect(PricingService.calculateDiscountPercentage(100, 100)).toBe(0);
    });

    it('should handle price increases (negative discount)', () => {
      expect(PricingService.calculateDiscountPercentage(100, 110)).toBe(-10);
    });

    it('should round to nearest integer', () => {
      expect(PricingService.calculateDiscountPercentage(99.99, 66.66)).toBe(33);
    });
  });

  describe('validateCartItemPricing', () => {
    const validItem = {
      id: 'item123',
      variant_id: 'var123',
      quantity: 2,
      unit_price: 49.99,
      total_price: 99.98,
      variant: {
        id: 'var123',
        name: 'Red - Large',
        base_price: 49.99,
        sale_price: null,
        on_sale: false,
        product: {
          id: 'prod123',
          name: 'T-Shirt'
        }
      }
    };

    it('should validate correct item pricing', () => {
      const result = PricingService.validateCartItemPricing(validItem);

      expect(result.isValid).toBe(true);
      expect(result.issues).toHaveLength(0);
    });

    it('should detect invalid unit price', () => {
      const invalidItem = {
        ...validItem,
        unit_price: 0
      };

      const result = PricingService.validateCartItemPricing(invalidItem);

      expect(result.isValid).toBe(false);
      expect(result.issues).toContain('Invalid unit price for T-Shirt: 0');
    });

    it('should detect invalid quantity', () => {
      const invalidItem = {
        ...validItem,
        quantity: 0
      };

      const result = PricingService.validateCartItemPricing(invalidItem);

      expect(result.isValid).toBe(false);
      expect(result.issues).toContain('Invalid quantity for T-Shirt: 0');
    });

    it('should detect incorrect total price calculation', () => {
      const invalidItem = {
        ...validItem,
        total_price: 100.00 // Should be 99.98
      };

      const result = PricingService.validateCartItemPricing(invalidItem);

      expect(result.isValid).toBe(false);
      expect(result.issues[0]).toContain('Price calculation error');
      expect(result.issues[0]).toContain('Expected $99.98, got $100.00');
    });

    it('should validate sale price consistency', () => {
      const saleItem = {
        ...validItem,
        unit_price: 39.99,
        total_price: 79.98,
        variant: {
          ...validItem.variant,
          base_price: 49.99,
          sale_price: 39.99,
          on_sale: true
        }
      };

      const result = PricingService.validateCartItemPricing(saleItem);

      expect(result.isValid).toBe(true);
      expect(result.issues).toHaveLength(0);
    });

    it('should detect sale price mismatch', () => {
      const invalidSaleItem = {
        ...validItem,
        unit_price: 45.99, // Should be 39.99 (sale price)
        variant: {
          ...validItem.variant,
          base_price: 49.99,
          sale_price: 39.99,
          on_sale: true
        }
      };

      const result = PricingService.validateCartItemPricing(invalidSaleItem);

      expect(result.isValid).toBe(false);
      expect(result.issues[0]).toContain('Sale price mismatch');
      expect(result.issues[0]).toContain('Expected $39.99, got $45.99');
    });

    it('should validate base price when not on sale', () => {
      const result = PricingService.validateCartItemPricing(validItem);

      expect(result.isValid).toBe(true);
    });

    it('should detect base price mismatch', () => {
      const invalidBaseItem = {
        ...validItem,
        unit_price: 54.99, // Should be 49.99 (base price)
        variant: {
          ...validItem.variant,
          base_price: 49.99,
          on_sale: false
        }
      };

      const result = PricingService.validateCartItemPricing(invalidBaseItem);

      expect(result.isValid).toBe(false);
      expect(result.issues[0]).toContain('Base price mismatch');
    });

    it('should handle items without variant name', () => {
      const itemWithoutName = {
        ...validItem,
        unit_price: 0,
        variant: {
          ...validItem.variant,
          name: undefined
        }
      };

      const result = PricingService.validateCartItemPricing(itemWithoutName);

      expect(result.isValid).toBe(false);
      expect(result.issues[0]).toContain('Invalid unit price for item: 0');
    });
  });

  describe('calculateEstimatedTotal', () => {
    const cartItems = [
      {
        id: 'item1',
        unit_price: 29.99,
        quantity: 2
      },
      {
        id: 'item2',
        unit_price: 49.99,
        quantity: 1
      }
    ];

    it('should calculate estimated total correctly', () => {
      const total = PricingService.calculateEstimatedTotal(
        cartItems,
        9.99, // shipping
        0.08, // tax rate
        0 // discount
      );

      const expectedSubtotal = (29.99 * 2) + (49.99 * 1); // 109.97
      const expectedTax = expectedSubtotal * 0.08; // 8.7976
      const expectedTotal = expectedSubtotal + 9.99 + expectedTax; // 128.7576

      expect(total).toBeCloseTo(128.76, 2);
    });

    it('should handle discount correctly', () => {
      const total = PricingService.calculateEstimatedTotal(
        cartItems,
        9.99, // shipping
        0.08, // tax rate
        15.00 // discount
      );

      const expectedSubtotal = 109.97;
      const expectedTax = expectedSubtotal * 0.08;
      const expectedTotal = expectedSubtotal + 9.99 + expectedTax - 15.00;

      expect(total).toBeCloseTo(113.76, 2);
    });

    it('should not return negative total', () => {
      const total = PricingService.calculateEstimatedTotal(
        cartItems,
        0, // no shipping
        0, // no tax
        200.00 // large discount
      );

      expect(total).toBe(0);
    });

    it('should handle empty cart', () => {
      const total = PricingService.calculateEstimatedTotal(
        [],
        9.99,
        0.08,
        0
      );

      expect(total).toBeCloseTo(9.99, 2); // Only shipping
    });

    it('should handle zero values', () => {
      const total = PricingService.calculateEstimatedTotal(
        cartItems,
        0, // no shipping
        0, // no tax
        0 // no discount
      );

      expect(total).toBe(109.97); // Just subtotal
    });
  });

  describe('formatPriceBreakdown', () => {
    const priceBreakdown: PriceBreakdown = {
      subtotal: 100.00,
      shipping: {
        method_id: 'standard',
        method_name: 'Standard Shipping',
        cost: 9.99
      },
      tax: {
        rate: 0.08,
        amount: 8.00,
        location: 'NY, US'
      },
      discount: {
        code: 'SAVE10',
        type: 'percentage',
        value: 10,
        amount: 10.00
      },
      total: 107.99,
      currency: 'USD',
      calculated_at: '2024-01-15T10:00:00Z'
    };

    it('should format price breakdown correctly', () => {
      const formatted = PricingService.formatPriceBreakdown(priceBreakdown);

      expect(formatted.subtotal).toBe('$100.00');
      expect(formatted.shipping).toBe('$9.99');
      expect(formatted.tax).toBe('$8.00');
      expect(formatted.discount).toBe('$10.00');
      expect(formatted.total).toBe('$107.99');
    });

    it('should handle breakdown without discount', () => {
      const breakdownWithoutDiscount = {
        ...priceBreakdown,
        discount: undefined
      };

      const formatted = PricingService.formatPriceBreakdown(breakdownWithoutDiscount);

      expect(formatted.discount).toBeUndefined();
      expect(formatted.subtotal).toBe('$100.00');
      expect(formatted.total).toBe('$107.99');
    });

    it('should format different currencies', () => {
      const eurBreakdown = {
        ...priceBreakdown,
        currency: 'EUR'
      };

      const formatted = PricingService.formatPriceBreakdown(eurBreakdown);

      expect(formatted.subtotal).toBe('€100.00');
      expect(formatted.total).toBe('€107.99');
    });
  });

  describe('isPricingStale', () => {
    it('should detect fresh pricing (within 5 minutes)', () => {
      const now = new Date();
      const twoMinutesAgo = new Date(now.getTime() - 2 * 60 * 1000);
      
      const isStale = PricingService.isPricingStale(twoMinutesAgo.toISOString());

      expect(isStale).toBe(false);
    });

    it('should detect stale pricing (older than 5 minutes)', () => {
      const now = new Date();
      const tenMinutesAgo = new Date(now.getTime() - 10 * 60 * 1000);
      
      const isStale = PricingService.isPricingStale(tenMinutesAgo.toISOString());

      expect(isStale).toBe(true);
    });

    it('should handle exactly 5 minutes old', () => {
      const now = new Date();
      const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000);
      
      const isStale = PricingService.isPricingStale(fiveMinutesAgo.toISOString());

      expect(isStale).toBe(false); // Exactly 5 minutes should not be stale
    });

    it('should handle future timestamps', () => {
      const now = new Date();
      const future = new Date(now.getTime() + 10 * 60 * 1000);
      
      const isStale = PricingService.isPricingStale(future.toISOString());

      expect(isStale).toBe(false); // Future timestamps are not stale
    });
  });

  describe('generatePricingSummary', () => {
    it('should generate complete pricing summary', () => {
      const pricing: PriceBreakdown = {
        subtotal: 100.00,
        shipping: {
          method_id: 'standard',
          method_name: 'Standard Shipping',
          cost: 9.99
        },
        tax: {
          rate: 0.08,
          amount: 8.00,
          location: 'NY, US'
        },
        discount: {
          code: 'SAVE10',
          type: 'percentage',
          value: 10,
          amount: 10.00
        },
        total: 107.99,
        currency: 'USD',
        calculated_at: '2024-01-15T10:00:00Z'
      };

      const summary = PricingService.generatePricingSummary(pricing);

      expect(summary).toBe('Subtotal: $100.00, Shipping: $9.99, Tax: $8.00, Discount: -$10.00, Total: $107.99');
    });

    it('should handle free shipping', () => {
      const pricing: PriceBreakdown = {
        subtotal: 150.00,
        shipping: {
          method_id: 'free',
          method_name: 'Free Shipping',
          cost: 0
        },
        tax: {
          rate: 0.08,
          amount: 12.00,
          location: 'NY, US'
        },
        total: 162.00,
        currency: 'USD',
        calculated_at: '2024-01-15T10:00:00Z'
      };

      const summary = PricingService.generatePricingSummary(pricing);

      expect(summary).toBe('Subtotal: $150.00, Tax: $12.00, Total: $162.00');
      expect(summary).not.toContain('Shipping');
    });

    it('should handle no tax', () => {
      const pricing: PriceBreakdown = {
        subtotal: 100.00,
        shipping: {
          method_id: 'standard',
          method_name: 'Standard Shipping',
          cost: 9.99
        },
        tax: {
          rate: 0,
          amount: 0,
          location: 'No Tax'
        },
        total: 109.99,
        currency: 'USD',
        calculated_at: '2024-01-15T10:00:00Z'
      };

      const summary = PricingService.generatePricingSummary(pricing);

      expect(summary).toBe('Subtotal: $100.00, Shipping: $9.99, Total: $109.99');
      expect(summary).not.toContain('Tax');
    });

    it('should handle no discount', () => {
      const pricing: PriceBreakdown = {
        subtotal: 100.00,
        shipping: {
          method_id: 'standard',
          method_name: 'Standard Shipping',
          cost: 9.99
        },
        tax: {
          rate: 0.08,
          amount: 8.00,
          location: 'NY, US'
        },
        total: 117.99,
        currency: 'USD',
        calculated_at: '2024-01-15T10:00:00Z'
      };

      const summary = PricingService.generatePricingSummary(pricing);

      expect(summary).toBe('Subtotal: $100.00, Shipping: $9.99, Tax: $8.00, Total: $117.99');
      expect(summary).not.toContain('Discount');
    });

    it('should handle minimal pricing (subtotal and total only)', () => {
      const pricing: PriceBreakdown = {
        subtotal: 50.00,
        shipping: {
          method_id: 'free',
          method_name: 'Free Shipping',
          cost: 0
        },
        tax: {
          rate: 0,
          amount: 0,
          location: 'No Tax'
        },
        total: 50.00,
        currency: 'USD',
        calculated_at: '2024-01-15T10:00:00Z'
      };

      const summary = PricingService.generatePricingSummary(pricing);

      expect(summary).toBe('Subtotal: $50.00, Total: $50.00');
    });
  });
});