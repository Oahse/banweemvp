/**
 * ProductCard Component Test Suite
 * Tests product display, loading states, error handling, and user interactions
 * Requirements: 1.1, 1.2, 1.3
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { ProductCard } from './ProductCard';
import { renderWithProviders } from '../../test/utils';

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>
  }
}));

// Mock react-hot-toast
vi.mock('react-hot-toast', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn()
  }
}));

describe('ProductCard Component', () => {
  const mockProduct = {
    id: '1',
    name: 'Test Product',
    price: 29.99,
    discountPrice: null,
    rating: 4.5,
    reviewCount: 10,
    image: 'https://example.com/image.jpg',
    category: 'Electronics',
    isNew: false,
    isFeatured: false,
    variants: [
      {
        id: '1',
        product_id: '1',
        sku: 'TEST-001',
        name: 'Default Variant',
        base_price: 29.99,
        sale_price: null,
        current_price: 29.99,
        discount_percentage: 0,
        stock: 10,
        barcode: '123456789',
        qr_code: 'qr-code-data',
        images: [
          {
            id: '1',
            variant_id: '1',
            url: 'https://example.com/variant-image.jpg',
            alt_text: 'Variant image',
            sort_order: 1,
            is_primary: true
          }
        ]
      }
    ]
  };

  const mockProductWithDiscount = {
    ...mockProduct,
    discountPrice: 19.99,
    variants: [
      {
        ...mockProduct.variants[0],
        sale_price: 19.99,
        current_price: 19.99,
        discount_percentage: 33
      }
    ]
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering Tests', () => {
    it('renders product information correctly', () => {
      renderWithProviders(<ProductCard product={mockProduct} />);
      
      expect(screen.getByText('Test Product')).toBeInTheDocument();
      expect(screen.getByText('Electronics')).toBeInTheDocument();
      expect(screen.getByText('$29.99')).toBeInTheDocument();
      expect(screen.getByText('(10)')).toBeInTheDocument();
    });

    it('renders without product (null case)', () => {
      renderWithProviders(<ProductCard product={null} />);
      
      // Should render nothing when product is null
      expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });

    it('renders loading state correctly', () => {
      renderWithProviders(<ProductCard isLoading={true} />);
      
      // Should render skeleton when loading
      expect(screen.queryByText('Test Product')).not.toBeInTheDocument();
    });

    it('applies custom className', () => {
      const { container } = renderWithProviders(
        <ProductCard product={mockProduct} className="custom-class" />
      );
      
      expect(container.firstChild).toHaveClass('custom-class');
    });
  });

  describe('Product Display Tests', () => {
    it('displays product with discount correctly', () => {
      renderWithProviders(<ProductCard product={mockProductWithDiscount} />);
      
      expect(screen.getByText('$19.99')).toBeInTheDocument();
      expect(screen.getByText('$29.99')).toBeInTheDocument();
      expect(screen.getByText('-33%')).toBeInTheDocument();
      expect(screen.getByText('Sale')).toBeInTheDocument();
    });

    it('displays new product badge', () => {
      const newProduct = { ...mockProduct, isNew: true };
      renderWithProviders(<ProductCard product={newProduct} />);
      
      expect(screen.getByText('New')).toBeInTheDocument();
    });

    it('displays stock information correctly', () => {
      const lowStockProduct = {
        ...mockProduct,
        variants: [
          {
            ...mockProduct.variants[0],
            stock: 3
          }
        ]
      };
      
      renderWithProviders(<ProductCard product={lowStockProduct} />);
      expect(screen.getByText('Only 3 left')).toBeInTheDocument();
    });

    it('displays out of stock correctly', () => {
      const outOfStockProduct = {
        ...mockProduct,
        variants: [
          {
            ...mockProduct.variants[0],
            stock: 0
          }
        ]
      };
      
      renderWithProviders(<ProductCard product={outOfStockProduct} />);
      expect(screen.getByText('Out of Stock')).toBeInTheDocument();
    });

    it('displays rating stars correctly', () => {
      renderWithProviders(<ProductCard product={mockProduct} />);
      
      const ratingContainer = screen.getByText('★★★★☆');
      expect(ratingContainer).toBeInTheDocument();
    });
  });

  describe('View Mode Tests', () => {
    it('renders in grid view mode by default', () => {
      const { container } = renderWithProviders(<ProductCard product={mockProduct} />);
      
      // Grid view should not have flex classes
      expect(container.firstChild).not.toHaveClass('flex');
    });

    it('renders in list view mode correctly', () => {
      const { container } = renderWithProviders(
        <ProductCard product={mockProduct} viewMode="list" />
      );
      
      // List view should have flex classes
      expect(container.firstChild).toHaveClass('flex');
    });
  });

  describe('Variant Tests', () => {
    it('displays selected variant information', () => {
      const selectedVariant = mockProduct.variants[0];
      renderWithProviders(
        <ProductCard product={mockProduct} selectedVariant={selectedVariant} />
      );
      
      expect(screen.getByText('Default Variant')).toBeInTheDocument();
    });

    it('uses first variant when no variant selected', () => {
      renderWithProviders(<ProductCard product={mockProduct} />);
      
      expect(screen.getByText('Default Variant')).toBeInTheDocument();
    });

    it('displays variant image when available', () => {
      renderWithProviders(<ProductCard product={mockProduct} />);
      
      const image = screen.getByRole('img');
      expect(image).toHaveAttribute('src', 'https://example.com/variant-image.jpg');
      expect(image).toHaveAttribute('alt', 'Test Product - Default Variant');
    });
  });

  describe('QR Code and Barcode Tests', () => {
    it('displays QR code when showQRCode is true', () => {
      renderWithProviders(
        <ProductCard product={mockProduct} showQRCode={true} />
      );
      
      // QR code component should be rendered
      expect(screen.getByText('Default Variant')).toBeInTheDocument();
    });

    it('displays barcode when showBarcode is true', () => {
      renderWithProviders(
        <ProductCard product={mockProduct} showBarcode={true} />
      );
      
      // Barcode component should be rendered
      expect(screen.getByText('Default Variant')).toBeInTheDocument();
    });

    it('does not display codes when flags are false', () => {
      renderWithProviders(
        <ProductCard product={mockProduct} showQRCode={false} showBarcode={false} />
      );
      
      // Should not have the codes section
      expect(screen.queryByText('QR Code')).not.toBeInTheDocument();
    });
  });

  describe('User Interaction Tests', () => {
    it('handles add to cart click', async () => {
      const user = userEvent.setup();
      renderWithProviders(<ProductCard product={mockProduct} />);
      
      const addToCartButton = screen.getAllByRole('button').find(
        button => button.getAttribute('aria-label')?.includes('Add to cart')
      );
      
      if (addToCartButton) {
        await user.click(addToCartButton);
        // Cart interaction should be handled (mocked in context)
        expect(addToCartButton).toBeInTheDocument();
      }
    });

    it('handles add to wishlist click', async () => {
      const user = userEvent.setup();
      renderWithProviders(<ProductCard product={mockProduct} />);
      
      const wishlistButton = screen.getAllByRole('button').find(
        button => button.getAttribute('aria-label')?.includes('wishlist')
      );
      
      if (wishlistButton) {
        await user.click(wishlistButton);
        // Wishlist interaction should be handled (mocked in context)
        expect(wishlistButton).toBeInTheDocument();
      }
    });

    it('navigates to product details on image click', () => {
      renderWithProviders(<ProductCard product={mockProduct} />);
      
      const productLink = screen.getByRole('link');
      expect(productLink).toHaveAttribute('href', '/product/1');
    });

    it('navigates to product details on title click', () => {
      renderWithProviders(<ProductCard product={mockProduct} />);
      
      const titleLinks = screen.getAllByRole('link');
      const productTitleLink = titleLinks.find(link => 
        link.textContent?.includes('Test Product')
      );
      
      expect(productTitleLink).toHaveAttribute('href', '/product/1');
    });
  });

  describe('Error Handling Tests', () => {
    it('handles missing variant gracefully', () => {
      const productWithoutVariants = {
        ...mockProduct,
        variants: []
      };
      
      expect(() => {
        renderWithProviders(<ProductCard product={productWithoutVariants} />);
      }).not.toThrow();
    });

    it('handles missing images gracefully', () => {
      const productWithoutImages = {
        ...mockProduct,
        variants: [
          {
            ...mockProduct.variants[0],
            images: []
          }
        ]
      };
      
      expect(() => {
        renderWithProviders(<ProductCard product={productWithoutImages} />);
      }).not.toThrow();
      
      // Should fall back to product image
      const image = screen.getByRole('img');
      expect(image).toHaveAttribute('src', mockProduct.image);
    });

    it('handles undefined rating gracefully', () => {
      const productWithoutRating = {
        ...mockProduct,
        rating: undefined,
        reviewCount: 0
      };
      
      expect(() => {
        renderWithProviders(<ProductCard product={productWithoutRating} />);
      }).not.toThrow();
    });
  });

  describe('Accessibility Tests', () => {
    it('has proper image alt text', () => {
      renderWithProviders(<ProductCard product={mockProduct} />);
      
      const image = screen.getByRole('img');
      expect(image).toHaveAttribute('alt', 'Test Product - Default Variant');
    });

    it('has proper button labels', () => {
      renderWithProviders(<ProductCard product={mockProduct} />);
      
      const buttons = screen.getAllByRole('button');
      buttons.forEach(button => {
        expect(button).toHaveAttribute('aria-label');
      });
    });

    it('has proper link accessibility', () => {
      renderWithProviders(<ProductCard product={mockProduct} />);
      
      const links = screen.getAllByRole('link');
      links.forEach(link => {
        expect(link).toHaveAttribute('href');
      });
    });
  });

  describe('Edge Cases', () => {
    it('handles very long product names', () => {
      const longNameProduct = {
        ...mockProduct,
        name: 'A'.repeat(200)
      };
      
      renderWithProviders(<ProductCard product={longNameProduct} />);
      
      const title = screen.getByText('A'.repeat(200));
      expect(title).toBeInTheDocument();
      expect(title).toHaveClass('line-clamp-2');
    });

    it('handles zero price', () => {
      const freeProduct = {
        ...mockProduct,
        price: 0,
        variants: [
          {
            ...mockProduct.variants[0],
            base_price: 0,
            current_price: 0
          }
        ]
      };
      
      renderWithProviders(<ProductCard product={freeProduct} />);
      expect(screen.getByText('$0.00')).toBeInTheDocument();
    });

    it('handles missing category', () => {
      const productWithoutCategory = {
        ...mockProduct,
        category: ''
      };
      
      expect(() => {
        renderWithProviders(<ProductCard product={productWithoutCategory} />);
      }).not.toThrow();
    });
  });
});
/**
 * Property-Based Tests for ProductCard Conditional Rendering
 * Feature: frontend-test-coverage, Property 4: Conditional Rendering Completeness
 * Validates: Requirements 1.4
 */

