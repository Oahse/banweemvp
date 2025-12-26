// frontend/src/components/common/ErrorBoundary.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vitest, beforeEach, afterEach } from 'vitest';
import ErrorBoundary from './ErrorBoundary';

// Mock console.error to prevent it from cluttering test output and to check its calls
const mockConsoleError = vitest.spyOn(console, 'error').mockImplementation(() => {});

// Mock window.location.reload to prevent actual page reloads
const mockWindowReload = vitest.spyOn(window.location, 'reload').mockImplementation(() => {});

// A component that intentionally throws an error
const BuggyComponent = () => {
  throw new Error('Test error from BuggyComponent');
};

describe('ErrorBoundary Component', () => {
  beforeEach(() => {
    mockConsoleError.mockClear();
    mockWindowReload.mockClear();
  });

  afterAll(() => {
    mockConsoleError.mockRestore(); // Restore original console.error
    mockWindowReload.mockRestore(); // Restore original window.location.reload
  });

  it('renders children normally when no error occurs', () => {
    render(
      <ErrorBoundary>
        <div data-testid="child-content">Normal Content</div>
      </ErrorBoundary>
    );
    expect(screen.getByTestId('child-content')).toBeInTheDocument();
    expect(screen.queryByText('Oops! Something went wrong')).not.toBeInTheDocument();
  });

  it('renders fallback UI when a child component throws an error', () => {
    render(
      <ErrorBoundary>
        <BuggyComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText('Oops! Something went wrong')).toBeInTheDocument();
    expect(screen.getByText('We encountered an unexpected error. Please try reloading the page.')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Reload Page' })).toBeInTheDocument();
  });

  it('logs the error to console.error when an error occurs', () => {
    render(
      <ErrorBoundary>
        <BuggyComponent />
      </ErrorBoundary>
    );
    expect(mockConsoleError).toHaveBeenCalledTimes(1);
    expect(mockConsoleError).toHaveBeenCalledWith(
      'ErrorBoundary caught an error:',
      expect.any(Error),
      expect.objectContaining({ componentStack: expect.any(String) })
    );
    expect(mockConsoleError.mock.calls[0][1].message).toBe('Test error from BuggyComponent');
  });

  it('displays error details when "Error details" is clicked', () => {
    render(
      <ErrorBoundary>
        <BuggyComponent />
      </ErrorBoundary>
    );

    fireEvent.click(screen.getByText('Error details'));
    expect(screen.getByText(/error: test error from buggycomponent/i)).toBeInTheDocument();
  });

  it('calls window.location.reload when "Reload Page" button is clicked', () => {
    render(
      <ErrorBoundary>
        <BuggyComponent />
      </ErrorBoundary>
    );

    fireEvent.click(screen.getByRole('button', { name: 'Reload Page' }));
    expect(mockWindowReload).toHaveBeenCalledTimes(1);
  });
});
