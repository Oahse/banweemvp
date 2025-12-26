// frontend/src/components/common/EmptyState.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vitest, beforeEach } from 'vitest';
import { BrowserRouter, Link } from 'react-router-dom';
import { EmptyState } from './EmptyState';
import { ShoppingCartIcon, HeartIcon, PackageIcon, SearchIcon, CoffeeIcon } from 'lucide-react'; // Mocking needed for these

// Mock react-router-dom Link component
vitest.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    Link: vitest.fn(({ to, children, ...props }) => (
      <a href={to} {...props}>
        {children}
      </a>
    )),
  };
});

// Mock lucide-react icons
vitest.mock('lucide-react', () => ({
  ShoppingCartIcon: vitest.fn(() => <svg data-testid="shopping-cart-icon" />),
  HeartIcon: vitest.fn(() => <svg data-testid="heart-icon" />),
  PackageIcon: vitest.fn(() => <svg data-testid="package-icon" />),
  SearchIcon: vitest.fn(() => <svg data-testid="search-icon" />),
  CoffeeIcon: vitest.fn(() => <svg data-testid="coffee-icon" />),
}));

describe('EmptyState Component', () => {
  beforeEach(() => {
    vitest.clearAllMocks();
  });

  // Helper to render with BrowserRouter context
  const renderWithRouter = (ui) => render(<BrowserRouter>{ui}</BrowserRouter>);

  it('renders custom content and icon', () => {
    renderWithRouter(
      <EmptyState
        type="custom"
        title="Custom Title"
        description="Custom Description."
        actionText="Go Somewhere"
        actionLink="/custom"
        icon={<CoffeeIcon data-testid="custom-icon" />}
      />
    );
    expect(screen.getByText('Custom Title')).toBeInTheDocument();
    expect(screen.getByText('Custom Description.')).toBeInTheDocument();
    expect(screen.getByText('Go Somewhere')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Go Somewhere' })).toHaveAttribute('href', '/custom');
    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
  });

  it('renders default content for "cart" type', () => {
    renderWithRouter(<EmptyState type="cart" />);
    expect(screen.getByText('Your cart is empty')).toBeInTheDocument();
    expect(screen.getByText("Looks like you haven't added any products to your cart yet.")).toBeInTheDocument();
    expect(screen.getByText('Continue Shopping')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Continue Shopping' })).toHaveAttribute('href', '/products');
    expect(screen.getByTestId('shopping-cart-icon')).toBeInTheDocument();
  });

  it('renders default content for "wishlist" type', () => {
    renderWithRouter(<EmptyState type="wishlist" />);
    expect(screen.getByText('Your wishlist is empty')).toBeInTheDocument();
    expect(screen.getByText('Add items you love to your wishlist to easily find them later.')).toBeInTheDocument();
    expect(screen.getByText('Start Shopping')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Start Shopping' })).toHaveAttribute('href', '/products');
    expect(screen.getByTestId('heart-icon')).toBeInTheDocument();
  });

  it('renders default content for "products" type', () => {
    renderWithRouter(<EmptyState type="products" actionText="Clear Filters" />); // actionText and actionLink need to be managed by parent for 'products' type
    expect(screen.getByText('No products found')).toBeInTheDocument();
    expect(screen.getByText('Try adjusting your search or filter criteria.')).toBeInTheDocument();
    expect(screen.getByText('Clear Filters')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Clear Filters' })).toBeInTheDocument(); // It should be a button as actionLink is null
    expect(screen.getByTestId('package-icon')).toBeInTheDocument();
  });

  it('renders a button when actionText is provided but actionLink is null', () => {
    const mockAction = vitest.fn();
    renderWithRouter(
      <EmptyState
        type="custom"
        title="Actionable"
        description="Click the button"
        actionText="Perform Action"
        actionLink={null}
        // Assuming onClick is passed through props, which it isn't directly in the component signature
        // The component has a placeholder onClick for the button.
      />
    );
    const button = screen.getByRole('button', { name: 'Perform Action' });
    expect(button).toBeInTheDocument();
    // Cannot test the internal onClick functionality directly without modifying the component
    // fireEvent.click(button); // This would not call mockAction as it's not hooked up
  });

  it('does not render action elements if actionText is not provided', () => {
    renderWithRouter(
      <EmptyState
        type="custom"
        title="No Action"
        description="No action button here."
      />
    );
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });
});
