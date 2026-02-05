// frontend/src/components/order/TrackingTimeline.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vitest, beforeEach } from 'vitest';
import TrackingTimeline from './TrackingTimeline'; // Default export
import * as dateFns from 'date-fns'; // Mocked

// Mock date-fns format
vitest.mock('date-fns', () => ({
  format: vitest.fn((date, formatStr) => `mocked-date-${formatStr}`),
}));

describe('TrackingTimeline Component', () => {
  const mockTrackingEvents = [
    { id: 'ev1', status: 'Processing', timestamp: new Date('2024-01-15T10:00:00Z').toISOString(), location: 'Warehouse A', carrier: 'Carrier X', description: 'Package being prepared.' },
    { id: 'ev2', status: 'Shipped', timestamp: new Date('2024-01-16T12:00:00Z').toISOString(), location: 'Shipping Hub', carrier: 'Carrier X', description: 'Left facility.' },
    { id: 'ev3', status: 'Out for Delivery', timestamp: new Date('2024-01-17T09:00:00Z').toISOString(), location: 'Local Depot', carrier: 'Carrier Y', description: 'Out for final delivery.' },
    { id: 'ev4', status: 'Delivered', timestamp: new Date('2024-01-17T14:30:00Z').toISOString(), location: 'Customer Address', carrier: 'Carrier Y', description: 'Delivered to recipient.' },
  ];
  const mockCurrentStatus = 'Shipped';
  const mockEstimatedDelivery = new Date('2024-01-18');

  beforeEach(() => {
    vitest.clearAllMocks();
  });

  it('renders order tracking title and estimated delivery date', () => {
    render(
      <TrackingTimeline
        trackingEvents={mockTrackingEvents}
        currentStatus={mockCurrentStatus}
        estimatedDelivery={mockEstimatedDelivery}
      />
    );
    expect(screen.getByText('Order Tracking')).toBeInTheDocument();
    expect(screen.getByText(`Estimated delivery: mocked-date-MMM dd, yyyy`)).toBeInTheDocument();
  });

  it('renders "No tracking information available yet" when trackingEvents is empty', () => {
    render(<TrackingTimeline trackingEvents={[]} currentStatus="Pending" />);
    expect(screen.getByText('No tracking information available yet')).toBeInTheDocument();
  });

  it('renders each tracking event with details', () => {
    render(
      <TrackingTimeline
        trackingEvents={mockTrackingEvents}
        currentStatus={mockCurrentStatus}
        estimatedDelivery={mockEstimatedDelivery}
      />
    );
    expect(screen.getByText('Processing')).toBeInTheDocument(); // Status from event
    expect(screen.getByText('Warehouse A')).toBeInTheDocument(); // Location
    expect(screen.getByText('Carrier: Carrier X')).toBeInTheDocument(); // Carrier
    expect(screen.getByText('Package being prepared.')).toBeInTheDocument(); // Description
    expect(screen.getByText('🚚')).toBeInTheDocument(); // Shipped icon
    expect(screen.getByText('mocked-date-MMM dd, yyyy HH:mm', { selector: 'time' })).toBeInTheDocument(); // Timestamp
  });

  it('applies ring-2 styling to the event matching currentStatus', () => {
    render(
      <TrackingTimeline
        trackingEvents={mockTrackingEvents}
        currentStatus={mockCurrentStatus}
        estimatedDelivery={mockEstimatedDelivery}
      />
    );
    // Check if the "Shipped" event's icon div has the ring class
    const shippedEventIcon = screen.getByText('🚚').closest('div');
    expect(shippedEventIcon).toHaveClass('ring-2', 'ring-blue-500');

    // Other events should not have it
    const processingEventIcon = screen.getByText('⚙️').closest('div');
    expect(processingEventIcon).not.toHaveClass('ring-2');
  });

  it('does not render estimated delivery if not provided', () => {
    render(<TrackingTimeline trackingEvents={mockTrackingEvents} currentStatus={mockCurrentStatus} />);
    expect(screen.queryByText('Estimated delivery:')).not.toBeInTheDocument();
  });

  it('displays correct status icon and color for different statuses', () => {
    const { rerender } = render(<TrackingTimeline trackingEvents={[{ id: 'ev1', status: 'Pending', timestamp: new Date().toISOString(), note: 'test' }]} currentStatus="Pending" />);
    expect(screen.getByText('📋')).toBeInTheDocument();
    expect(screen.getByText('📋').closest('div')).toHaveClass('text-yellow-600', 'bg-yellow-100');

    rerender(<TrackingTimeline trackingEvents={[{ id: 'ev1', status: 'Delivered', timestamp: new Date().toISOString(), note: 'test' }]} currentStatus="Delivered" />);
    expect(screen.getByText('✅')).toBeInTheDocument();
    expect(screen.getByText('✅').closest('div')).toHaveClass('text-green-600', 'bg-green-100');

    rerender(<TrackingTimeline trackingEvents={[{ id: 'ev1', status: 'Cancelled', timestamp: new Date().toISOString(), note: 'test' }]} currentStatus="Cancelled" />);
    expect(screen.getByText('❌')).toBeInTheDocument();
    expect(screen.getByText('❌').closest('div')).toHaveClass('text-red-600', 'bg-red-100');
  });
});
