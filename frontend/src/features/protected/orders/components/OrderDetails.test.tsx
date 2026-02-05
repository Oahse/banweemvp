// frontend/src/components/order/OrderDetails.test.tsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vitest, beforeEach } from 'vitest';
import OrderDetails from './OrderDetails'; // Default export
import * as dateFns from 'date-fns'; // Mocked
import TrackingTimeline from './TrackingTimeline';
import TrackingMap from './TrackingMap';
import OrderNotes from './OrderNotes';

// --- Mock external dependencies ---
vitest.mock('date-fns', () => ({
  format: vitest.fn((date, formatStr) => `mocked-date-${formatStr}`),
}));

vitest.mock('./TrackingTimeline', () => ({
  __esModule: true,
  default: vitest.fn(() => <div data-testid="mock-tracking-timeline">Mock Tracking Timeline</div>),
}));
vitest.mock('./TrackingMap', () => ({
  __esModule: true,
  default: vitest.fn(() => <div data-testid="mock-tracking-map">Mock Tracking Map</div>),
}));
vitest.mock('./OrderNotes', () => ({
  __esModule: true,
  default: vitest.fn(() => <div data-testid="mock-order-notes">Mock Order Notes</div>),
}));

describe('OrderDetails Component', () => {
  const mockOrder = {
    id: 'ord-1234567890',
    created_at: new Date().toISOString(),
    status: 'Pending',
    tracking_number: 'TRK987654321',
    estimated_delivery: new Date(Date.now() + 86400000 * 3).toISOString(), // 3 days from now
    currency: '$',
    total_amount: 150.00,
    items: [
      { id: 'item-1', product_id: 'prod-A', quantity: 2, price_per_unit: 50.00, total_price: 100.00 },
      { id: 'item-2', product_id: 'prod-B', quantity: 1, price_per_unit: 50.00, total_price: 50.00 },
    ],
    tracking_events: [
      { id: 'te-1', carrier: 'FedEx', status: 'In Transit', coordinates: [34.0522, -118.2437], timestamp: new Date().toISOString() },
    ],
    notes: [
      { id: 'note-1', content: 'Customer requested faster shipping', created_at: new Date().toISOString(), user_id: 'user-1' },
    ],
    shipping_address: { street: '123 Main St', city: 'Anytown' },
  };

  const mockOnAddNote = vitest.fn();
  const mockOnStatusUpdate = vitest.fn();

  beforeEach(() => {
    vitest.clearAllMocks();
  });

  it('renders order header information', () => {
    render(
      <OrderDetails
        order={mockOrder}
        onAddNote={mockOnAddNote}
        onStatusUpdate={mockOnStatusUpdate}
      />
    );
    expect(screen.getByText('Order #...90')).toBeInTheDocument(); // Sliced ID
    expect(screen.getByText('Placed on mocked-date-MMM dd, yyyy')).toBeInTheDocument();
    expect(screen.getByText('Pending')).toBeInTheDocument();
    expect(screen.getByText('Tracking: TRK987654321')).toBeInTheDocument();
  });

  it('displays status update dropdown when editable is true', () => {
    render(
      <OrderDetails
        order={mockOrder}
        editable={true}
        onAddNote={mockOnAddNote}
        onStatusUpdate={mockOnStatusUpdate}
      />
    );
    expect(screen.getByLabelText('Update Status:')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toHaveValue('Pending');
  });

  it('calls onStatusUpdate when status dropdown changes', async () => {
    render(
      <OrderDetails
        order={mockOrder}
        editable={true}
        onAddNote={mockOnAddNote}
        onStatusUpdate={mockOnStatusUpdate}
      />
    );
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'Shipped' } });
    await waitFor(() => {
      expect(mockOnStatusUpdate).toHaveBeenCalledWith(mockOrder.id, 'Shipped');
    });
  });

  it('shows "Updating..." status and disables dropdown during status update', async () => {
    mockOnStatusUpdate.mockImplementationOnce(() => new Promise((resolve) => setTimeout(resolve, 100)));
    render(
      <OrderDetails
        order={mockOrder}
        editable={true}
        onAddNote={mockOnAddNote}
        onStatusUpdate={mockOnStatusUpdate}
      />
    );
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'Shipped' } });
    expect(screen.getByText('Updating...')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeDisabled();
    await act(() => new Promise((resolve) => setTimeout(resolve, 100))); // Wait for promise to resolve
    expect(screen.queryByText('Updating...')).not.toBeInTheDocument();
    expect(screen.getByRole('combobox')).not.toBeDisabled();
  });

  it('renders order summary and items in "Order Details" tab', () => {
    render(
      <OrderDetails
        order={mockOrder}
        onAddNote={mockOnAddNote}
        onStatusUpdate={mockOnStatusUpdate}
      />
    );
    expect(screen.getByText('Order Summary')).toBeInTheDocument();
    expect(screen.getByText('Subtotal')).toBeInTheDocument();
    expect(screen.getByText('$150.00')).toBeInTheDocument();
    expect(screen.getByText('Items (2)')).toBeInTheDocument();
    expect(screen.getByText('Product ID: prod-A')).toBeInTheDocument();
    expect(screen.getByText('Quantity: 2')).toBeInTheDocument();
  });

  it('switches to "Tracking" tab and renders TrackingTimeline and TrackingMap', () => {
    render(
      <OrderDetails
        order={mockOrder}
        showTracking={true}
        onAddNote={mockOnAddNote}
        onStatusUpdate={mockOnStatusUpdate}
      />
    );
    fireEvent.click(screen.getByRole('button', { name: 'Tracking (1)' }));
    expect(screen.getByTestId('mock-tracking-timeline')).toBeInTheDocument();
    expect(screen.getByTestId('mock-tracking-map')).toBeInTheDocument();
  });

  it('does not show "Tracking" tab if showTracking is false', () => {
    render(
      <OrderDetails
        order={mockOrder}
        showTracking={false}
        onAddNote={mockOnAddNote}
        onStatusUpdate={mockOnStatusUpdate}
      />
    );
    expect(screen.queryByRole('button', { name: 'Tracking (1)' })).not.toBeInTheDocument();
  });

  it('switches to "Notes" tab and renders OrderNotes', () => {
    render(
      <OrderDetails
        order={mockOrder}
        onAddNote={mockOnAddNote}
        onStatusUpdate={mockOnStatusUpdate}
      />
    );
    fireEvent.click(screen.getByRole('button', { name: 'Notes (1)' }));
    expect(screen.getByTestId('mock-order-notes')).toBeInTheDocument();
    expect(OrderNotes).toHaveBeenCalledWith(
      expect.objectContaining({
        orderId: mockOrder.id,
        notes: mockOrder.notes,
        onAddNote: mockOnAddNote,
        editable: false, // Default editable prop
      }),
      {}
    );
  });
});
