// frontend/src/components/product/ProductFilter.test.tsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vitest, beforeEach } from 'vitest';
import { ProductFilter } from './ProductFilter';

// --- Mock external dependencies ---
vitest.mock('../ui/Checkbox', () => ({
  Checkbox: vitest.fn((props) => (
    <input type="checkbox" data-testid={`mock-checkbox-${props.id}`} {...props} onChange={(e) => props.onChange(props.id, e.target.checked)} />
  )),
}));
vitest.mock('../ui/Input', () => ({
  Input: vitest.fn((props) => (
    <input type="number" data-testid={`mock-input-${props.placeholder}`} {...props} onChange={(e) => props.onChange(e)} />
  )),
}));
vitest.mock('../ui/Button', () => ({
  Button: vitest.fn((props) => (
    <button {...props} data-testid="mock-button">
      {props.children}
    </button>
  )),
}));
vitest.mock('../ui/Skeleton', () => ({
  Skeleton: vitest.fn(() => <div data-testid="mock-skeleton"></div>),
  SkeletonText: vitest.fn(() => <div data-testid="mock-skeleton-text"></div>),
  SkeletonRectangle: vitest.fn(() => <div data-testid="mock-skeleton-rectangle"></div>),
}));

vitest.mock('lucide-react', () => ({
  FilterIcon: vitest.fn(() => <svg data-testid="icon-filter" />),
  ChevronDownIcon: vitest.fn(() => <svg data-testid="icon-chevron-down" />),
  ChevronUpIcon: vitest.fn(() => <svg data-testid="icon-chevron-up" />),
}));


describe('ProductFilter Component', () => {
  const mockCategories = {
    id: 'categories', name: 'Categories', options: [
      { id: 'cat1', label: 'Category 1', count: 10 },
      { id: 'cat2', label: 'Category 2', count: 20 },
    ],
  };
  const mockBrands = {
    id: 'brands', name: 'Brands', options: [
      { id: 'brandA', label: 'Brand A', count: 5 },
      { id: 'brandB', label: 'Brand B', count: 15 },
    ],
  };
  const mockRatings = {
    id: 'ratings', name: 'Rating', options: [
      { id: '4', label: '4 Stars', count: 50 },
      { id: '3', label: '3 Stars', count: 30 },
    ],
  };
  const mockPriceRange = { min: 0, max: 100 };
  const mockOnFilterChange = vitest.fn();

  beforeEach(() => {
    vitest.clearAllMocks();
  });

  it('renders filter sections and options', () => {
    render(
      <ProductFilter
        categories={mockCategories}
        brands={mockBrands}
        ratings={mockRatings}
        priceRange={mockPriceRange}
        onFilterChange={mockOnFilterChange}
      />
    );
    expect(screen.getByText('Categories')).toBeInTheDocument();
    expect(screen.getByText('Category 1')).toBeInTheDocument();
    expect(screen.getByText('Brands')).toBeInTheDocument();
    expect(screen.getByText('Brand A')).toBeInTheDocument();
    expect(screen.getByText('Rating')).toBeInTheDocument();
    expect(screen.getByText('4 Stars')).toBeInTheDocument();
    expect(screen.getByText('Price Range')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Min')).toHaveValue(0);
    expect(screen.getByPlaceholderText('Max')).toHaveValue(100);
  });

  it('shows loading skeleton when loading is true', () => {
    render(
      <ProductFilter
        categories={mockCategories}
        brands={mockBrands}
        ratings={mockRatings}
        priceRange={mockPriceRange}
        onFilterChange={mockOnFilterChange}
        loading={true}
      />
    );
    expect(screen.getAllByTestId('mock-skeleton').length).toBeGreaterThan(0);
    expect(screen.queryByText('Categories')).not.toBeInTheDocument();
  });

  it('toggles filter section expansion', () => {
    render(
      <ProductFilter
        categories={mockCategories}
        brands={mockBrands}
        ratings={mockRatings}
        priceRange={mockPriceRange}
        onFilterChange={mockOnFilterChange}
      />
    );
    const categoriesHeader = screen.getByText('Categories');
    fireEvent.click(categoriesHeader); // Collapse categories
    expect(screen.queryByText('Category 1')).not.toBeInTheDocument();

    fireEvent.click(categoriesHeader); // Expand categories
    expect(screen.getByText('Category 1')).toBeInTheDocument();
  });

  it('handles category selection and calls onFilterChange', async () => {
    render(
      <ProductFilter
        categories={mockCategories}
        brands={mockBrands}
        ratings={mockRatings}
        priceRange={mockPriceRange}
        onFilterChange={mockOnFilterChange}
      />
    );
    const category1Checkbox = screen.getByTestId('mock-checkbox-cat1');
    fireEvent.click(category1Checkbox); // Select Category 1
    
    await waitFor(() => {
      expect(mockOnFilterChange).toHaveBeenCalledWith(
        expect.objectContaining({ categories: ['cat1'] })
      );
    });

    fireEvent.click(category1Checkbox); // Deselect Category 1
    await waitFor(() => {
      expect(mockOnFilterChange).toHaveBeenCalledWith(
        expect.objectContaining({ categories: [] })
      );
    });
  });

  it('handles price range change and calls onFilterChange', async () => {
    render(
      <ProductFilter
        categories={mockCategories}
        brands={mockBrands}
        ratings={mockRatings}
        priceRange={mockPriceRange}
        onFilterChange={mockOnFilterChange}
      />
    );
    const minPriceInput = screen.getByPlaceholderText('Min');
    const maxPriceInput = screen.getByPlaceholderText('Max');

    fireEvent.change(minPriceInput, { target: { value: '20' } });
    fireEvent.change(maxPriceInput, { target: { value: '80' } });

    await waitFor(() => {
      expect(mockOnFilterChange).toHaveBeenCalledWith(
        expect.objectContaining({ price: { min: 20, max: 80 } })
      );
    });
  });

  it('clears all filters when "Clear all" button is clicked', async () => {
    render(
      <ProductFilter
        categories={mockCategories}
        brands={mockBrands}
        ratings={mockRatings}
        priceRange={mockPriceRange}
        onFilterChange={mockOnFilterChange}
      />
    );
    fireEvent.click(screen.getByTestId('mock-checkbox-cat1')); // Select one filter
    await waitFor(() => expect(mockOnFilterChange).toHaveBeenCalledWith(expect.objectContaining({ categories: ['cat1'] })));

    fireEvent.click(screen.getByRole('button', { name: 'Clear all' }));
    await waitFor(() => {
      expect(mockOnFilterChange).toHaveBeenCalledWith(
        expect.objectContaining({
          categories: [],
          brands: [],
          ratings: [],
          price: { min: mockPriceRange.min, max: mockPriceRange.max },
        })
      );
    });
  });

  it('renders "Show Filters" button in mobile mode and toggles visibility', () => {
    render(
      <ProductFilter
        categories={mockCategories}
        brands={mockBrands}
        ratings={mockRatings}
        priceRange={mockPriceRange}
        onFilterChange={mockOnFilterChange}
        isMobile={true}
      />
    );
    const showFiltersButton = screen.getByRole('button', { name: 'Show Filters' });
    expect(showFiltersButton).toBeInTheDocument();
    expect(screen.queryByText('Categories')).not.toBeInTheDocument(); // Initially hidden

    fireEvent.click(showFiltersButton); // Show filters
    expect(screen.getByText('Hide Filters')).toBeInTheDocument();
    expect(screen.getByText('Categories')).toBeInTheDocument();
  });
});
