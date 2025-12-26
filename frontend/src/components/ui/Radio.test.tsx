// frontend/src/components/ui/Radio.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vitest } from 'vitest';
import { Radio } from './Radio';

describe('Radio Component', () => {
  it('renders without crashing', () => {
    render(<Radio />);
    expect(screen.getByRole('radio')).toBeInTheDocument();
  });

  it('renders with a label', () => {
    render(<Radio label="Select me" id="radio-select" />);
    expect(screen.getByLabelText(/select me/i)).toBeInTheDocument();
  });

  it('toggles its state when clicked', () => {
    render(<Radio label="Toggle me" id="radio-toggle" />);
    const radio = screen.getByLabelText(/toggle me/i) as HTMLInputElement;

    expect(radio.checked).toBe(false); // Initial state

    fireEvent.click(radio);
    expect(radio.checked).toBe(true); // After first click
  });

  it('calls onChange handler when clicked', () => {
    const handleChange = vitest.fn();
    render(<Radio label="Clickable" id="radio-clickable" onChange={handleChange} />);
    const radio = screen.getByLabelText(/clickable/i);

    fireEvent.click(radio);
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('can be initially checked', () => {
    render(<Radio label="Initially checked" id="radio-initial" defaultChecked />);
    const radio = screen.getByLabelText(/initially checked/i) as HTMLInputElement;
    expect(radio.checked).toBe(true);
  });
});
