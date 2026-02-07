// frontend/src/components/product/ProductSearch.test.tsx
import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { describe, it, expect, vitest, beforeEach, afterEach } from 'vitest';
import { ProductSearch } from './ProductSearch';

// --- Mock external dependencies ---
vitest.mock('../ui/Input', () => ({
  Input: vitest.fn((props) => (
    <input
      type={props.type || 'text'}
      data-testid={`mock-input-${props.placeholder?.replace(/\s/g, '-')}`}
      {...props}
      value={props.value || ''}
      onChange={(e) => props.onChange(e)}
    />
  )),
}));
vitest.mock('../ui/Button', () => ({
  Button: vitest.fn((props) => (
    <button {...props} data-testid="mock-button">
      {props.children}
    </button>
  )),
}));
vitest.mock('../ui/Select', () => ({
  Select: vitest.fn((props) => (
    <select {...props} data-testid={`mock-select-${props.label?.replace(/\s/g, '-')}`} onChange={(e) => props.onChange(e.target.value)}>
      {props.options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  )),
}));

vitest.mock('lucide-react', () => ({
  SearchIcon: vitest.fn(() => <svg data-testid="icon-search" />),
  FilterIcon: vitest.fn(() => <svg data-testid="icon-filter" />),
  XIcon: vitest.fn(() => <svg data-testid="icon-x" />),
  SortAscIcon: vitest.fn(() => <svg data-testid="icon-sort-asc" />),
  SortDescIcon: vitest.fn(() => <svg data-testid="icon-sort-desc" />),
  GridIcon: vitest.fn(() => <svg data-testid="icon-grid" />),
  ListIcon: vitest.fn(() => <svg data-testid="icon-list" />),
}));


describe('ProductSearch Component', () => {
  const mockCategories = [
    { id: 'cat1', name: 'Electronics', count: 10 },
    { id: 'cat2', name: 'Books', count: 5 },
  ];
  const mockTags = [
    { id: 'tag1', name: 'New', count: 3 },
    { id: 'tag2', name: 'Sale', count: 7 },
  ];
  const mockPriceRange = { min: 0, max: 200 };
  const mockOnSearch = vitest.fn();
  const mockOnViewModeChange = vitest.fn();

  beforeEach(() => {
    vitest.clearAllMocks();
    vitest.useFakeTimers(); // Enable fake timers for debouncing
  });

  afterEach(() => {
    vitest.useRealTimers(); // Restore real timers
  });

  it('renders search input, category select, and filter button', () => {
    render(
      <ProductSearch
        onSearch={mockOnSearch}
        onViewModeChange={mockOnViewModeChange}
        viewMode="grid"
        categories={mockCategories}
        tags={mockTags}
        priceRange={mockPriceRange}
      />
    );
    expect(screen.getByPlaceholderText('Search products, variants, SKUs...')).toBeInTheDocument();
    expect(screen.getByTestId('mock-select--all-categories')).toBeInTheDocument(); // Category select
    expect(screen.getByRole('button', { name: /filters/i })).toBeInTheDocument();
  });

  it('calls onSearch with debounced query input', async () => {
    render(
      <ProductSearch
        onSearch={mockOnSearch}
        onViewModeChange={mockOnViewModeChange}
        viewMode="grid"
        categories={mockCategories}
        tags={mockTags}
        priceRange={mockPriceRange}
      />
    );
    const searchInput = screen.getByPlaceholderText('Search products, variants, SKUs...');
    fireEvent.change(searchInput, { target: { value: 'laptop' } });
    expect(mockOnSearch).not.toHaveBeenCalled(); // Not called immediately due to debounce

    await act(async () => {
      vitest.advanceTimersByTime(300); // Advance timer past debounce interval
    });
    expect(mockOnSearch).toHaveBeenCalledWith(expect.objectContaining({ query: 'laptop' }));
  });

  it('toggles advanced filters visibility', () => {
    render(
      <ProductSearch
        onSearch={mockOnSearch}
        onViewModeChange={mockOnViewModeChange}
        viewMode="grid"
        categories={mockCategories}
        tags={mockTags}
        priceRange={mockPriceRange}
      />
    );
    const filterButton = screen.getByRole('button', { name: 'Filters' });
    fireEvent.click(filterButton);
    expect(screen.getByLabelText('Availability')).toBeInTheDocument(); // Advanced filter section visible
    fireEvent.click(filterButton);
    expect(screen.queryByLabelText('Availability')).not.toBeInTheDocument(); // Advanced filter section hidden
  });

  it('updates category filter and calls onSearch', async () => {
    render(
      <ProductSearch
        onSearch={mockOnSearch}
        onViewModeChange={mockOnViewModeChange}
        viewMode="grid"
        categories={mockCategories}
        tags={mockTags}
        priceRange={mockPriceRange}
      />
    );
    fireEvent.change(screen.getByTestId('mock-select--all-categories'), { target: { value: 'cat1' } });

    await act(async () => {
      vitest.advanceTimersByTime(300);
    });
    expect(mockOnSearch).toHaveBeenCalledWith(expect.objectContaining({ category: 'cat1' }));
  });

  it('toggles tag filter and calls onSearch', async () => {
    render(
      <ProductSearch
        onSearch={mockOnSearch}
        onViewModeChange={mockOnViewModeChange}
        viewMode="grid"
        categories={mockCategories}
        tags={mockTags}
        priceRange={mockPriceRange}
      />
    );
    // Open advanced filters
    fireEvent.click(screen.getByRole('button', { name: 'Filters' }));
    
    const tagButton = screen.getByRole('button', { name: /new \(3\)/i });
    fireEvent.click(tagButton);

    await act(async () => {
      vitest.advanceTimersByTime(300);
    });
    expect(mockOnSearch).toHaveBeenCalledWith(expect.objectContaining({ tags: ['tag1'] }));

    fireEvent.click(tagButton); // Deselect
    await act(async () => {
      vitest.advanceTimersByTime(300);
    });
    expect(mockOnSearch).toHaveBeenCalledWith(expect.objectContaining({ tags: [] }));
  });

  it('calls onViewModeChange when view mode buttons are clicked', () => {
    render(
      <ProductSearch
        onSearch={mockOnSearch}
        onViewModeChange={mockOnViewModeChange}
        viewMode="grid"
        categories={mockCategories}
        tags={mockTags}
        priceRange={mockPriceRange}
      />
    );
    fireEvent.click(screen.getByRole('button', { name: /list/i }));
    expect(mockOnViewModeChange).toHaveBeenCalledWith('list');
  });

  it('displays active filter tags and allows removal', async () => {
    render(
      <ProductSearch
        onSearch={mockOnSearch}
        onViewModeChange={mockOnViewModeChange}
        viewMode="grid"
        categories={mockCategories}
        tags={mockTags}
        priceRange={mockPriceRange}
      />
    );
    const searchInput = screen.getByPlaceholderText('Search products, variants, SKUs...');
    fireEvent.change(searchInput, { target: { value: 'active item' } });
    fireEvent.change(screen.getByTestId('mock-select--all-categories'), { target: { value: 'cat1' } });
    fireEvent.click(screen.getByRole('button', { name: 'Filters' })); // Open advanced filters
    fireEvent.change(screen.getByTestId('mock-select--in-stock'), { target: { value: 'in_stock' } });
    fireEvent.click(screen.getByRole('button', { name: /new \(3\)/i }));

    await act(async () => {
      vitest.advanceTimersByTime(300);
    });

    expect(screen.getByText('Active filters:')).toBeInTheDocument();
    expect(screen.getByText('Search: "active item"')).toBeInTheDocument();
    expect(screen.getByText('Category: Electronics')).toBeInTheDocument();
    expect(screen.getByText('Tag: New')).toBeInTheDocument();
    
    // Remove search filter
    fireEvent.click(screen.getByText('Search: "active item"').querySelector('[data-testid="icon-x"]')!);
    await act(async () => {
      vitest.advanceTimersByTime(300);
    });
    expect(screen.queryByText('Search: "active item"')).not.toBeInTheDocument();
  });

  it('clears all filters from active filters section', async () => {
    render(
      <ProductSearch
        onSearch={mockOnSearch}
        onViewModeChange={mockOnViewModeChange}
        viewMode="grid"
        categories={mockCategories}
        tags={mockTags}
        priceRange={mockPriceRange}
      />
    );
    const searchInput = screen.getByPlaceholderText('Search products, variants, SKUs...');
    fireEvent.change(searchInput, { target: { value: 'item' } });
    await act(async () => {
      vitest.advanceTimersByTime(300);
    });
    expect(screen.getByText('Active filters:')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Clear all' }, { selector: '.bg-blue-50 button' })); // Clear all in active filters
    await act(async () => {
      vitest.advanceTimersByTime(300);
    });

    expect(mockOnSearch).toHaveBeenCalledWith(
      expect.objectContaining({
        query: '',
        category: '',
        tags: [],
        availability: '',
        minPrice: mockPriceRange.min,
        maxPrice: mockPriceRange.max,
        minRating: 0,
        sortBy: 'name',
        sortOrder: 'asc',
      })
    );
    expect(screen.queryByText('Active filters:')).not.toBeInTheDocument();
  });

  it('displays result count and "Searching..." state', () => {
    const { rerender } = render(
      <ProductSearch
        onSearch={mockOnSearch}
        onViewModeChange={mockOnViewModeChange}
        viewMode="grid"
        categories={mockCategories}
        tags={mockTags}
        priceRange={mockPriceRange}
        resultCount={123}
      />
    );
    expect(screen.getByText('123 products found')).toBeInTheDocument();

    rerender(
      <ProductSearch
        onSearch={mockOnSearch}
        onViewModeChange={mockOnViewModeChange}
        viewMode="grid"
        categories={mockCategories}
        tags={mockTags}
        priceRange={mockPriceRange}
        resultCount={123}
        loading={true}
      />
    );
    expect(screen.getByText('Searching...')).toBeInTheDocument();
  });
});
