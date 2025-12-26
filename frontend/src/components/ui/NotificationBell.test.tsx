// frontend/src/components/ui/NotificationBell.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vitest } from 'vitest';
import { BrowserRouter, Link } from 'react-router-dom';
import { NotificationBell } from './NotificationBell';
import { useAuth } from '../../contexts/AuthContext';
import { NotificationAPI } from '../../apis/notification';

// Mock external dependencies
vitest.mock('../../contexts/AuthContext', () => ({
  useAuth: vitest.fn(),
}));

vitest.mock('../../apis/notification', () => ({
  NotificationAPI: {
    getUserNotifications: vitest.fn(),
    getUnreadCount: vitest.fn(),
    markNotificationAsRead: vitest.fn(),
    markAllNotificationsAsRead: vitest.fn(),
    deleteNotification: vitest.fn(),
  },
}));

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

// Mock console.error to avoid polluting test output and check if called
const consoleErrorSpy = vitest.spyOn(console, 'error').mockImplementation(() => {});

describe('NotificationBell Component', () => {
  const mockAuth = useAuth as vitest.Mock;
  const mockGetNotifications = NotificationAPI.getUserNotifications as vitest.Mock;
  const mockGetUnreadCount = NotificationAPI.getUnreadCount as vitest.Mock;
  const mockMarkAsRead = NotificationAPI.markNotificationAsRead as vitest.Mock;
  const mockMarkAllAsRead = NotificationAPI.markAllNotificationsAsRead as vitest.Mock;
  const mockDeleteNotification = NotificationAPI.deleteNotification as vitest.Mock;

  const mockNotifications = [
    { id: '1', type: 'order', message: 'Your order #123 has shipped!', read: false, created_at: new Date().toISOString() },
    { id: '2', type: 'success', message: 'Payment confirmed for item X.', read: true, created_at: new Date(Date.now() - 3600000).toISOString() }, // 1h ago
    { id: '3', type: 'warning', message: 'Low stock on item Y.', read: false, created_at: new Date(Date.now() - 86400000 * 2).toISOString() }, // 2d ago
  ];

  beforeEach(() => {
    vitest.clearAllMocks();
    mockAuth.mockReturnValue({ isAuthenticated: true });
    mockGetNotifications.mockResolvedValue({ success: true, data: { data: mockNotifications } });
    mockGetUnreadCount.mockResolvedValue(2); // Initial unread count for mockNotifications
    consoleErrorSpy.mockClear();
  });

  // Helper to render with BrowserRouter context
  const renderWithRouter = (ui) => render(<BrowserRouter>{ui}</BrowserRouter>);

  it('renders null if user is not authenticated', () => {
    mockAuth.mockReturnValue({ isAuthenticated: false });
    const { container } = renderWithRouter(<NotificationBell />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders bell icon and unread count when authenticated and has unread notifications', async () => {
    renderWithRouter(<NotificationBell />);
    expect(screen.getByLabelText(/notifications/i)).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText('2')).toBeInTheDocument(); // 2 unread notifications
    });
  });

  it('does not render unread count if there are no unread notifications', async () => {
    mockGetUnreadCount.mockResolvedValue(0);
    renderWithRouter(<NotificationBell />);
    expect(screen.getByLabelText(/notifications/i)).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.queryByText('0')).not.toBeInTheDocument();
    });
  });

  it('opens dropdown and fetches notifications on bell icon click', async () => {
    renderWithRouter(<NotificationBell />);
    fireEvent.click(screen.getByLabelText(/notifications/i));
    await waitFor(() => {
      expect(mockGetNotifications).toHaveBeenCalledTimes(1);
      expect(screen.getByText('Your order #123 has shipped!')).toBeInTheDocument();
      expect(screen.getByText('Payment confirmed for item X.')).toBeInTheDocument();
      expect(screen.getByText('Low stock on item Y.')).toBeInTheDocument();
    });
  });

  it('closes dropdown on clicking outside', async () => {
    renderWithRouter(<NotificationBell />);
    fireEvent.click(screen.getByLabelText(/notifications/i)); // Open
    await waitFor(() => expect(screen.getByText('Notifications')).toBeInTheDocument());

    fireEvent.mouseDown(document.body); // Click outside
    await waitFor(() => expect(screen.queryByText('Notifications')).not.toBeInTheDocument());
  });

  it('shows "No notifications yet" message when authenticated but no notifications', async () => {
    mockGetNotifications.mockResolvedValue({ success: true, data: { data: [] } });
    mockGetUnreadCount.mockResolvedValue(0);
    renderWithRouter(<NotificationBell />);
    fireEvent.click(screen.getByLabelText(/notifications/i)); // Open
    await waitFor(() => {
      expect(screen.getByText('No notifications yet')).toBeInTheDocument();
    });
  });

  it('marks a single notification as read', async () => {
    renderWithRouter(<NotificationBell />);
    fireEvent.click(screen.getByLabelText(/notifications/i)); // Open
    await waitFor(() => screen.getByText('Your order #123 has shipped!'));

    const markAsReadButton = screen.getAllByTitle('Mark as read')[0]; // First unread notification
    fireEvent.click(markAsReadButton);

    await waitFor(() => {
      expect(mockMarkAsRead).toHaveBeenCalledWith('1');
      expect(screen.queryByText('1')).not.toBeInTheDocument(); // Unread count decreases
      // Verify visual change (e.g., font weight changes, if implemented and testable)
    });
  });

  it('marks all notifications as read', async () => {
    renderWithRouter(<NotificationBell />);
    fireEvent.click(screen.getByLabelText(/notifications/i)); // Open
    await waitFor(() => screen.getByText('Your order #123 has shipped!'));

    fireEvent.click(screen.getByText('Mark all read'));

    await waitFor(() => {
      expect(mockMarkAllAsRead).toHaveBeenCalledTimes(1);
      expect(screen.queryByText('2')).not.toBeInTheDocument(); // Unread count becomes 0
    });
  });

  it('deletes a notification', async () => {
    renderWithRouter(<NotificationBell />);
    fireEvent.click(screen.getByLabelText(/notifications/i)); // Open
    await waitFor(() => screen.getByText('Your order #123 has shipped!'));

    const deleteButton = screen.getAllByTitle('Delete')[0];
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(mockDeleteNotification).toHaveBeenCalledWith('1');
      expect(screen.queryByText('Your order #123 has shipped!')).not.toBeInTheDocument(); // Notification removed
      expect(screen.getByText('1')).toBeInTheDocument(); // Unread count decreased from 2 to 1
    });
  });

  it('shows loading state', async () => {
    mockGetNotifications.mockReturnValue(new Promise(() => {})); // Never resolve to keep loading state
    renderWithRouter(<NotificationBell />);
    fireEvent.click(screen.getByLabelText(/notifications/i)); // Open
    await waitFor(() => {
      expect(screen.getByText('Loading notifications...')).toBeInTheDocument();
    });
  });

  it('handles API errors gracefully during fetch notifications', async () => {
    mockGetNotifications.mockRejectedValue(new Error('Network error'));
    renderWithRouter(<NotificationBell />);
    fireEvent.click(screen.getByLabelText(/notifications/i)); // Open
    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith('Failed to fetch notifications:', expect.any(Error));
    });
    // Should still show "No notifications yet" or similar if no previous data
    expect(screen.getByText('No notifications yet')).toBeInTheDocument();
  });
});
