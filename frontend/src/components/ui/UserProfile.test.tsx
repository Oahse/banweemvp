// frontend/src/components/ui/UserProfile.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vitest, beforeEach } from 'vitest';
import { UserProfile } from './UserProfile';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';

// Mock child components
vitest.mock('../ui/Button', () => ({
  Button: vitest.fn((props) => <button {...props} data-testid="mock-button">{props.children}</button>),
}));

vitest.mock('../ui/Input', () => ({
  Input: vitest.fn((props) => (
    <div data-testid={`mock-input-${props.label}`}>
      <label htmlFor={props.id}>{props.label}</label>
      <input
        {...props}
        onChange={(e) => props.onChange(e)}
        data-testid={`input-${props.label?.toLowerCase().replace(/\s/g, '-')}`}
      />
      {props.error && <p data-testid={`input-error-${props.label?.toLowerCase().replace(/\s/g, '-')}`}>{props.error}</p>}
    </div>
  )),
}));

vitest.mock('../ui/Select', () => ({
  Select: vitest.fn((props) => (
    <div data-testid={`mock-select-${props.label}`}>
      <label htmlFor={props.id}>{props.label}</label>
      <select
        {...props}
        onChange={(e) => props.onChange(e)}
        data-testid={`select-${props.label?.toLowerCase().replace(/\s/g, '-')}`}
      >
        {props.options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )),
}));

describe('UserProfile Component', () => {
  const mockUser = {
    firstname: 'John',
    lastname: 'Doe',
    email: 'john.doe@example.com',
    phone: '+15551234567',
    age: 30,
    gender: 'Male',
    language: 'en',
    country: 'US',
    timezone: 'America/New_York',
    picture: 'http://example.com/avatar.jpg',
    verified: true,
    role: 'customer',
  };

  const mockOnUpdate = vitest.fn();

  beforeEach(() => {
    vitest.clearAllMocks();
  });

  it('renders user information in view mode initially', () => {
    render(<UserProfile user={mockUser} onUpdate={mockOnUpdate} editable={true} />);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();
    expect(screen.getByText('✓ Verified')).toBeInTheDocument();
    expect(screen.getByText('customer')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Profile' })).toHaveAttribute('src', mockUser.picture);
    expect(screen.getByRole('button', { name: 'Edit Profile' })).toBeInTheDocument();
    expect(screen.getByTestId('input-first-name').querySelector('input')).toBeDisabled();
  });

  it('enters edit mode when "Edit Profile" button is clicked', () => {
    render(<UserProfile user={mockUser} onUpdate={mockOnUpdate} editable={true} />);

    fireEvent.click(screen.getByRole('button', { name: 'Edit Profile' }));

    expect(screen.queryByRole('button', { name: 'Edit Profile' })).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Save Changes' })).toBeInTheDocument();
    expect(screen.getByTestId('input-first-name').querySelector('input')).not.toBeDisabled();
  });

  it('updates form data on input change', async () => {
    render(<UserProfile user={mockUser} onUpdate={mockOnUpdate} editable={true} />);
    fireEvent.click(screen.getByRole('button', { name: 'Edit Profile' }));

    const firstNameInput = screen.getByTestId('input-first-name').querySelector('input')!;
    fireEvent.change(firstNameInput, { target: { value: 'Jane' } });

    await waitFor(() => {
      expect(firstNameInput.value).toBe('Jane');
    });
  });

  it('shows validation errors and prevents submission for invalid data', async () => {
    render(<UserProfile user={mockUser} onUpdate={mockOnUpdate} editable={true} />);
    fireEvent.click(screen.getByRole('button', { name: 'Edit Profile' }));

    const firstNameInput = screen.getByTestId('input-first-name').querySelector('input')!;
    fireEvent.change(firstNameInput, { target: { value: '' } }); // Make invalid

    fireEvent.click(screen.getByRole('button', { name: 'Save Changes' }));

    await waitFor(() => {
      expect(screen.getByTestId('input-error-first-name')).toHaveTextContent('First name is required');
      expect(mockOnUpdate).not.toHaveBeenCalled();
    });
  });

  it('calls onUpdate with new data and exits edit mode on valid submission', async () => {
    render(<UserProfile user={mockUser} onUpdate={mockOnUpdate} editable={true} />);
    fireEvent.click(screen.getByRole('button', { name: 'Edit Profile' }));

    const firstNameInput = screen.getByTestId('input-first-name').querySelector('input')!;
    fireEvent.change(firstNameInput, { target: { value: 'Jane' } });

    fireEvent.click(screen.getByRole('button', { name: 'Save Changes' }));

    await waitFor(() => {
      expect(mockOnUpdate).toHaveBeenCalledWith(expect.objectContaining({ firstname: 'Jane' }));
      expect(screen.getByRole('button', { name: 'Edit Profile' })).toBeInTheDocument(); // Back to view mode
    });
  });

  it('resets form data and exits edit mode on cancel', async () => {
    render(<UserProfile user={mockUser} onUpdate={mockOnUpdate} editable={true} />);
    fireEvent.click(screen.getByRole('button', { name: 'Edit Profile' }));

    const firstNameInput = screen.getByTestId('input-first-name').querySelector('input')!;
    fireEvent.change(firstNameInput, { target: { value: 'Jane' } });

    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));

    await waitFor(() => {
      expect(firstNameInput.value).toBe('John'); // Value should revert
      expect(screen.getByRole('button', { name: 'Edit Profile' })).toBeInTheDocument(); // Back to view mode
      expect(screen.queryByTestId('input-error-first-name')).not.toBeInTheDocument(); // Errors cleared
    });
  });

  it('disables buttons and shows loading indicator when loading is true', () => {
    render(<UserProfile user={mockUser} onUpdate={mockOnUpdate} editable={true} loading={true} />);

    // In view mode, Edit Profile button should be disabled
    expect(screen.getByRole('button', { name: 'Edit Profile' })).toBeDisabled();

    // Enter edit mode
    // Simulate user clicking edit button (even if disabled, it can be forced in tests or state directly changed)
    // For this test, we'll assume isEditing is true due to external state for simplicity, or re-render
    const { rerender } = render(<UserProfile user={mockUser} onUpdate={mockOnUpdate} editable={true} loading={true} />);
    fireEvent.click(screen.getByRole('button', { name: 'Edit Profile' })); // Should still be disabled, but let's assume it somehow enters edit
    rerender(<UserProfile user={mockUser} onUpdate={mockOnUpdate} editable={true} isEditing={true} loading={true} />);

    // In edit mode, Save Changes and Cancel should be disabled and Save button shows loading
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Saving...' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Saving...' })).toBeDisabled();
  });
});
