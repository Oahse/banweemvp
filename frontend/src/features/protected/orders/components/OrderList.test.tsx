// frontend/src/components/order/OrderList.test.tsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vitest, beforeEach } from 'vitest';
import OrderList from './OrderList'; // Default export
import * as dateFns from 'date-fns'; // Mocked

// Mock date-fns format
vitest.mock('date-fns', () => ({
  format: vitest.fn((date, formatStr) => {
    if (formatStr === 'MMM dd, yyyy') {
      return `mocked-date-${date.toISOString().slice(0, 10)}`;
    }
    return `mocked-${formatStr}`;
  }),
}));

describe('OrderList Component', () => {
  const mockOrders = [
    { id: 'ord-10', created_at: new Date('2024-01-10').toISOString(), status: 'Pending', total_amount: 50.00, currency: '$', items: [{}], user_id: 'user-a', tracking_number: 'TRK10' },
    { id: 'ord-20', created_at: new Date('2024-01-20').toISOString(), status: 'Delivered', total_amount: 150.00, currency: '$', items:[{}, {}], user_id: 'user-b', tracking_number: 'TRK20' },
    { id: 'ord-30', created_at: new Date('2024-01-15').toISOString(), status: 'Processing', total_amount: 100.00, currency: '$', items: [{}], user_id: 'user-c' },
    { id: 'ord-40', created_at: new Date('2024-01-05').toISOString(), status: 'Shipped', total_amount: 200.00, currency: '$', items: [{}], user_id: 'user-d' },
    { id: 'ord-50', created_at: new Date('2024-01-25').toISOString(), status: 'Pending', total_amount: 75.00, currency: '$', items: [{}], user_id: 'user-e' },
    { id: 'ord-60', created_at: new Date('2024-01-01').toISOString(), status: 'Cancelled', total_amount: 25.00, currency: '$', items: [{}], user_id: 'user-f' },
    { id: 'ord-70', created_at: new Date('2024-02-01').toISOString(), status: 'Delivered', total_amount: 300.00, currency: '$', items: [{}], user_id: 'user-g' },
    { id: 'ord-80', created_at: new Date('2024-01-22').toISOString(), status: 'Processing', total_amount: 120.00, currency: '$', items: [{}], user_id: 'user-h' },
    { id: 'ord-90', created_at: new Date('2024-01-18').toISOString(), status: 'Shipped', total_amount: 80.00, currency: '$', items: [{}], user_id: 'user-i' },
    { id: 'ord-100', created_at: new Date('2024-01-08').toISOString(), status: 'Pending', total_amount: 190.00, currency: '$', items: [{}], user_id: 'user-j' },
    { id: 'ord-110', created_at: new Date('2024-02-05').toISOString(), status: 'Delivered', total_amount: 160.00, currency: '$', items: [{}], user_id: 'user-k' },
  ]; // 11 orders

  const mockFilters = { status: '', startDate: '', endDate: '', minAmount: 0, maxAmount: 1000 };
  const mockOnFilterChange = vitest.fn();
  const mockOnStatusUpdate = vitest.fn();
  const mockOnOrderSelect = vitest.fn();

  beforeEach(() => {
    vitest.clearAllMocks();
  });

  it('renders loading skeleton when loading is true', () => {
    render(<OrderList orders={[]} loading={true} userRole="customer" filters={mockFilters} onFilterChange={mockOnFilterChange} />);
    expect(screen.getByText('Loading orders...')).toBeInTheDocument(); // Assuming a simple text placeholder
  });
  
  it('renders "No orders found" when orders array is empty', () => {
    render(<OrderList orders={[]} userRole="customer" filters={mockFilters} onFilterChange={mockOnFilterChange} />);
    expect(screen.getByText('No orders have been placed yet.')).toBeInTheDocument();
  });

  it('renders table headers and order data', () => {
    render(<OrderList orders={mockOrders.slice(0, 1)} userRole="customer" filters={mockFilters} onFilterChange={mockOnFilterChange} />);
    expect(screen.getByText('Order ID')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();
    expect(screen.getByText('Amount')).toBeInTheDocument();
    expect(screen.getByText('Items')).toBeInTheDocument();
    expect(screen.getByText('Date')).toBeInTheDocument();
    expect(screen.getByText('Actions')).toBeInTheDocument();

    expect(screen.getByText('#...10')).toBeInTheDocument();
    expect(screen.getByText('Pending')).toBeInTheDocument();
    expect(screen.getByText('$50.00')).toBeInTheDocument();
  });

  it('displays "Customer" column for admin role', () => {
    render(<OrderList orders={mockOrders.slice(0, 1)} userRole="admin" filters={mockFilters} onFilterChange={mockOnFilterChange} />);
    expect(screen.getByText('Customer')).toBeInTheDocument();
    expect(screen.getByText('User ...-a')).toBeInTheDocument();
  });

  it('filters orders by status', () => {
    render(<OrderList orders={mockOrders} userRole="customer" filters={{ ...mockFilters, status: 'Delivered' }} onFilterChange={mockOnFilterChange} />);
    expect(screen.getByText('#...20')).toBeInTheDocument(); // Delivered
    expect(screen.getByText('#...70')).toBeInTheDocument(); // Delivered
    expect(screen.queryByText('#...10')).not.toBeInTheDocument(); // Pending
  });

  it('sorts orders by amount ascending', () => {
    const { rerender } = render(<OrderList orders={mockOrders} userRole="customer" filters={mockFilters} onFilterChange={mockOnFilterChange} />);
    fireEvent.click(screen.getByRole('button', { name: 'Amount ↑' })); // Sort by Amount desc initially
    
    // Clicking again changes to ASC
    rerender(<OrderList orders={mockOrders} userRole="customer" filters={mockFilters} onFilterChange={mockOnFilterChange} />);
    fireEvent.click(screen.getByRole('button', { name: 'Amount ↓' }));

    const orderAmounts = screen.getAllByText(/^\$\d+\.\d{2}$/).map(el => parseFloat(el.textContent!.slice(1)));
    // Expect first page to be sorted by amount ascending
    expect(orderAmounts[0]).toBe(25.00); // ord-60
    expect(orderAmounts[1]).toBe(50.00); // ord-10
  });

  it('paginates orders correctly', () => {
    render(<OrderList orders={mockOrders} userRole="customer" filters={mockFilters} onFilterChange={mockOnFilterChange} />);
    expect(screen.getAllByRole('row').length - 1).toBe(10); // 10 orders + header

    fireEvent.click(screen.getByRole('button', { name: 'Next' }));
    expect(screen.getByText('#...10')).toBeInTheDocument(); // Order on first page
    expect(screen.getByText('#...110')).toBeInTheDocument(); // Order on second page
    expect(screen.queryByText('#...70')).not.toBeInTheDocument(); // Order from first page
  });

  it('calls onOrderSelect when "View" button is clicked', () => {
    render(<OrderList orders={mockOrders.slice(0, 1)} userRole="customer" filters={mockFilters} onFilterChange={mockOnFilterChange} onOrderSelect={mockOnOrderSelect} />);
    fireEvent.click(screen.getByRole('button', { name: 'View' }));
    expect(mockOnOrderSelect).toHaveBeenCalledWith(mockOrders[0]);
  });

  it('allows status update for admin/supplier roles', () => {
    render(<OrderList orders={mockOrders.slice(0, 1)} userRole="admin" filters={mockFilters} onFilterChange={mockOnFilterChange} onStatusUpdate={mockOnStatusUpdate} />);
    const statusSelect = screen.getByRole('combobox', { name: 'Pending' }); // Select for current order
    fireEvent.change(statusSelect, { target: { value: 'Shipped' } });
    expect(mockOnStatusUpdate).toHaveBeenCalledWith(mockOrders[0].id, 'Shipped');
  });

  it('does not allow status update for customer role', () => {
    render(<OrderList orders={mockOrders.slice(0, 1)} userRole="customer" filters={mockFilters} onFilterChange={mockOnFilterChange} onStatusUpdate={mockOnStatusUpdate} />);
    expect(screen.queryByRole('combobox', { name: 'Pending' })).not.toBeInTheDocument();
  });

  it('clears filters when "Clear Filters" button is clicked', () => {
    render(<OrderList orders={mockOrders} userRole="customer" filters={{ ...mockFilters, status: 'Pending' }} onFilterChange={mockOnFilterChange} />);
    fireEvent.click(screen.getByRole('button', { name: 'Clear Filters' }));
    expect(mockOnFilterChange).toHaveBeenCalledWith({});
  });
});
