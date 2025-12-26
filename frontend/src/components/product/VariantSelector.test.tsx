// frontend/src/components/product/VariantSelector.test.tsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vitest, beforeEach } from 'vitest';
import { VariantSelector } from './VariantSelector';
import { CheckIcon } from 'lucide-react'; // Mocked icon

// --- Mock external dependencies ---
vitest.mock('lucide-react', () => ({
  CheckIcon: vitest.fn(() => <svg data-testid="icon-check" />),
}));

describe('VariantSelector Component', () => {
  const mockVariants = [
    {
      id: 'v1', product_id: 'p1', sku: 'SKU001', name: 'Small Red', base_price: 10, sale_price: null, stock: 5, barcode: '', qr_code: '',
      attributes: [{ id: 'a1', name: 'Size', value: 'Small' }, { id: 'a2', name: 'Color', value: 'Red' }],
      images: [{ id: 'i1', variant_id: 'v1', url: 'http://img.com/sred.jpg', alt_text: 'Small Red', sort_order: 1, is_primary: true }],
    },
    {
      id: 'v2', product_id: 'p1', sku: 'SKU002', name: 'Large Red', base_price: 15, sale_price: 12, stock: 0, barcode: '', qr_code: '',
      attributes: [{ id: 'a3', name: 'Size', value: 'Large' }, { id: 'a4', name: 'Color', value: 'Red' }],
      images: [{ id: 'i2', variant_id: 'v2', url: 'http://img.com/lred.jpg', alt_text: 'Large Red', sort_order: 1, is_primary: true }],
    },
    {
      id: 'v3', product_id: 'p1', sku: 'SKU003', name: 'Small Blue', base_price: 12, sale_price: null, stock: 10, barcode: '', qr_code: '',
      attributes: [{ id: 'a5', name: 'Size', value: 'Small' }, { id: 'a6', name: 'Color', value: 'Blue' }],
      images: [{ id: 'i3', variant_id: 'v3', url: 'http://img.com/sblue.jpg', alt_text: 'Small Blue', sort_order: 1, is_primary: true }],
    },
  ];

  const mockOnVariantChange = vitest.fn();

  beforeEach(() => {
    vitest.clearAllMocks();
  });

  // --- Grid Layout Tests (Default) ---
  describe('Grid Layout (Default)', () => {
    it('renders attribute-based selection for Size and Color', () => {
      render(
        <VariantSelector
          variants={mockVariants}
          selectedVariant={mockVariants[0]} // Small Red
          onVariantChange={mockOnVariantChange}
        />
      );
      expect(screen.getByText('Size')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Small' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Large' })).toBeInTheDocument();
      expect(screen.getByText('Color')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Red' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Blue' })).toBeInTheDocument();
    });

    it('highlights selected attribute values', () => {
      render(
        <VariantSelector
          variants={mockVariants}
          selectedVariant={mockVariants[0]} // Small Red
          onVariantChange={mockOnVariantChange}
        />
      );
      expect(screen.getByRole('button', { name: 'Small' })).toHaveClass('bg-primary');
      expect(screen.getByRole('button', { name: 'Red' })).toHaveClass('bg-primary');
      expect(screen.getByRole('button', { name: 'Large' })).not.toHaveClass('bg-primary');
    });

    it('disables unavailable variants in attribute selection', () => {
      render(
        <VariantSelector
          variants={mockVariants}
          selectedVariant={mockVariants[0]} // Small Red
          onVariantChange={mockOnVariantChange}
        />
      );
      // Large Red is out of stock (v2)
      expect(screen.getByRole('button', { name: 'Large' })).toBeDisabled();
      expect(screen.getByRole('button', { name: 'Large' })).toHaveClass('line-through');
    });

    it('calls onVariantChange when an attribute button is clicked', () => {
      render(
        <VariantSelector
          variants={mockVariants}
          selectedVariant={mockVariants[0]} // Small Red
          onVariantChange={mockOnVariantChange}
        />
      );
      fireEvent.click(screen.getByRole('button', { name: 'Blue' })); // Click Small Blue (v3)
      expect(mockOnVariantChange).toHaveBeenCalledWith(mockVariants[2]);
    });

    it('renders variant cards with images when showImages is true', () => {
      render(
        <VariantSelector
          variants={mockVariants}
          selectedVariant={mockVariants[0]}
          onVariantChange={mockOnVariantChange}
          showImages={true}
        />
      );
      expect(screen.getByText('Variants')).toBeInTheDocument();
      expect(screen.getByAltText('Small Red')).toBeInTheDocument();
      expect(screen.getByText('$10.00')).toBeInTheDocument();
      expect(screen.getByText('5 left')).toBeInTheDocument();
    });

    it('highlights selected variant card', () => {
      render(
        <VariantSelector
          variants={mockVariants}
          selectedVariant={mockVariants[0]}
          onVariantChange={mockOnVariantChange}
          showImages={true}
        />
      );
      const smallRedCard = screen.getByText('Small Red').closest('button')!;
      expect(smallRedCard).toHaveClass('border-primary');
    });
  });

  // --- Dropdown Layout Tests ---
  describe('Dropdown Layout', () => {
    it('renders a select dropdown for variants', () => {
      render(
        <VariantSelector
          variants={mockVariants}
          selectedVariant={mockVariants[0]}
          onVariantChange={mockOnVariantChange}
          layout="dropdown"
        />
      );
      const select = screen.getByRole('combobox', { name: 'Select Variant' });
      expect(select).toBeInTheDocument();
      expect(select).toHaveValue('v1'); // Small Red is selected
      expect(screen.getByText('Large Red - $15.00 (Out of Stock)')).toBeDisabled();
    });

    it('calls onVariantChange when a dropdown option is selected', () => {
      render(
        <VariantSelector
          variants={mockVariants}
          selectedVariant={mockVariants[0]}
          onVariantChange={mockOnVariantChange}
          layout="dropdown"
        />
      );
      const select = screen.getByRole('combobox', { name: 'Select Variant' });
      fireEvent.change(select, { target: { value: 'v3' } }); // Select Small Blue
      expect(mockOnVariantChange).toHaveBeenCalledWith(mockVariants[2]);
    });
  });

  // --- List Layout Tests ---
  describe('List Layout', () => {
    it('renders variants as a list', () => {
      render(
        <VariantSelector
          variants={mockVariants}
          selectedVariant={mockVariants[0]}
          onVariantChange={mockOnVariantChange}
          layout="list"
          showImages={true}
          showPrice={true}
          showStock={true}
        />
      );
      expect(screen.getByText('Small Red')).toBeInTheDocument();
      expect(screen.getByAltText('Small Red')).toBeInTheDocument();
      expect(screen.getByText('$10.00')).toBeInTheDocument();
      expect(screen.getByText('5 in stock')).toBeInTheDocument();
      expect(screen.getByText('Size: Small, Color: Red')).toBeInTheDocument(); // Formatted attributes
    });

    it('highlights selected variant in list', () => {
      render(
        <VariantSelector
          variants={mockVariants}
          selectedVariant={mockVariants[0]}
          onVariantChange={mockOnVariantChange}
          layout="list"
        />
      );
      const smallRedButton = screen.getByText('Small Red').closest('button')!;
      expect(smallRedButton).toHaveClass('border-primary');
      expect(smallRedButton).toContainElement(screen.getByTestId('icon-check'));
    });

    it('disables unavailable variants in list', () => {
      render(
        <VariantSelector
          variants={mockVariants}
          selectedVariant={mockVariants[0]}
          onVariantChange={mockOnVariantChange}
          layout="list"
        />
      );
      const largeRedButton = screen.getByText('Large Red').closest('button')!;
      expect(largeRedButton).toBeDisabled();
      expect(largeRedButton).toHaveClass('opacity-50');
      expect(largeRedButton).toHaveClass('cursor-not-allowed');
      expect(screen.getByText('Out of stock')).toBeInTheDocument();
    });
  });

  // --- Prop Toggling Tests ---
  it('hides images when showImages is false in list layout', () => {
    render(
      <VariantSelector
        variants={mockVariants}
        selectedVariant={mockVariants[0]}
        onVariantChange={mockOnVariantChange}
        layout="list"
        showImages={false}
      />
    );
    expect(screen.queryByAltText('Small Red')).not.toBeInTheDocument();
  });

  it('hides price when showPrice is false in grid layout (variant cards)', () => {
    render(
      <VariantSelector
        variants={mockVariants}
        selectedVariant={mockVariants[0]}
        onVariantChange={mockOnVariantChange}
        showImages={true}
        showPrice={false}
      />
    );
    expect(screen.queryByText('$10.00')).not.toBeInTheDocument();
  });

  it('hides stock when showStock is false in grid layout (variant cards)', () => {
    render(
      <VariantSelector
        variants={mockVariants}
        selectedVariant={mockVariants[0]}
        onVariantChange={mockOnVariantChange}
        showImages={true}
        showStock={false}
      />
    );
    expect(screen.queryByText('5 left')).not.toBeInTheDocument();
  });
});
