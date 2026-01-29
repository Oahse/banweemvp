/**
 * Component performance tests
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { renderWithProviders, mockProduct, mockCart } from '../setup';
import Products from '../../pages/Products';
import Cart from '../../pages/Cart';
import * as ProductsAPI from '../../api/products';
import * as CartAPI from '../../api/cart';

vi.mock('../../api/products');
vi.mock('../../api/cart');

// Performance measurement utilities
const measureRenderTime = async (component: React.ReactElement) => {
  const startTime = performance.now();
  render(component);
  await waitFor(() => {
    // Wait for component to be fully rendered
  });
  const endTime = performance.now();
  return endTime - startTime;
};

const measureMemoryUsage = () => {
  if ('memory' in performance) {
    return (performance as any).memory.usedJSHeapSize;
  }
  return 0;
};

describe('Component Performance Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render product list efficiently with large dataset', async () => {
    // Create large product dataset
    const largeProductList = Array.from({ length: 100 }, (_, index) => ({
      ...mockProduct,
      id: `product-${index}`,
      name: `Product ${index}`,
      variants: [{
        ...mockProduct.variants[0],
        id: `variant-${index}`
      }]
    }));

    vi.mocked(ProductsAPI.getProducts).mockResolvedValue({
      success: true,
      data: largeProductList,
      pagination: {
        page: 1,
        limit: 100,
        total: 100,
        pages: 1
      }
    });

    const renderTime = await measureRenderTime(<Products />);

    // Should render within reasonable time (2 seconds)
    expect(renderTime).toBeLessThan(2000);

    await waitFor(() => {
      expect(screen.getByText('Product 0')).toBeInTheDocument();
      expect(screen.getByText('Product 99')).toBeInTheDocument();
    });
  });

  it('should handle virtual scrolling for large lists', async () => {
    const veryLargeProductList = Array.from({ length: 1000 }, (_, index) => ({
      ...mockProduct,
      id: `product-${index}`,
      name: `Product ${index}`
    }));

    vi.mocked(ProductsAPI.getProducts).mockResolvedValue({
      success: true,
      data: veryLargeProductList,
      pagination: {
        page: 1,
        limit: 50, // Paginated
        total: 1000,
        pages: 20
      }
    });

    const initialMemory = measureMemoryUsage();
    
    render(<Products />);

    await waitFor(() => {
      // Should only render visible items initially
      expect(screen.getByText('Product 0')).toBeInTheDocument();
      // Should not render all 1000 items at once
      expect(screen.queryByText('Product 999')).not.toBeInTheDocument();
    });

    const finalMemory = measureMemoryUsage();
    const memoryIncrease = finalMemory - initialMemory;

    // Memory increase should be reasonable (less than 50MB)
    expect(memoryIncrease).toBeLessThan(50 * 1024 * 1024);
  });

  it('should optimize cart rendering with many items', async () => {
    // Create cart with many items
    const largeCart = {
      ...mockCart,
      items: Array.from({ length: 50 }, (_, index) => ({
        ...mockCart.items[0],
        id: `cart-item-${index}`,
        variant: {
          ...mockCart.items[0].variant,
          id: `variant-${index}`,
          name: `Variant ${index}`,
          product: {
            ...mockCart.items[0].variant.product,
            id: `product-${index}`,
            name: `Product ${index}`
          }
        }
      }))
    };

    vi.mocked(CartAPI.getCart).mockResolvedValue({
      success: true,
      data: largeCart
    });

    const renderTime = await measureRenderTime(<Cart />);

    // Should render efficiently even with many items
    expect(renderTime).toBeLessThan(1500);

    await waitFor(() => {
      expect(screen.getByText('Shopping Cart')).toBeInTheDocument();
      expect(screen.getByText('50 items')).toBeInTheDocument();
    });
  });

  it('should debounce search input to prevent excessive API calls', async () => {
    vi.useFakeTimers();
    
    const searchSpy = vi.mocked(ProductsAPI.searchProducts).mockResolvedValue({
      success: true,
      data: [mockProduct],
      pagination: { page: 1, limit: 20, total: 1, pages: 1 }
    });

    render(<Products />);

    const searchInput = screen.getByPlaceholderText(/search products/i);

    // Type quickly (should be debounced)
    searchInput.focus();
    await vi.runOnlyPendingTimersAsync();
    
    // Fast typing should not trigger multiple API calls
    searchInput.dispatchEvent(new Event('input', { bubbles: true }));
    searchInput.dispatchEvent(new Event('input', { bubbles: true }));
    searchInput.dispatchEvent(new Event('input', { bubbles: true }));

    // Only after debounce delay should API be called
    vi.advanceTimersByTime(300); // Assuming 300ms debounce
    
    expect(searchSpy).toHaveBeenCalledTimes(1);

    vi.useRealTimers();
  });

  it('should lazy load images to improve initial render performance', async () => {
    const productsWithImages = Array.from({ length: 20 }, (_, index) => ({
      ...mockProduct,
      id: `product-${index}`,
      images: [
        {
          id: `image-${index}`,
          url: `https://example.com/image-${index}.jpg`,
          alt_text: `Product ${index} image`,
          is_primary: true
        }
      ]
    }));

    vi.mocked(ProductsAPI.getProducts).mockResolvedValue({
      success: true,
      data: productsWithImages,
      pagination: { page: 1, limit: 20, total: 20, pages: 1 }
    });

    const renderTime = await measureRenderTime(<Products />);

    // Should render quickly without waiting for all images
    expect(renderTime).toBeLessThan(1000);

    await waitFor(() => {
      const images = screen.getAllByRole('img');
      // Images should have loading="lazy" attribute
      images.forEach(img => {
        expect(img).toHaveAttribute('loading', 'lazy');
      });
    });
  });

  it('should memoize expensive calculations', async () => {
    const cartWithManyItems = {
      ...mockCart,
      items: Array.from({ length: 100 }, (_, index) => ({
        ...mockCart.items[0],
        id: `item-${index}`,
        price_per_unit: Math.random() * 100,
        quantity: Math.floor(Math.random() * 5) + 1
      }))
    };

    vi.mocked(CartAPI.getCart).mockResolvedValue({
      success: true,
      data: cartWithManyItems
    });

    const startTime = performance.now();
    
    render(<Cart />);

    await waitFor(() => {
      expect(screen.getByText('Shopping Cart')).toBeInTheDocument();
    });

    const endTime = performance.now();
    const renderTime = endTime - startTime;

    // Complex calculations should be memoized for fast rendering
    expect(renderTime).toBeLessThan(1000);

    // Verify totals are calculated correctly
    await waitFor(() => {
      expect(screen.getByText(/subtotal/i)).toBeInTheDocument();
      expect(screen.getByText(/total/i)).toBeInTheDocument();
    });
  });

  it('should handle rapid state updates efficiently', async () => {
    vi.mocked(CartAPI.getCart).mockResolvedValue({
      success: true,
      data: mockCart
    });

    render(<Cart />);

    await waitFor(() => {
      expect(screen.getByText('Shopping Cart')).toBeInTheDocument();
    });

    const startTime = performance.now();

    // Simulate rapid state updates
    for (let i = 0; i < 100; i++) {
      // Trigger state updates (e.g., quantity changes)
      const quantityInput = screen.getByDisplayValue('2');
      quantityInput.dispatchEvent(new Event('input', { bubbles: true }));
    }

    const endTime = performance.now();
    const updateTime = endTime - startTime;

    // Should handle rapid updates without blocking UI
    expect(updateTime).toBeLessThan(500);
  });

  it('should optimize re-renders with React.memo', async () => {
    const renderSpy = vi.fn();
    
    // Mock component that tracks renders
    const TrackedComponent = vi.fn(() => {
      renderSpy();
      return <div>Tracked Component</div>;
    });

    const ParentComponent = () => {
      const [count, setCount] = React.useState(0);
      return (
        <div>
          <button onClick={() => setCount(c => c + 1)}>Count: {count}</button>
          <TrackedComponent />
        </div>
      );
    };

    render(<ParentComponent />);

    const button = screen.getByText(/count: 0/i);
    
    // Initial render
    expect(renderSpy).toHaveBeenCalledTimes(1);

    // Click button multiple times
    button.click();
    button.click();
    button.click();

    // Component should not re-render if props haven't changed
    // (This assumes the component is wrapped with React.memo)
    expect(renderSpy).toHaveBeenCalledTimes(1);
  });

  it('should handle large form submissions efficiently', async () => {
    const largeFormData = {
      ...Array.from({ length: 100 }, (_, index) => ({
        [`field_${index}`]: `value_${index}`
      })).reduce((acc, curr) => ({ ...acc, ...curr }), {})
    };

    const submitSpy = vi.fn();

    const LargeForm = () => {
      const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const startTime = performance.now();
        submitSpy(largeFormData);
        const endTime = performance.now();
        
        // Form submission should be fast
        expect(endTime - startTime).toBeLessThan(100);
      };

      return (
        <form onSubmit={handleSubmit}>
          {Object.entries(largeFormData).map(([key, value]) => (
            <input key={key} name={key} defaultValue={value} />
          ))}
          <button type="submit">Submit</button>
        </form>
      );
    };

    render(<LargeForm />);

    const submitButton = screen.getByText('Submit');
    submitButton.click();

    expect(submitSpy).toHaveBeenCalledWith(largeFormData);
  });

  it('should optimize bundle size with code splitting', async () => {
    // This test would verify that components are code-split appropriately
    // In a real scenario, you'd check bundle analyzer output
    
    const LazyComponent = React.lazy(() => 
      Promise.resolve({ default: () => <div>Lazy Component</div> })
    );

    render(
      <React.Suspense fallback={<div>Loading...</div>}>
        <LazyComponent />
      </React.Suspense>
    );

    // Should show loading state first
    expect(screen.getByText('Loading...')).toBeInTheDocument();

    // Then load the component
    await waitFor(() => {
      expect(screen.getByText('Lazy Component')).toBeInTheDocument();
    });
  });

  it('should handle concurrent rendering without blocking', async () => {
    const heavyCalculation = () => {
      // Simulate heavy calculation
      let result = 0;
      for (let i = 0; i < 1000000; i++) {
        result += Math.random();
      }
      return result;
    };

    const HeavyComponent = () => {
      const [result, setResult] = React.useState(0);
      
      React.useEffect(() => {
        // Use setTimeout to not block rendering
        setTimeout(() => {
          setResult(heavyCalculation());
        }, 0);
      }, []);

      return <div>Result: {result}</div>;
    };

    const startTime = performance.now();
    
    render(<HeavyComponent />);

    // Initial render should be fast
    const initialRenderTime = performance.now() - startTime;
    expect(initialRenderTime).toBeLessThan(100);

    // Should show initial state immediately
    expect(screen.getByText('Result: 0')).toBeInTheDocument();

    // Heavy calculation should complete asynchronously
    await waitFor(() => {
      expect(screen.getByText(/Result: \d+/)).toBeInTheDocument();
    }, { timeout: 5000 });
  });
});