// frontend/src/components/common/LoadingSpinner.test.tsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import LoadingSpinner from './LoadingSpinner'; // Default export

describe('LoadingSpinner Component', () => {
  it('renders without crashing and has correct ARIA attributes', () => {
    render(<LoadingSpinner />);
    const spinner = screen.getByRole('status', { name: 'Loading' });
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveClass('animate-spin');
  });

  it('applies default size "md" classes', () => {
    render(<LoadingSpinner />);
    const spinner = screen.getByRole('status');
    expect(spinner).toHaveClass('h-8', 'w-8', 'border-2');
  });

  it('applies custom size "sm" classes', () => {
    render(<LoadingSpinner size="sm" />);
    const spinner = screen.getByRole('status');
    expect(spinner).toHaveClass('h-4', 'w-4', 'border-2');
  });

  it('applies custom size "lg" classes', () => {
    render(<LoadingSpinner size="lg" />);
    const spinner = screen.getByRole('status');
    expect(spinner).toHaveClass('h-12', 'w-12', 'border-3');
  });

  it('displays optional text', () => {
    const loadingText = 'Fetching data...';
    render(<LoadingSpinner text={loadingText} />);
    expect(screen.getByText(loadingText)).toBeInTheDocument();
  });

  it('does not display text when not provided', () => {
    render(<LoadingSpinner />);
    expect(screen.queryByText(/loading/i)).not.toBeInTheDocument(); // generic check
  });

  it('renders as full screen when fullScreen is true', () => {
    render(<LoadingSpinner fullScreen={true} />);
    const fullScreenWrapper = screen.getByRole('status').closest('div.fixed'); // Find ancestor with fixed class
    expect(fullScreenWrapper).toBeInTheDocument();
    expect(fullScreenWrapper).toHaveClass('fixed', 'inset-0', 'bg-white/80', 'z-50');
  });

  it('does not render as full screen when fullScreen is false', () => {
    render(<LoadingSpinner fullScreen={false} />);
    const spinner = screen.getByRole('status');
    expect(spinner.parentElement).not.toHaveClass('fixed', 'inset-0'); // Check immediate parent
  });

  it('applies custom className', () => {
    render(<LoadingSpinner className="custom-spinner" />);
    const spinnerContainer = screen.getByRole('status').parentElement; // The container div around the spinner
    expect(spinnerContainer).toHaveClass('custom-spinner');
  });
});
