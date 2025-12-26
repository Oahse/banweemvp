// frontend/src/components/supplier/SupplierOrderDashboard.test.tsx
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { describe, it, expect, vitest, beforeEach } from 'vitest';
import SupplierOrderDashboard from './SupplierOrderDashboard';
import { usePaginatedApi } from '../../hooks/useApi';
import { OrdersAPI } from '../../apis';
import OrderDetails from '../order/OrderDetails';
import { format } from 'date-fns';

// Mock custom hooks and API
vitest.mock('../../hooks/useApi', () => ({
  usePaginatedApi: vitest.fn(),
}));

vitest.mock('../../apis', () => ({
  OrdersAPI: {
    getSupplierOrders: vitest.fn(),
    updateOrderStatus: vitest.fn(),
    addOrderNote: vitest.fn(),
  },
}));

// Mock OrderDetails component
vitest.mock('../order/OrderDetails', () => ({
  __esModule: true,
  default: vitest.fn(() => <div data-testid="mock-order-details">Mock Order Details</div>),
}));

// Mock date-fns format
vitest.mock('date-fns', () => ({
  format: vitest.fn((date, formatStr) => `mocked-date-${formatStr}`),
}));

describe('SupplierOrderDashboard Component', () => {
  const mockUsePaginatedApi = usePaginatedApi as vitest.Mock;
  const mockGetSupplierOrders = OrdersAPI.getSupplierOrders as vitest.Mock;
  const mockUpdateOrderStatus = OrdersAPI.updateOrderStatus as vitest.Mock;
  const mockAddOrderNote = OrdersAPI.addOrderNote as vitest.Mock;
  const mockOrderDetails = OrderDetails as vitest.Mock;

  const mockPaginatedOrders = {
    data: [
      { id: 'order-1', user_id: 'user-a', status: 'Pending', total_amount: 100, currency: '$', created_at: new Date().toISOString(), items: [{ id: 'item1', name: 'Product 1' }] },
      { id: 'order-2', user_id: 'user-b', status: 'Processing', total_amount: 200, currency: '$', created_at: new Date().toISOString(), items: [{ id: 'item2', name: 'Product 2' }] },
    ],
    pagination: { total: 2, limit: 10, offset: 0 },
  };

  const mockFetchOrders = vitest.fn();

  beforeEach(() => {
    vitest.clearAllMocks();
    mockUsePaginatedApi.mockReturnValue({
      data: mockPaginatedOrders,
      loading: false,
      error: null,
      execute: mockFetchOrders,
    });
    // Default mocks for API calls
    mockGetSupplierOrders.mockResolvedValue(mockPaginatedOrders);
    mockUpdateOrderStatus.mockResolvedValue({ success: true });
    mockAddOrderNote.mockResolvedValue({ success: true });
    mockOrderDetails.mockImplementation(({ order, onStatusUpdate, onAddNote, ...props }) => (
      <div data-testid="mock-order-details">
        Order ID: {order.id}
        <button onClick={() => onStatusUpdate(order.id, 'Delivered')} data-testid="mock-status-update-btn">Update Status</button>
        <button onClick={() => onAddNote('Test Note')} data-testid="mock-add-note-btn">Add Note</button>
      </div>
    ));
    format.mockReturnValue('mocked-date-MMM dd, yyyy'); // Simplify date formatting
  });

  it('renders loading spinner when data is loading', () => {
    mockUsePaginatedApi.mockReturnValueOnce({
      data: null, loading: true, error: null, execute: mockFetchOrders,
    });
    render(<SupplierOrderDashboard />);
    expect(screen.getByRole('status', { name: 'Loading' })).toBeInTheDocument();
  });

  it('renders error message when there is an error', () => {
    mockUsePaginatedApi.mockReturnValueOnce({
      data: null, loading: false, error: new Error('Failed to fetch orders'), execute: mockFetchOrders,
    });
    render(<SupplierOrderDashboard />);
    expect(screen.getByText('Error: Failed to fetch orders')).toBeInTheDocument();
  });

  it('renders order data in the table', () => {
    render(<SupplierOrderDashboard />);
    expect(screen.getByText('Order Management')).toBeInTheDocument();
    expect(screen.getByText('#order-1'.slice(-8))).toBeInTheDocument();
    expect(screen.getByText('Pending')).toBeInTheDocument();
    expect(screen.getByText('Processing')).toBeInTheDocument();
  });

  it('updates filters and re-fetches orders when filter changes', async () => {
    render(<SupplierOrderDashboard />);
    const statusSelect = screen.getByLabelText('Status');
    fireEvent.change(statusSelect, { target: { value: 'Shipped' } });

    await waitFor(() => {
      expect(mockFetchOrders).toHaveBeenCalledWith(expect.any(Function));
      // Verify that the function passed to execute would query with the new status
      const executeFn = mockFetchOrders.mock.calls[0][0];
      const result = executeFn();
      expect(mockGetSupplierOrders).toHaveBeenCalledWith({ status: 'Shipped', date_from: undefined, date_to: undefined });
    });
  });

  it('clears filters and re-fetches orders', async () => {
    render(<SupplierOrderDashboard />);
    const statusSelect = screen.getByLabelText('Status');
    fireEvent.change(statusSelect, { target: { value: 'Shipped' } }); // Set a filter first

    fireEvent.click(screen.getByRole('button', { name: 'Clear Filters' }));

    await waitFor(() => {
      expect(mockFetchOrders).toHaveBeenCalledWith(expect.any(Function));
      const executeFn = mockFetchOrders.mock.calls[1][0]; // Second call to execute
      executeFn();
      expect(mockGetSupplierOrders).toHaveBeenCalledWith({ status: undefined, date_from: undefined, date_to: undefined });
    });
  });

  it('selects and deselects individual orders', async () => {
    render(<SupplierOrderDashboard />);
    const order1Checkbox = screen.getByLabelText('Select order order-1'); // Assuming an implicit ARIA label
    const order2Checkbox = screen.getByLabelText('Select order order-2');

    fireEvent.click(order1Checkbox);
    expect(order1Checkbox).toBeChecked();
    expect(screen.getByText('1 orders selected')).toBeInTheDocument();

    fireEvent.click(order2Checkbox);
    expect(order2Checkbox).toBeChecked();
    expect(screen.getByText('2 orders selected')).toBeInTheDocument();

    fireEvent.click(order1Checkbox);
    expect(order1Checkbox).not.toBeChecked();
    expect(screen.getByText('1 orders selected')).toBeInTheDocument();
  });

  it('selects/deselects all orders', async () => {
    render(<SupplierOrderDashboard />);
    const selectAllCheckbox = screen.getByLabelText('Select all orders');

    // Select all
    fireEvent.click(selectAllCheckbox);
    expect(selectAllCheckbox).toBeChecked();
    expect(screen.getByText('2 orders selected')).toBeInTheDocument();

    // Deselect all
    fireEvent.click(selectAllCheckbox);
    expect(selectAllCheckbox).not.toBeChecked();
    expect(screen.queryByText('orders selected')).not.toBeInTheDocument();
  });

  it('performs bulk action and updates orders', async () => {
    render(<SupplierOrderDashboard />);
    fireEvent.click(screen.getByLabelText('Select all orders')); // Select all

    const bulkActionSelect = screen.getByRole('combobox', { name: /choose action/i });
    fireEvent.change(bulkActionSelect, { target: { value: 'Shipped' } });
    
    fireEvent.click(screen.getByRole('button', { name: 'Apply' }));

    await waitFor(() => {
      expect(mockUpdateOrderStatus).toHaveBeenCalledWith('order-1', { status: 'Shipped' });
      expect(mockUpdateOrderStatus).toHaveBeenCalledWith('order-2', { status: 'Shipped' });
      expect(mockFetchOrders).toHaveBeenCalledTimes(2); // Initial fetch + re-fetch after bulk action
      expect(screen.queryByText('orders selected')).not.toBeInTheDocument(); // Selection cleared
    });
  });

  it('opens order details modal when "View Details" is clicked', async () => {
    render(<SupplierOrderDashboard />);
    fireEvent.click(screen.getByRole('button', { name: 'View Details' }));

    await waitFor(() => {
      expect(screen.getByTestId('mock-order-details')).toBeInTheDocument();
      expect(OrderDetails).toHaveBeenCalledWith(
        expect.objectContaining({ order: mockPaginatedOrders.data[0] }),
        {}
      );
    });
  });

  it('calls handleStatusUpdate from OrderDetails mock', async () => {
    render(<SupplierOrderDashboard />);
    fireEvent.click(screen.getByRole('button', { name: 'View Details' }));
    
    // Simulate updating status from inside the mocked OrderDetails component
    const updateStatusBtn = await screen.findByTestId('mock-status-update-btn');
    fireEvent.click(updateStatusBtn);

    await waitFor(() => {
      expect(mockUpdateOrderStatus).toHaveBeenCalledWith('order-1', { status: 'Delivered' });
      expect(mockFetchOrders).toHaveBeenCalledTimes(2); // Re-fetch orders after status update
    });
  });

  it('calls handleAddNote from OrderDetails mock', async () => {
    render(<SupplierOrderDashboard />);
    fireEvent.click(screen.getByRole('button', { name: 'View Details' }));
    
    // Simulate adding note from inside the mocked OrderDetails component
    const addNoteBtn = await screen.findByTestId('mock-add-note-btn');
    fireEvent.click(addNoteBtn);

    await waitFor(() => {
      expect(mockAddOrderNote).toHaveBeenCalledWith('order-1', 'Test Note');
      expect(mockFetchOrders).toHaveBeenCalledTimes(2); // Re-fetch orders after adding note
    });
  });
});
