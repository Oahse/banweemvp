// frontend/src/components/ui/Input.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vitest } from 'vitest';
import { Input } from './Input';
import { UserIcon, CheckIcon } from 'lucide-react';

describe('Input Component', () => {
  it('renders without crashing', () => {
    render(<Input />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('renders with a label', () => {
    render(<Input label="Username" id="username" />);
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
  });

  it('displays the initial value', () => {
    render(<Input value="initial_value" onChange={() => {}} />);
    expect(screen.getByDisplayValue(/initial_value/i)).toBeInTheDocument();
  });

  it('updates value on change', () => {
    const handleChange = vitest.fn();
    render(<Input onChange={handleChange} />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'new value' } });
    expect(handleChange).toHaveBeenCalledWith(expect.any(Object));
  });

  it('is disabled when disabled prop is true', () => {
    render(<Input disabled />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('displays error message', () => {
    const errorMessage = 'This field is required';
    render(<Input error={errorMessage} />);
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it('displays success message', () => {
    const successMessage = 'Successfully validated';
    render(<Input success={successMessage} />);
    expect(screen.getByText(successMessage)).toBeInTheDocument();
  });

  it('displays helper text', () => {
    const helperText = 'Some helpful text';
    render(<Input helperText={helperText} />);
    expect(screen.getByText(helperText)).toBeInTheDocument();
  });

  it('renders left icon', () => {
    render(<Input leftIcon={<UserIcon data-testid="left-icon" />} />);
    expect(screen.getByTestId('left-icon')).toBeInTheDocument();
  });

  it('renders right icon', () => {
    render(<Input rightIcon={<CheckIcon data-testid="right-icon" />} />);
    expect(screen.getByTestId('right-icon')).toBeInTheDocument();
  });

  it('calls onFocus and onBlur handlers', async () => {
    const handleFocus = vitest.fn();
    const handleBlur = vitest.fn();
    render(<Input onFocus={handleFocus} onBlur={handleBlur} />);
    const input = screen.getByRole('textbox');

    fireEvent.focus(input);
    expect(handleFocus).toHaveBeenCalledTimes(1);

    fireEvent.blur(input);
    expect(handleBlur).toHaveBeenCalledTimes(1);
  });

  it('applies fullWidth class when fullWidth is true', () => {
    render(<Input fullWidth />);
    const container = screen.getByRole('textbox').closest('div');
    expect(container).toHaveClass('w-full');
  });

  it('does not apply fullWidth class when fullWidth is false', () => {
    render(<Input fullWidth={false} />);
    const container = screen.getByRole('textbox').closest('div');
    expect(container).not.toHaveClass('w-full');
  });
});