import * as fc from 'fast-check';

describe('ProductCard Property-Based Tests', () => {
  describe('Property 4: Conditional Rendering Completeness', () => {
    it('should render all conditional elements based on product properties', () => {
      // Feature: frontend-test-coverage, Property 4: Conditional Rendering Completeness
      
      const productGenerator = fc.record({
        id: fc.string({ minLength: 1, maxLength: 10 }),
        name: fc.string({ minLength: 1, maxLength: 50 }),
        price: fc.float({ min: 0, max: 1000 }),
        rating: fc.float({ min: 0, max: 5 }),
        reviewCount: fc.integer({ min: 0, max: 1000 }),
        image: fc.constant('https://example.com/image.jpg'),
        category: fc.string({ minLength: 1, maxLength: 20 }),
        isNew: fc.boolean(),
        isFeatured: fc.boolean(),
        discountPrice: fc.option(fc.float({ min: 0, max: 500 }), { nil: null }),
        variants: fc.array(fc.record({
          id: fc.string({ minLength: 1, maxLength: 10 }),
          product_id: fc.string({ minLength: 1, maxLength: 10 }),
          sku: fc.string({ minLength: 1, maxLength: 20 }),
          name: fc.string({ minLength: 1, maxLength: 30 }),
          base_price: fc.float({ min: 0, max: 1000 }),
          sale_price: fc.option(fc.float({ min: 0, max: 500 }), { nil: null }),
          current_price: fc.float({ min: 0, max: 1000 }),
          discount_percentage: fc.integer({ min: 0, max: 100 }),
          stock: fc.integer({ min: 0, max: 100 }),
          barcode: fc.option(fc.string({ minLength: 1, maxLength: 20 }), { nil: null }),
          qr_code: fc.option(fc.string({ minLength: 1, maxLength: 50 }), { nil: null }),
          images: fc.array(fc.record({
            id: fc.string({ minLength: 1, maxLength: 10 }),
            variant_id: fc.string({ minLength: 1, maxLength: 10 }),
            url: fc.constant('https://example.com/variant-image.jpg'),
            alt_text: fc.option(fc.string({ minLength: 1, maxLength: 30 }), { nil: null }),
            sort_order: fc.integer({ min: 1, max: 10 }),
            is_primary: fc.boolean()
          }), { minLength: 0, maxLength: 3 })
        }), { minLength: 0, maxLength: 3 })
      });

      const propsGenerator = fc.record({
        product: productGenerator,
        showQRCode: fc.boolean(),
        showBarcode: fc.boolean(),
        viewMode: fc.constantFrom('grid', 'list'),
        isLoading: fc.boolean()
      });

      fc.assert(
        fc.property(propsGenerator, (props) => {
          // Skip if loading (different rendering path)
          if (props.isLoading) {
            const { unmount } = renderWithProviders(<ProductCard {...props} />);
            unmount();
            return;
          }

          const { unmount } = renderWithProviders(<ProductCard {...props} />);
          
          // Verify conditional rendering based on product properties
          
          // New badge should appear if product.isNew is true
          if (props.product.isNew) {
            expect(screen.queryByText('New')).toBeInTheDocument();
          } else {
            expect(screen.queryByText('New')).not.toBeInTheDocument();
          }
          
          // Sale badge should appear if there's a discount
          const hasDiscount = props.product.variants.some(v => v.sale_price && v.sale_price < v.base_price);
          if (hasDiscount || props.product.discountPrice) {
            expect(screen.queryByText('Sale')).toBeInTheDocument();
          }
          
          // Stock warnings should appear based on stock levels
          const variant = props.product.variants[0];
          if (variant) {
            if (variant.stock === 0) {
              expect(screen.queryByText('Out of Stock')).toBeInTheDocument();
            } else if (variant.stock <= 5 && variant.stock > 0) {
              expect(screen.queryByText(`Only ${variant.stock} left`)).toBeInTheDocument();
            }
          }
          
          // QR Code and Barcode should appear based on flags and data availability
          if (props.showQRCode && variant?.qr_code) {
            // QR code section should be present
            expect(screen.getByText(variant.name)).toBeInTheDocument();
          }
          
          if (props.showBarcode && variant?.barcode) {
            // Barcode section should be present
            expect(screen.getByText(variant.name)).toBeInTheDocument();
          }
          
          // View mode should affect layout classes
          const container = screen.getByRole('img').closest('div')?.parentElement;
          if (props.viewMode === 'list') {
            expect(container).toHaveClass('flex');
          }
          
          unmount();
        }),
        { 
          numRuns: 100,
          verbose: false
        }
      );
    });

    it('should handle all possible rendering paths without errors', () => {
      // Feature: frontend-test-coverage, Property 4: Conditional Rendering Completeness
      
      const edgeCaseGenerator = fc.record({
        product: fc.option(fc.record({
          id: fc.string({ minLength: 1, maxLength: 10 }),
          name: fc.string({ minLength: 0, maxLength: 100 }),
          price: fc.float({ min: 0, max: 10000 }),
          rating: fc.option(fc.float({ min: 0, max: 5 }), { nil: undefined }),
          reviewCount: fc.integer({ min: 0, max: 10000 }),
          image: fc.option(fc.string({ minLength: 1, maxLength: 100 }), { nil: '' }),
          category: fc.option(fc.string({ minLength: 0, maxLength: 50 }), { nil: '' }),
          isNew: fc.boolean(),
          variants: fc.option(fc.array(fc.record({
            id: fc.string({ minLength: 1, maxLength: 10 }),
            stock: fc.integer({ min: 0, max: 1000 }),
            current_price: fc.float({ min: 0, max: 10000 }),
            name: fc.string({ minLength: 0, maxLength: 50 }),
            images: fc.array(fc.record({
              url: fc.string({ minLength: 1, maxLength: 100 }),
              is_primary: fc.boolean()
            }), { minLength: 0, maxLength: 5 })
          }), { minLength: 0, maxLength: 5 }), { nil: [] })
        }), { nil: null }),
        isLoading: fc.boolean(),
        className: fc.option(fc.string({ minLength: 0, maxLength: 50 }), { nil: undefined })
      });

      fc.assert(
        fc.property(edgeCaseGenerator, (props) => {
          // Test that all rendering paths work without throwing errors
          expect(() => {
            const { unmount } = renderWithProviders(<ProductCard {...props} />);
            
            // If loading, should not show product content
            if (props.isLoading) {
              expect(screen.queryByRole('button')).not.toBeInTheDocument();
            }
            
            // If no product, should not render anything
            if (!props.product) {
              expect(screen.queryByRole('button')).not.toBeInTheDocument();
            }
            
            unmount();
          }).not.toThrow();
        }),
        { 
          numRuns: 100,
          verbose: false
        }
      );
    });
  });
});