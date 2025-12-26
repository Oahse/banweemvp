// frontend/src/components/auth/AddressManager.test.tsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vitest, beforeEach } from 'vitest';
import { AddressManager } from './AddressManager';

// Mock child components
vitest.mock('../ui/Button', () => ({
  Button: vitest.fn((props) => <button {...props} data-testid="mock-button">{props.children}</button>),
}));
vitest.mock('../ui/Input', () => ({
  Input: vitest.fn((props) => (
    <div data-testid={`mock-input-${props.label?.replace(/\s/g, '-')}`}>
      <label htmlFor={props.id}>{props.label}</label>
      <input
        {...props}
        data-testid={`input-${props.label?.toLowerCase().replace(/\s/g, '-')}`}
        value={props.value || ''}
        onChange={(e) => props.onChange(e.target.value)} // Simplified onChange for test
      />
      {props.error && <p data-testid={`input-error-${props.label?.toLowerCase().replace(/\s/g, '-')}`}>{props.error}</p>}
    </div>
  )),
}));
vitest.mock('../ui/Select', () => ({
  Select: vitest.fn((props) => (
    <div data-testid={`mock-select-${props.label?.replace(/\s/g, '-')}`}>
      <label htmlFor={props.id}>{props.label}</label>
      <select
        {...props}
        value={props.value || ''}
        onChange={(e) => props.onChange(e.target.value)} // Simplified onChange for test
      >
        {props.options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {props.error && <p data-testid={`select-error-${props.label?.toLowerCase().replace(/\s/g, '-')}`}>{props.error}</p>}
    </div>
  )),
}));

// Mock lucide-react icons
vitest.mock('lucide-react', () => ({
  PlusIcon: vitest.fn(() => <svg data-testid="icon-plus" />),
  EditIcon: vitest.fn(() => <svg data-testid="icon-edit" />),
  TrashIcon: vitest.fn(() => <svg data-testid="icon-trash" />),
  MapPinIcon: vitest.fn(() => <svg data-testid="icon-map-pin" />),
}));

describe('AddressManager Component', () => {
  const mockAddresses = [
    { id: '1', street: '123 Main St', city: 'Anytown', state: 'NY', country: 'US', post_code: '12345', kind: 'Shipping' },
    { id: '2', street: '456 Oak Ave', city: 'Otherville', state: 'CA', country: 'US', post_code: '67890', kind: 'Billing' },
  ];
  const mockOnAdd = vitest.fn();
  const mockOnUpdate = vitest.fn();
  const mockOnDelete = vitest.fn();

  beforeEach(() => {
    vitest.clearAllMocks();
  });

  it('renders "No addresses added yet" when addresses array is empty', () => {
    render(<AddressManager addresses={[]} onAdd={mockOnAdd} onUpdate={mockOnUpdate} onDelete={mockOnDelete} />);
    expect(screen.getByText('No addresses added yet')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Add Address' })).toBeInTheDocument();
  });

  it('renders existing addresses', () => {
    render(<AddressManager addresses={mockAddresses} onAdd={mockOnAdd} onUpdate={mockOnUpdate} onDelete={mockOnDelete} />);
    expect(screen.getByText('123 Main St')).toBeInTheDocument();
    expect(screen.getByText('Anytown, NY 12345')).toBeInTheDocument();
    expect(screen.getByText('Shipping')).toBeInTheDocument();
    expect(screen.getByText('456 Oak Ave')).toBeInTheDocument();
    expect(screen.getByText('Billing')).toBeInTheDocument();
  });

  it('shows add address form when "Add Address" button is clicked', () => {
    render(<AddressManager addresses={[]} onAdd={mockOnAdd} onUpdate={mockOnUpdate} onDelete={mockOnDelete} />);
    fireEvent.click(screen.getByRole('button', { name: 'Add Address' }));
    expect(screen.getByText('Add New Address')).toBeInTheDocument();
    expect(screen.getByLabelText('Street Address')).toBeInTheDocument();
  });

  it('calls onAdd with new address data on form submission', async () => {
    render(<AddressManager addresses={[]} onAdd={mockOnAdd} onUpdate={mockOnUpdate} onDelete={mockOnDelete} />);
    fireEvent.click(screen.getByRole('button', { name: 'Add Address' }));

    fireEvent.change(screen.getByLabelText('Address Type').closest('div')!.querySelector('select')!, { target: { value: 'Shipping' } });
    fireEvent.change(screen.getByLabelText('Street Address').closest('div')!.querySelector('input')!, { target: { value: '789 Pine Ln' } });
    fireEvent.change(screen.getByLabelText('City').closest('div')!.querySelector('input')!, { target: { value: 'Villagetown' } });
    fireEvent.change(screen.getByLabelText('State/Province').closest('div')!.querySelector('input')!, { target: { value: 'GA' } });
    fireEvent.change(screen.getByLabelText('Country').closest('div')!.querySelector('select')!, { target: { value: 'US' } });
    fireEvent.change(screen.getByLabelText('Postal Code').closest('div')!.querySelector('input')!, { target: { value: '30303' } });

    fireEvent.click(screen.getByRole('button', { name: 'Add Address' }));

    await waitFor(() => {
      expect(mockOnAdd).toHaveBeenCalledWith({
        street: '789 Pine Ln',
        city: 'Villagetown',
        state: 'GA',
        country: 'US',
        post_code: '30303',
        kind: 'Shipping',
      });
      expect(screen.queryByText('Add New Address')).not.toBeInTheDocument(); // Form should close
    });
  });

  it('shows validation errors for invalid form submission', async () => {
    render(<AddressManager addresses={[]} onAdd={mockOnAdd} onUpdate={mockOnUpdate} onDelete={mockOnDelete} />);
    fireEvent.click(screen.getByRole('button', { name: 'Add Address' }));

    fireEvent.click(screen.getByRole('button', { name: 'Add Address' })); // Submit empty form

    await waitFor(() => {
      expect(screen.getByTestId('input-error-street-address')).toHaveTextContent('Street address is required');
      expect(screen.getByTestId('select-error-address-type')).toHaveTextContent('Address type is required');
      expect(mockOnAdd).not.toHaveBeenCalled();
    });
  });

  it('pre-fills and calls onUpdate with updated data when editing an address', async () => {
    render(<AddressManager addresses={mockAddresses} onAdd={mockOnAdd} onUpdate={mockOnUpdate} onDelete={mockOnDelete} />);
    fireEvent.click(screen.getAllByTestId('icon-edit')[0].closest('button')!); // Click edit for first address

    expect(screen.getByText('Edit Address')).toBeInTheDocument();
    expect(screen.getByLabelText('Street Address').closest('div')!.querySelector('input')!).toHaveValue('123 Main St');

    fireEvent.change(screen.getByLabelText('Street Address').closest('div')!.querySelector('input')!, { target: { value: 'New Street Name' } });
    fireEvent.click(screen.getByRole('button', { name: 'Update Address' }));

    await waitFor(() => {
      expect(mockOnUpdate).toHaveBeenCalledWith('1', { ...mockAddresses[0], street: 'New Street Name' });
      expect(screen.queryByText('Edit Address')).not.toBeInTheDocument(); // Form should close
    });
  });

  it('calls onDelete when trash icon is clicked', () => {
    render(<AddressManager addresses={mockAddresses} onAdd={mockOnAdd} onUpdate={mockOnUpdate} onDelete={mockOnDelete} />);
    fireEvent.click(screen.getAllByTestId('icon-trash')[0].closest('button')!); // Click trash for first address
    expect(mockOnDelete).toHaveBeenCalledWith('1');
  });

  it('resets form and closes when "Cancel" is clicked', async () => {
    render(<AddressManager addresses={mockAddresses} onAdd={mockOnAdd} onUpdate={mockOnUpdate} onDelete={mockOnDelete} />);
    fireEvent.click(screen.getAllByTestId('icon-edit')[0].closest('button')!); // Open edit form
    
    fireEvent.change(screen.getByLabelText('Street Address').closest('div')!.querySelector('input')!, { target: { value: 'Temporary Change' } });
    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));

    await waitFor(() => {
      expect(screen.queryByText('Edit Address')).not.toBeInTheDocument(); // Form should close
      expect(screen.queryByTestId('input-error-street-address')).not.toBeInTheDocument(); // Errors cleared
      // Verify form data is reset (implicitly, as the form closes)
    });
  });

  it('disables buttons when loading is true', () => {
    render(<AddressManager addresses={mockAddresses} onAdd={mockOnAdd} onUpdate={mockOnUpdate} onDelete={mockOnDelete} loading={true} />);
    expect(screen.getByRole('button', { name: 'Add Address' })).toBeDisabled();
    expect(screen.getAllByTestId('icon-edit')[0].closest('button')).toBeDisabled();
    expect(screen.getAllByTestId('icon-trash')[0].closest('button')).toBeDisabled();
  });
});
