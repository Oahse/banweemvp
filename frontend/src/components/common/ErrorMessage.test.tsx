// frontend/src/components/common/ErrorMessage.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vitest, beforeEach } from 'vitest';
import ErrorMessage from './ErrorMessage'; // Default export

describe('ErrorMessage Component', () => {
  beforeEach(() => {
    vitest.clearAllMocks();
  });

  it('renders nothing when error is null or undefined', () => {
    const { container: nullContainer } = render(<ErrorMessage error={null} />);
    expect(nullContainer).toBeEmptyDOMElement();

    const { container: undefinedContainer } = render(<ErrorMessage error={undefined} />);
    expect(undefinedContainer).toBeEmptyDOMElement();
  });

  it('renders a string error message', () => {
    const errorMessage = 'This is a simple error string.';
    render(<ErrorMessage error={errorMessage} />);
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
    expect(screen.getByText(errorMessage).closest('div')).toHaveClass('bg-red-50'); // Default variant class
  });

  it('renders an Error object message', () => {
    const error = new Error('Something bad happened!');
    render(<ErrorMessage error={error} />);
    expect(screen.getByText('Something bad happened!')).toBeInTheDocument();
  });

  it('renders an object with a message property', () => {
    const error = { message: 'Failed to fetch data.', code: 500 };
    render(<ErrorMessage error={error} />);
    expect(screen.getByText('Failed to fetch data.')).toBeInTheDocument();
  });

  it('renders an object with nested message property', () => {
    const error = { message: { message: 'Nested error occurred.' } };
    render(<ErrorMessage error={error} />);
    expect(screen.getByText('Nested error occurred.')).toBeInTheDocument();
  });

  it('renders error details when provided', () => {
    const error = {
      message: 'Validation failed.',
      details: ['Field A is required', 'Field B has invalid format'],
    };
    render(<ErrorMessage error={error} />);
    expect(screen.getByText('Validation failed.')).toBeInTheDocument();
    expect(screen.getByText('Field A is required')).toBeInTheDocument();
    expect(screen.getByText('Field B has invalid format')).toBeInTheDocument();
  });

  it('renders with "inline" variant', () => {
    render(<ErrorMessage error="Inline error" variant="inline" />);
    expect(screen.getByText('Inline error')).toHaveClass('text-red-600');
    expect(screen.getByText('Inline error').closest('div')).not.toHaveClass('bg-red-50'); // Should not have default bg
  });

  it('renders with "banner" variant', () => {
    render(<ErrorMessage error="Banner error" variant="banner" />);
    expect(screen.getByText('Banner error')).toHaveClass('text-white');
    expect(screen.getByText('Banner error').closest('div')).toHaveClass('bg-red-600');
  });

  it('does not show icon when showIcon is false', () => {
    render(<ErrorMessage error="No icon" showIcon={false} />);
    expect(screen.queryByRole('img', { hidden: true })).not.toBeInTheDocument(); // Assuming the SVG icon is an img role
  });

  it('calls onRetry when "Try Again" button is clicked', () => {
    const mockOnRetry = vitest.fn();
    render(<ErrorMessage error="Error with retry" onRetry={mockOnRetry} />);
    fireEvent.click(screen.getByRole('button', { name: 'Try Again' }));
    expect(mockOnRetry).toHaveBeenCalledTimes(1);
  });

  it('calls onDismiss when "Dismiss" button is clicked (from actions)', () => {
    const mockOnDismiss = vitest.fn();
    render(<ErrorMessage error="Error with dismiss" onDismiss={mockOnDismiss} />);
    fireEvent.click(screen.getByRole('button', { name: 'Dismiss' }));
    expect(mockOnDismiss).toHaveBeenCalledTimes(1);
  });

  it('calls onDismiss when "X" button is clicked (top right)', () => {
    const mockOnDismiss = vitest.fn();
    render(<ErrorMessage error="Error with dismiss" onDismiss={mockOnDismiss} />);
    fireEvent.click(screen.getByLabelText('Dismiss')); // Accessible label for the X button
    expect(mockOnDismiss).toHaveBeenCalledTimes(1);
  });

  it('does not render action buttons if onRetry and onDismiss are not provided', () => {
    render(<ErrorMessage error="No actions" />);
    expect(screen.queryByRole('button', { name: 'Try Again' })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Dismiss' })).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Dismiss')).not.toBeInTheDocument();
  });
});
