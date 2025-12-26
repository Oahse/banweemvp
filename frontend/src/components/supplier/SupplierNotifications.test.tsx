// frontend/src/components/supplier/SupplierNotifications.test.tsx
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { describe, it, expect, vitest, beforeEach, afterEach } from 'vitest';
import SupplierNotifications from './SupplierNotifications'; // Default export
import { useApi } from '../../hooks/useApi';
import { NotificationsAPI } from '../../apis/notifications';
import { format } from 'date-fns'; // Mocked
import { BrowserRouter, Link } from 'react-router-dom'; // Mocked Link and BrowserRouter

// Mock custom hook and API
vitest.mock('../../hooks/useApi', () => ({
  useApi: vitest.fn(),
}));

vitest.mock('../../apis/notifications', () => ({
  NotificationsAPI: {
    getNotifications: vitest.fn(),
    markAsRead: vitest.fn(),
    markAllAsRead: vitest.fn(),
  },
}));

vitest.mock('date-fns', () => ({
  format: vitest.fn((date, formatStr) => `mocked-${formatStr}`),
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

// Helper to render with BrowserRouter context
const renderWithRouter = (ui) => render(<BrowserRouter>{ui}</BrowserRouter>);

describe('SupplierNotifications Component', () => {
  const mockUseApi = useApi as vitest.Mock;
  const mockGetNotifications = NotificationsAPI.getNotifications as vitest.Mock;
  const mockMarkAsRead = NotificationsAPI.markAsRead as vitest.Mock;
  const mockMarkAllAsRead = NotificationsAPI.markAllAsRead as vitest.Mock;
  const mockFormat = format as vitest.Mock;
  const mockOnNotificationClick = vitest.fn();

  const mockNotifications = [
    { id: '1', type: 'order_update', title: 'Order #123 Updated', message: 'Status changed to processing.', read: false, created_at: new Date().toISOString(), data: { orderId: '123' } },
    { id: '2', type: 'system', title: 'System Alert', message: 'Maintenance scheduled.', read: true, created_at: new Date(Date.now() - 3600000).toISOString() }, // 1 hour ago
    { id: '3', type: 'order_update', title: 'New Order #456', message: 'A new order has been placed.', read: false, created_at: new Date(Date.now() - 86400000).toISOString(), data: { orderId: '456' } }, // 1 day ago
  ];

  beforeEach(() => {
    vitest.clearAllMocks();
    mockUseApi.mockReturnValue({
      data: mockNotifications,
      loading: false,
      error: null,
      execute: vitest.fn(() => Promise.resolve({ success: true, data: mockNotifications })),
      setData: vitest.fn(), // Provide setData mock
    });
    mockGetNotifications.mockResolvedValue({ success: true, data: mockNotifications });
    mockMarkAsRead.mockResolvedValue({ success: true });
    mockMarkAllAsRead.mockResolvedValue({ success: true });
    mockFormat.mockReturnValue('mocked-date'); // Simplified date format
  });

  it('renders notification bell with unread count', async () => {
    renderWithRouter(<SupplierNotifications />);
    expect(screen.getByText('🔔')).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText('2')).toBeInTheDocument(); // 2 unread notifications
    });
  });

  it('does not show unread count if none', async () => {
    mockUseApi.mockReturnValue({
      data: [{ ...mockNotifications[0], read: true }, { ...mockNotifications[1], read: true }],
      loading: false,
      error: null,
      execute: vitest.fn(() => Promise.resolve({ success: true, data: [] })),
      setData: vitest.fn(),
    });
    renderWithRouter(<SupplierNotifications />);
    await waitFor(() => {
      expect(screen.queryByText('2')).not.toBeInTheDocument();
    });
  });

  it('opens and closes dropdown on bell click', async () => {
    renderWithRouter(<SupplierNotifications />);
    const bellButton = screen.getByText('🔔');

    fireEvent.click(bellButton); // Open
    expect(screen.getByText('Notifications')).toBeInTheDocument();
    expect(screen.getByText('Order #123 Updated')).toBeInTheDocument();

    fireEvent.click(bellButton); // Close
    await waitFor(() => {
      expect(screen.queryByText('Notifications')).not.toBeInTheDocument();
    });
  });

  it('closes dropdown on clicking the "✕" button', async () => {
    renderWithRouter(<SupplierNotifications />);
    fireEvent.click(screen.getByText('🔔')); // Open
    fireEvent.click(screen.getByText('✕')); // Close button
    await waitFor(() => {
      expect(screen.queryByText('Notifications')).not.toBeInTheDocument();
    });
  });

  it('closes dropdown on clicking outside', async () => {
    renderWithRouter(<SupplierNotifications />);
    fireEvent.click(screen.getByText('🔔')); // Open
    expect(screen.getByText('Notifications')).toBeInTheDocument();

    fireEvent.mouseDown(document.body); // Click outside
    await waitFor(() => {
      expect(screen.queryByText('Notifications')).not.toBeInTheDocument();
    });
  });

  it('displays loading state in dropdown', async () => {
    mockUseApi.mockReturnValue({
      data: [], loading: true, error: null, execute: vitest.fn(), setData: vitest.fn(),
    });
    renderWithRouter(<SupplierNotifications />);
    fireEvent.click(screen.getByText('🔔')); // Open
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('displays error state in dropdown', async () => {
    mockUseApi.mockReturnValue({
      data: [], loading: false, error: new Error('API Error'), execute: vitest.fn(), setData: vitest.fn(),
    });
    renderWithRouter(<SupplierNotifications />);
    fireEvent.click(screen.getByText('🔔')); // Open
    expect(screen.getByText('Error: API Error')).toBeInTheDocument();
  });

  it('filters notifications by "Unread" tab', async () => {
    renderWithRouter(<SupplierNotifications />);
    fireEvent.click(screen.getByText('🔔')); // Open
    fireEvent.click(screen.getByRole('button', { name: /unread/i }));

    expect(screen.getByText('Order #123 Updated')).toBeInTheDocument();
    expect(screen.getByText('New Order #456')).toBeInTheDocument();
    expect(screen.queryByText('System Alert')).not.toBeInTheDocument();
  });

  it('filters notifications by "Orders" tab', async () => {
    renderWithRouter(<SupplierNotifications />);
    fireEvent.click(screen.getByText('🔔')); // Open
    fireEvent.click(screen.getByRole('button', { name: /orders/i }));

    expect(screen.getByText('Order #123 Updated')).toBeInTheDocument();
    expect(screen.getByText('New Order #456')).toBeInTheDocument();
    expect(screen.queryByText('System Alert')).not.toBeInTheDocument();
  });

  it('marks a single notification as read on click', async () => {
    const mockSetData = vitest.fn(); // Create a dedicated mock for setData
    mockUseApi.mockReturnValue({
      data: mockNotifications,
      loading: false,
      error: null,
      execute: vitest.fn(),
      setData: mockSetData, // Use the dedicated mock here
    });

    renderWithRouter(<SupplierNotifications onNotificationClick={mockOnNotificationClick} />);
    fireEvent.click(screen.getByText('🔔')); // Open dropdown

    const unreadNotification = screen.getByText('Order #123 Updated');
    fireEvent.click(unreadNotification);

    await waitFor(() => {
      expect(mockMarkAsRead).toHaveBeenCalledWith('1');
      expect(mockSetData).toHaveBeenCalledWith(expect.arrayContaining([
        expect.objectContaining({ id: '1', read: true }),
        expect.objectContaining({ id: '2', read: true }), // This would be from the original mockNotifications
        expect.objectContaining({ id: '3', read: false }),
      ]));
      expect(mockOnNotificationClick).toHaveBeenCalledWith(mockNotifications[0]);
      expect(screen.queryByText('Notifications')).not.toBeInTheDocument(); // Dropdown closes
    });
  });

  it('marks all notifications as read', async () => {
    const mockSetData = vitest.fn();
    mockUseApi.mockReturnValue({
      data: mockNotifications,
      loading: false,
      error: null,
      execute: vitest.fn(),
      setData: mockSetData,
    });
    renderWithRouter(<SupplierNotifications />);
    fireEvent.click(screen.getByText('🔔')); // Open dropdown
    await waitFor(() => expect(screen.getByText('Mark all as read')).toBeInTheDocument());
    
    fireEvent.click(screen.getByText('Mark all as read'));

    await waitFor(() => {
      expect(mockMarkAllAsRead).toHaveBeenCalledTimes(1);
      expect(mockSetData).toHaveBeenCalledWith(expect.arrayContaining([
        expect.objectContaining({ id: '1', read: true }),
        expect.objectContaining({ id: '2', read: true }),
        expect.objectContaining({ id: '3', read: true }),
      ]));
      expect(screen.queryByText('2')).not.toBeInTheDocument(); // Unread count gone
    });
  });

  it('displays "No notifications" message if filtered list is empty', async () => {
    mockUseApi.mockReturnValue({
      data: [{ ...mockNotifications[0], read: true }, { ...mockNotifications[1], read: true }, { ...mockNotifications[2], read: true }],
      loading: false,
      error: null,
      execute: vitest.fn(),
      setData: vitest.fn(),
    });
    renderWithRouter(<SupplierNotifications />);
    fireEvent.click(screen.getByText('🔔')); // Open dropdown
    fireEvent.click(screen.getByRole('button', { name: /unread/i })); // Filter to unread

    await waitFor(() => {
      expect(screen.getByText('No unread notifications')).toBeInTheDocument();
    });
  });

  it('displays "View All Notifications" button', async () => {
    renderWithRouter(<SupplierNotifications />);
    fireEvent.click(screen.getByText('🔔')); // Open dropdown
    expect(screen.getByRole('link', { name: 'View All Notifications' })).toHaveAttribute('href', '/account/notifications');
  });
});
