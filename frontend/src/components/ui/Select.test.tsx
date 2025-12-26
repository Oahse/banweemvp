// frontend/src/components/ui/Select.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vitest } from 'vitest';
import { Select } from './Select';

describe('Select Component', () => {
  const options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];

  it('renders without crashing', () => {
    render(<Select options={options} />);
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('renders with a label', () => {
    render(<Select label="Choose an option" options={options} id="select-option" />);
    expect(screen.getByLabelText(/choose an option/i)).toBeInTheDocument();
  });

  it('renders all provided options', () => {
    render(<Select options={options} />);
    options.forEach(option => {
      expect(screen.getByRole('option', { name: option.label })).toBeInTheDocument();
    });
  });

  it('calls onChange handler when a new option is selected', () => {
    const handleChange = vitest.fn();
    render(<Select options={options} onChange={handleChange} />);
    const select = screen.getByRole('combobox');

    fireEvent.change(select, { target: { value: 'option2' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(select).toHaveValue('option2');
  });

  it('displays error message', () => {
    const errorMessage = 'Selection required';
    render(<Select options={options} error={errorMessage} />);
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it('displays helper text', () => {
    const helperText = 'Please select one item from the list';
    render(<Select options={options} helperText={helperText} />);
    expect(screen.getByText(helperText)).toBeInTheDocument();
  });

  it('applies fullWidth class when fullWidth is true', () => {
    render(<Select options={options} fullWidth />);
    const container = screen.getByRole('combobox').closest('div.w-full');
    expect(container).toBeInTheDocument();
  });

  it('sets initial value correctly', () => {
    render(<Select options={options} defaultValue="option2" />);
    const select = screen.getByRole('combobox');
    expect(select).toHaveValue('option2');
  });
});
