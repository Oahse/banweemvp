// frontend/src/components/ui/ProductImage.test.tsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vitest } from 'vitest';
import { ProductImage } from './ProductImage';
import { LazyImage } from './LazyImage'; // Import the actual LazyImage to mock it

// Mock the LazyImage component
vitest.mock('./LazyImage', () => ({
  LazyImage: vitest.fn((props) => (
    <img data-testid="mock-lazy-image" {...props} />
  )),
}));

describe('ProductImage Component', () => {
  const mockSrc = 'http://example.com/product.jpg';
  const mockAlt = 'Product Alt Text';
  const mockClassName = 'custom-product-image';

  beforeEach(() => {
    // Clear mock calls before each test
    (LazyImage as vitest.Mock).mockClear();
  });

  it('renders LazyImage with essential props', () => {
    render(<ProductImage src={mockSrc} alt={mockAlt} />);
    
    // Expect LazyImage to be called with the correct props
    expect(LazyImage).toHaveBeenCalledWith(
      expect.objectContaining({
        src: mockSrc,
        alt: mockAlt,
        className: '', // Default className
        priority: false, // Default priority
        sizes: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw', // Default sizes
        placeholder: 'var(--color-surface-hover)',
        loading: 'lazy',
        decoding: 'async',
      }),
      {}
    );
    // Verify that the mocked image is in the document
    expect(screen.getByTestId('mock-lazy-image')).toBeInTheDocument();
  });

  it('forwards className prop to LazyImage', () => {
    render(<ProductImage src={mockSrc} alt={mockAlt} className={mockClassName} />);
    
    expect(LazyImage).toHaveBeenCalledWith(
      expect.objectContaining({
        className: mockClassName,
      }),
      {}
    );
  });

  it('sets loading to "eager" when priority is true', () => {
    render(<ProductImage src={mockSrc} alt={mockAlt} priority={true} />);
    
    expect(LazyImage).toHaveBeenCalledWith(
      expect.objectContaining({
        priority: true,
        loading: 'eager',
      }),
      {}
    );
  });

  it('overrides default sizes when sizes prop is provided', () => {
    const customSizes = '(max-width: 768px) 100vw, 50vw';
    render(<ProductImage src={mockSrc} alt={mockAlt} sizes={customSizes} />);
    
    expect(LazyImage).toHaveBeenCalledWith(
      expect.objectContaining({
        sizes: customSizes,
      }),
      {}
    );
  });

  it('uses default sizes when sizes prop is not provided', () => {
    render(<ProductImage src={mockSrc} alt={mockAlt} />);
    
    expect(LazyImage).toHaveBeenCalledWith(
      expect.objectContaining({
        sizes: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw',
      }),
      {}
    );
  });
});
