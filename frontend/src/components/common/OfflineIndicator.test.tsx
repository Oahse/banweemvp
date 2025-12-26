// frontend/src/components/common/OfflineIndicator.test.tsx
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { describe, it, expect, vitest, beforeEach, afterEach } from 'vitest';
import { OfflineIndicator } from './OfflineIndicator';
import { WifiOff } from 'lucide-react'; // Mocked icon

// Mock lucide-react icons
vitest.mock('lucide-react', () => ({
  WifiOff: vitest.fn(() => <svg data-testid="wifi-off-icon" />),
}));

describe('OfflineIndicator Component', () => {
  const originalNavigatorOnLine = navigator.onLine;

  beforeEach(() => {
    vitest.clearAllMocks();
    vitest.useFakeTimers(); // Enable fake timers
  });

  afterEach(() => {
    vitest.useRealTimers(); // Restore real timers
    // Restore original navigator.onLine just in case
    Object.defineProperty(navigator, 'onLine', { value: originalNavigatorOnLine, writable: true });
  });

  it('renders "No internet connection" when initially offline', () => {
    Object.defineProperty(navigator, 'onLine', { value: false, writable: true });
    render(<OfflineIndicator />);
    expect(screen.getByText('No internet connection. Please check your network.')).toBeInTheDocument();
    expect(screen.getByTestId('wifi-off-icon')).toBeInTheDocument();
    expect(screen.getByText('No internet connection. Please check your network.').closest('div')).toHaveClass('bg-red-500');
  });

  it('does not render when initially online', () => {
    Object.defineProperty(navigator, 'onLine', { value: true, writable: true });
    const { container } = render(<OfflineIndicator />);
    expect(container).toBeEmptyDOMElement();
  });

  it('shows "No internet connection" when going offline from online state', () => {
    Object.defineProperty(navigator, 'onLine', { value: true, writable: true });
    const { rerender } = render(<OfflineIndicator />);
    expect(screen.queryByText('No internet connection. Please check your network.')).not.toBeInTheDocument();

    Object.defineProperty(navigator, 'onLine', { value: false, writable: true });
    act(() => {
      window.dispatchEvent(new Event('offline'));
    });
    rerender(<OfflineIndicator />); // Rerender to reflect state change

    expect(screen.getByText('No internet connection. Please check your network.')).toBeInTheDocument();
    expect(screen.getByTestId('wifi-off-icon')).toBeInTheDocument();
    expect(screen.getByText('No internet connection. Please check your network.').closest('div')).toHaveClass('bg-red-500');
  });

  it('shows "Back online" message temporarily when going online from offline state', async () => {
    Object.defineProperty(navigator, 'onLine', { value: false, writable: true });
    render(<OfflineIndicator />);
    
    // Initially offline message is visible
    expect(screen.getByText('No internet connection. Please check your network.')).toBeInTheDocument();

    Object.defineProperty(navigator, 'onLine', { value: true, writable: true });
    act(() => {
      fireEvent(window, new Event('online'));
    });

    // Now it should show "Back online" message with green background
    expect(screen.getByText('✓ Back online')).toBeInTheDocument();
    expect(screen.getByText('✓ Back online').closest('div')).toHaveClass('bg-green-500');

    // Advance timers past the 3-second timeout
    act(() => {
      vitest.advanceTimersByTime(3000);
    });

    await waitFor(() => {
      expect(screen.queryByText('✓ Back online')).not.toBeInTheDocument();
      expect(screen.queryByText('No internet connection. Please check your network.')).not.toBeInTheDocument();
    });
  });
});
