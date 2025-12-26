// frontend/src/components/common/Price.test.tsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vitest, beforeEach } from 'vitest';
import { Price } from './Price';
import { useLocale } from '../../hooks/useLocale';

// Mock the useLocale hook
vitest.mock('../../hooks/useLocale', () => ({
  useLocale: vitest.fn(),
}));

describe('Price Component', () => {
  const mockFormatCurrency = vitest.fn();

  beforeEach(() => {
    vitest.clearAllMocks();
    // Default mock implementation for formatCurrency
    mockFormatCurrency.mockImplementation((amount, currency) => {
      // Simple mock: prepend '$' and format to 2 decimal places for USD
      if (currency === 'USD') return `$${amount.toFixed(2)}`;
      if (currency === 'EUR') return `€${amount.toFixed(2)}`;
      return `${amount.toFixed(2)} ${currency}`;
    });

    (useLocale as vitest.Mock).mockReturnValue({
      formatCurrency: mockFormatCurrency,
      locale: { code: 'US', currency: 'USD' }, // Provide minimal locale data if needed
      changeLocale: vitest.fn(),
      locationData: null,
      isDetecting: false,
    });
  });

  it('renders formatted price with default sourceCurrency (USD)', () => {
    render(<Price amount={10.50} />);
    expect(mockFormatCurrency).toHaveBeenCalledWith(10.50, 'USD');
    expect(screen.getByText('$10.50')).toBeInTheDocument();
  });

  it('renders formatted price with specified sourceCurrency (EUR)', () => {
    render(<Price amount={25.75} sourceCurrency="EUR" />);
    expect(mockFormatCurrency).toHaveBeenCalledWith(25.75, 'EUR');
    expect(screen.getByText('€25.75')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Price amount={100} className="text-xl font-bold" />);
    expect(screen.getByText('$100.00')).toHaveClass('text-xl', 'font-bold');
  });

  it('hides currency symbol when showCurrency is false', () => {
    // The mock formatCurrency returns "$10.00", so we expect "10.00"
    render(<Price amount={10.00} showCurrency={false} />);
    expect(screen.getByText('10.00')).toBeInTheDocument();
    expect(screen.queryByText('$10.00')).not.toBeInTheDocument();
  });

  it('shows currency symbol when showCurrency is true (default)', () => {
    render(<Price amount={50.00} showCurrency={true} />);
    expect(screen.getByText('$50.00')).toBeInTheDocument();
  });

  it('handles zero amount correctly', () => {
    render(<Price amount={0} />);
    expect(screen.getByText('$0.00')).toBeInTheDocument();
  });

  it('handles negative amount correctly', () => {
    render(<Price amount={-15.20} />);
    expect(screen.getByText('$-15.20')).toBeInTheDocument();
  });
});
