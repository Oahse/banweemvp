// frontend/src/components/order/TrackingMap.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vitest, beforeEach } from 'vitest';
import TrackingMap from './TrackingMap'; // Default export

describe('TrackingMap Component', () => {
  const mockDeliveryAddress = {
    street: '123 Main St',
    city: 'Anytown',
    state: 'NY',
    post_code: '12345',
    country: 'USA',
  };
  const mockCurrentLocation = { lat: 34.052235, lng: -118.243683 };
  const mockRoute = ['point1', 'point2', 'point3'];
  const mockCarrier = 'FedEx';

  beforeEach(() => {
    vitest.clearAllMocks();
  });

  it('renders with placeholder map and "Location tracking..." message when no current location', () => {
    render(<TrackingMap deliveryAddress={mockDeliveryAddress} />);
    expect(screen.getByText('Package Location')).toBeInTheDocument();
    expect(screen.getByText('Interactive Map')).toBeInTheDocument();
    expect(screen.getByText('Map integration would show package location here')).toBeInTheDocument();
    expect(screen.getByText('Location tracking will be available once the package is shipped')).toBeInTheDocument();
  });

  it('renders current location coordinates when provided', () => {
    render(<TrackingMap currentLocation={mockCurrentLocation} deliveryAddress={mockDeliveryAddress} />);
    expect(screen.getByText('Current Location')).toBeInTheDocument();
    expect(screen.getByText('Lat: 34.052235, Lng: -118.243683')).toBeInTheDocument();
    expect(screen.queryByText('Location tracking will be available once the package is shipped')).not.toBeInTheDocument();
  });

  it('renders delivery address correctly', () => {
    render(<TrackingMap deliveryAddress={mockDeliveryAddress} />);
    expect(screen.getByText('Delivery Address')).toBeInTheDocument();
    expect(screen.getByText('123 Main St, Anytown, NY 12345, USA')).toBeInTheDocument();
  });

  it('renders carrier information when provided', () => {
    render(<TrackingMap deliveryAddress={mockDeliveryAddress} carrier={mockCarrier} />);
    expect(screen.getByText(`Carrier: ${mockCarrier}`)).toBeInTheDocument();
  });

  it('renders route information when provided', () => {
    render(<TrackingMap deliveryAddress={mockDeliveryAddress} route={mockRoute} />);
    expect(screen.getByText('Route')).toBeInTheDocument();
    expect(screen.getByText(`${mockRoute.length} waypoints tracked`)).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<TrackingMap deliveryAddress={mockDeliveryAddress} className="custom-map-class" />);
    expect(container.firstChild).toHaveClass('custom-map-class');
  });
});
