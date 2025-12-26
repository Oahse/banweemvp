// frontend/src/components/ui/CartSkeleton.test.tsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { CartSkeleton } from './CartSkeleton';

describe('CartSkeleton Component', () => {
  it('renders without crashing', () => {
    render(<CartSkeleton />);
    expect(screen.getByTestId('cart-skeleton-container')).toBeInTheDocument();
  });

  it('renders cart item placeholders', () => {
    render(<CartSkeleton />);
    const cartItemPlaceholders = screen.getAllByTestId('cart-item-placeholder');
    expect(cartItemPlaceholders.length).toBeGreaterThan(0);
    expect(cartItemPlaceholders[0]).toHaveClass('w-20', 'h-20', 'rounded-md', 'bg-gray-200');
  });

  it('renders order summary placeholders', () => {
    render(<CartSkeleton />);
    const summaryItemPlaceholders = screen.getAllByTestId('summary-item-placeholder');
    expect(summaryItemPlaceholders.length).toBeGreaterThan(0);
    expect(summaryItemPlaceholders[0]).toHaveClass('h-6', 'bg-gray-200', 'rounded', 'w-1/2');
  });
});