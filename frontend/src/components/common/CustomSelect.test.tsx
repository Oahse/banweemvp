// frontend/src/components/common/CustomSelect.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vitest, beforeEach } from 'vitest';
import { CustomSelect } from './CustomSelect';

describe('CustomSelect Component', () => {
  const mockOptions = [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'cherry', label: 'Cherry' },
  ];
  const mockOnChange = vitest.fn();

  beforeEach(() => {
    vitest.clearAllMocks();
  });

  it('renders with placeholder text when no value is selected', () => {
    render(<CustomSelect options={mockOptions} value="" onChange={mockOnChange} placeholder="Choose fruit" />);
    expect(screen.getByRole('button', { name: 'Choose fruit' })).toBeInTheDocument();
  });

  it('renders with the selected option label', () => {
    render(<CustomSelect options={mockOptions} value="banana" onChange={mockOnChange} />);
    expect(screen.getByRole('button', { name: 'Banana' })).toBeInTheDocument();
  });

  it('opens dropdown on button click', () => {
    render(<CustomSelect options={mockOptions} value="" onChange={mockOnChange} />);
    const selectButton = screen.getByRole('button');
    fireEvent.click(selectButton);
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Apple' })).toBeInTheDocument();
  });

  it('closes dropdown on second button click', () => {
    render(<CustomSelect options={mockOptions} value="" onChange={mockOnChange} />);
    const selectButton = screen.getByRole('button');
    fireEvent.click(selectButton); // Open
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    fireEvent.click(selectButton); // Close
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('closes dropdown when clicking outside', () => {
    render(<CustomSelect options={mockOptions} value="" onChange={mockOnChange} />);
    const selectButton = screen.getByRole('button');
    fireEvent.click(selectButton); // Open
    expect(screen.getByRole('listbox')).toBeInTheDocument();

    fireEvent.mouseDown(document.body); // Click outside
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('calls onChange with the correct value when an option is clicked', () => {
    render(<CustomSelect options={mockOptions} value="" onChange={mockOnChange} />);
    const selectButton = screen.getByRole('button');
    fireEvent.click(selectButton); // Open

    fireEvent.click(screen.getByRole('option', { name: 'Cherry' }));
    expect(mockOnChange).toHaveBeenCalledWith('cherry');
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument(); // Should close after selection
  });

  it('has correct accessibility attributes', () => {
    render(<CustomSelect options={mockOptions} value="" onChange={mockOnChange} id="test-select" />);
    const selectButton = screen.getByRole('button');
    expect(selectButton).toHaveAttribute('aria-haspopup', 'listbox');
    expect(selectButton).toHaveAttribute('aria-expanded', 'false'); // Initially closed
    fireEvent.click(selectButton); // Open
    expect(selectButton).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('listbox')).toHaveAttribute('aria-labelledby', 'test-select-label');
  });

  it('renders a hidden required input when required is true', () => {
    render(<CustomSelect options={mockOptions} value="apple" onChange={mockOnChange} required={true} />);
    const hiddenInput = screen.getByRole('textbox', { hidden: true }); // Hidden inputs usually get textbox role
    expect(hiddenInput).toBeInTheDocument();
    expect(hiddenInput).toHaveAttribute('type', 'hidden');
    expect(hiddenInput).toHaveAttribute('required');
    expect(hiddenInput).toHaveValue('apple');
  });
});
