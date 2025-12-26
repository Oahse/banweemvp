// frontend/src/components/ui/Checkbox.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vitest } from 'vitest';
import { Checkbox } from './Checkbox'; // Assuming Checkbox component is exported

describe('Checkbox Component', () => {
  it('renders correctly with a label', () => {
    render(<Checkbox label="Remember me" />);
    expect(screen.getByLabelText(/remember me/i)).toBeInTheDocument();
  });

  it('toggles its state when clicked', () => {
    render(<Checkbox label="Toggle me" />);
    const checkbox = screen.getByLabelText(/toggle me/i) as HTMLInputElement;

    expect(checkbox.checked).toBe(false); // Initial state

    fireEvent.click(checkbox);
    expect(checkbox.checked).toBe(true); // After first click

    fireEvent.click(checkbox);
    expect(checkbox.checked).toBe(false); // After second click
  });

  it('can be initially checked', () => {
    render(<Checkbox label="Initially checked" defaultChecked />);
    const checkbox = screen.getByLabelText(/initially checked/i) as HTMLInputElement;
    expect(checkbox.checked).toBe(true);
  });

  it('calls onChange handler when clicked', () => {
    const handleChange = vitest.fn();
    render(<Checkbox label="Clickable" onChange={handleChange} />);
    const checkbox = screen.getByLabelText(/clickable/i);

    fireEvent.click(checkbox);
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(true); // Checkbox is checked
  });
});
