// frontend/src/components/ui/NotificationToast.test.tsx
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import { describe, it, expect, vitest, beforeEach, afterEach } from 'vitest';
import { NotificationToast, NotificationContainer } from './NotificationToast';

// Mock framer-motion components
vitest.mock('framer-motion', () => ({
  motion: {
    div: vitest.fn((props) => <div {...props} data-testid="motion-div">{props.children}</div>),
  },
  AnimatePresence: vitest.fn((props) => <div>{props.children}</div>),
}));

// Mock lucide-react icons
vitest.mock('lucide-react', () => ({
  CheckCircleIcon: vitest.fn(() => <svg data-testid="check-circle-icon" />),
  XCircleIcon: vitest.fn(() => <svg data-testid="x-circle-icon" />),
  AlertTriangleIcon: vitest.fn(() => <svg data-testid="alert-triangle-icon" />),
  InfoIcon: vitest.fn(() => <svg data-testid="info-icon" />),
  XIcon: vitest.fn(() => <svg data-testid="x-icon" />),
}));


describe('NotificationToast Component', () => {
  const mockOnClose = vitest.fn();
  const mockOnAction = vitest.fn();

  beforeEach(() => {
    vitest.clearAllMocks();
    vitest.useFakeTimers(); // Enable fake timers
  });

  afterEach(() => {
    vitest.useRealTimers(); // Restore real timers
  });

  it('renders a success notification with title and message', () => {
    const notification = { id: '1', type: 'success', title: 'Success!', message: 'Operation completed.' };
    render(<NotificationToast notification={notification} onClose={mockOnClose} />);

    expect(screen.getByText('Success!')).toBeInTheDocument();
    expect(screen.getByText('Operation completed.')).toBeInTheDocument();
    expect(screen.getByTestId('check-circle-icon')).toBeInTheDocument();
    expect(screen.getByTestId('motion-div')).toHaveClass('bg-green-50');
  });

  it('renders an error notification with correct styling and icon', () => {
    const notification = { id: '2', type: 'error', title: 'Error!', message: 'Something went wrong.' };
    render(<NotificationToast notification={notification} onClose={mockOnClose} />);

    expect(screen.getByText('Error!')).toBeInTheDocument();
    expect(screen.getByTestId('x-circle-icon')).toBeInTheDocument();
    expect(screen.getByTestId('motion-div')).toHaveClass('bg-red-50');
  });

  it('calls onClose when the close button is clicked', () => {
    const notification = { id: '3', type: 'info', title: 'Info', message: 'Just for your information.' };
    render(<NotificationToast notification={notification} onClose={mockOnClose} />);

    fireEvent.click(screen.getByLabelText('Close'));
    expect(mockOnClose).toHaveBeenCalledWith('3');
  });

  it('calls onClose automatically after duration for non-persistent notifications', async () => {
    const notification = { id: '4', type: 'warning', title: 'Warning', duration: 1000 };
    render(<NotificationToast notification={notification} onClose={mockOnClose} />);

    expect(mockOnClose).not.toHaveBeenCalled();

    act(() => {
      vitest.advanceTimersByTime(1000); // Advance time by duration
    });
    
    // onClose is called after a setTimeout delay of 300ms in handleClose
    await waitFor(() => expect(mockOnClose).toHaveBeenCalledWith('4'), { timeout: 500 });
  });

  it('does not auto-close for persistent notifications', () => {
    const notification = { id: '5', type: 'info', title: 'Persistent', persistent: true, duration: 1000 };
    render(<NotificationToast notification={notification} onClose={mockOnClose} />);

    act(() => {
      vitest.advanceTimersByTime(2000); // Advance time past duration
    });
    expect(mockOnClose).not.toHaveBeenCalled();
  });

  it('renders and triggers action buttons', () => {
    const actionMock = vitest.fn();
    const notification = {
      id: '6',
      type: 'info',
      title: 'Actionable',
      actions: [{ label: 'Click Me', action: actionMock, style: 'primary' }],
    };
    render(<NotificationToast notification={notification} onClose={mockOnClose} onAction={mockOnAction} />);

    const actionButton = screen.getByRole('button', { name: 'Click Me' });
    expect(actionButton).toBeInTheDocument();
    expect(actionButton).toHaveClass('bg-primary');

    fireEvent.click(actionButton);
    expect(mockOnAction).toHaveBeenCalledWith(actionMock);
  });
});

describe('NotificationContainer Component', () => {
  const mockOnClose = vitest.fn();

  beforeEach(() => {
    vitest.clearAllMocks();
    vitest.useFakeTimers();
  });

  afterEach(() => {
    vitest.useRealTimers();
  });

  it('renders without notifications', () => {
    const { container } = render(<NotificationContainer notifications={[]} onClose={mockOnClose} />);
    expect(container).toBeEmptyDOMElement(); // Expecting the inner div to be empty
  });

  it('renders multiple notifications', () => {
    const notifications = [
      { id: '1', type: 'success', title: 'Success' },
      { id: '2', type: 'error', title: 'Error' },
    ];
    render(<NotificationContainer notifications={notifications} onClose={mockOnClose} />);

    expect(screen.getByText('Success')).toBeInTheDocument();
    expect(screen.getByText('Error')).toBeInTheDocument();
  });

  it('limits the number of displayed notifications by maxNotifications', () => {
    const notifications = [
      { id: '1', type: 'info', title: 'Notification 1' },
      { id: '2', type: 'info', title: 'Notification 2' },
      { id: '3', type: 'info', title: 'Notification 3' },
      { id: '4', type: 'info', title: 'Notification 4' },
      { id: '5', type: 'info', title: 'Notification 5' },
      { id: '6', type: 'info', title: 'Notification 6' },
    ];
    render(<NotificationContainer notifications={notifications} onClose={mockOnClose} maxNotifications={3} />);

    expect(screen.getByText('Notification 1')).toBeInTheDocument();
    expect(screen.getByText('Notification 2')).toBeInTheDocument();
    expect(screen.getByText('Notification 3')).toBeInTheDocument();
    expect(screen.queryByText('Notification 4')).not.toBeInTheDocument();
    expect(screen.queryByText('Notification 5')).not.toBeInTheDocument();
    expect(screen.queryByText('Notification 6')).not.toBeInTheDocument();
  });

  it('applies correct position classes', () => {
    const notifications = [{ id: '1', type: 'info', title: 'Test' }];
    const { rerender } = render(<NotificationContainer notifications={notifications} onClose={mockOnClose} position="top-left" />);
    expect(screen.getByText('Test').closest('div')).toHaveClass('top-4', 'left-4');

    rerender(<NotificationContainer notifications={notifications} onClose={mockOnClose} position="bottom-right" />);
    expect(screen.getByText('Test').closest('div')).toHaveClass('bottom-4', 'right-4');
  });

  it('renders non-persistent notifications by default', () => {
    const notifications = [{ id: '1', type: 'info', title: 'Transient' }];
    render(<NotificationContainer notifications={notifications} onClose={mockOnClose} />);
    expect(screen.getByText('Transient')).toBeInTheDocument();
  });
});
