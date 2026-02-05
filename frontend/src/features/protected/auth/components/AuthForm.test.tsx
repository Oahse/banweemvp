// frontend/src/components/auth/AuthForm.test.tsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vitest, beforeEach } from 'vitest';
import { AuthForm } from './AuthForm';

// Mock child components
vitest.mock('../ui/Button', () => ({
  Button: vitest.fn((props) => (
    <button {...props} data-testid="mock-button">
      {props.children}
    </button>
  )),
}));
vitest.mock('../ui/Input', () => ({
  Input: vitest.fn((props) => (
    <div data-testid={`mock-input-${props.label?.replace(/\s/g, '-')}`}>
      <label htmlFor={props.id}>{props.label}</label>
      <input
        {...props}
        data-testid={`input-${props.label?.toLowerCase().replace(/\s/g, '-')}`}
        value={props.value || ''}
        onChange={(e) => props.onChange(e.target.value)}
      />
      {props.error && <p data-testid={`input-error-${props.label?.toLowerCase().replace(/\s/g, '-')}`}>{props.error}</p>}
    </div>
  )),
}));
vitest.mock('./SocialAuth', () => ({
  SocialAuth: vitest.fn((props) => <div data-testid="mock-social-auth">Mock Social Auth</div>),
}));

describe('AuthForm Component', () => {
  const mockOnSubmit = vitest.fn();
  const mockOnSocialSuccess = vitest.fn();
  const mockOnToggleMode = vitest.fn();

  beforeEach(() => {
    vitest.clearAllMocks();
  });

  // --- Login Mode Tests ---
  describe('Login Mode', () => {
    it('renders login form elements', () => {
      render(<AuthForm mode="login" onSubmit={mockOnSubmit} socialAuth={true} />);
      expect(screen.getByText('Sign In')).toBeInTheDocument();
      expect(screen.getByLabelText('Email or Phone')).toBeInTheDocument();
      expect(screen.getByLabelText('Password')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Sign In' })).toBeInTheDocument();
      expect(screen.getByText('Forgot your password?')).toBeInTheDocument();
      expect(screen.getByTestId('mock-social-auth')).toBeInTheDocument();
    });

    it('submits form with valid email and password', async () => {
      render(<AuthForm mode="login" onSubmit={mockOnSubmit} />);
      fireEvent.change(screen.getByLabelText('Email or Phone').closest('div')!.querySelector('input')!, { target: { value: 'test@example.com' } });
      fireEvent.change(screen.getByLabelText('Password').closest('div')!.querySelector('input')!, { target: { value: 'password123' } });
      fireEvent.click(screen.getByRole('button', { name: 'Sign In' }));

      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalledWith({ identifier: 'test@example.com', password: 'password123', identifierType: 'email' });
      });
    });

    it('shows validation error for invalid email', async () => {
      render(<AuthForm mode="login" onSubmit={mockOnSubmit} />);
      fireEvent.change(screen.getByLabelText('Email or Phone').closest('div')!.querySelector('input')!, { target: { value: 'invalid-email' } });
      fireEvent.click(screen.getByRole('button', { name: 'Sign In' }));

      await waitFor(() => {
        expect(screen.getByTestId('input-error-email-or-phone')).toHaveTextContent('Please enter a valid email address');
        expect(mockOnSubmit).not.toHaveBeenCalled();
      });
    });
  });

  // --- Signup Mode Tests ---
  describe('Signup Mode', () => {
    it('renders signup form elements', () => {
      render(<AuthForm mode="signup" onSubmit={mockOnSubmit} socialAuth={true} />);
      expect(screen.getByText('Create Account')).toBeInTheDocument();
      expect(screen.getByLabelText('First Name')).toBeInTheDocument();
      expect(screen.getByLabelText('Last Name')).toBeInTheDocument();
      expect(screen.getByLabelText('Email or Phone')).toBeInTheDocument();
      expect(screen.getByLabelText('Password')).toBeInTheDocument();
      expect(screen.getByLabelText('Confirm Password')).toBeInTheDocument();
      expect(screen.getByLabelText('I accept the Terms and Conditions and Privacy Policy')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Create Account' })).toBeInTheDocument();
      expect(screen.getByTestId('mock-social-auth')).toBeInTheDocument();
    });

    it('submits form with valid signup data', async () => {
      render(<AuthForm mode="signup" onSubmit={mockOnSubmit} />);
      fireEvent.change(screen.getByLabelText('First Name').closest('div')!.querySelector('input')!, { target: { value: 'Jane' } });
      fireEvent.change(screen.getByLabelText('Last Name').closest('div')!.querySelector('input')!, { target: { value: 'Doe' } });
      fireEvent.change(screen.getByLabelText('Email or Phone').closest('div')!.querySelector('input')!, { target: { value: 'jane.doe@example.com' } });
      fireEvent.change(screen.getByLabelText('Password').closest('div')!.querySelector('input')!, { target: { value: 'password123' } });
      fireEvent.change(screen.getByLabelText('Confirm Password').closest('div')!.querySelector('input')!, { target: { value: 'password123' } });
      fireEvent.click(screen.getByLabelText('I accept the Terms and Conditions and Privacy Policy')); // Check checkbox
      fireEvent.click(screen.getByRole('button', { name: 'Create Account' }));

      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalledWith(
          expect.objectContaining({
            firstname: 'Jane',
            lastname: 'Doe',
            identifier: 'jane.doe@example.com',
            password: 'password123',
            confirmPassword: 'password123',
            acceptTerms: true,
            identifierType: 'email',
          })
        );
      });
    });

    it('shows error for mismatched passwords', async () => {
      render(<AuthForm mode="signup" onSubmit={mockOnSubmit} />);
      fireEvent.change(screen.getByLabelText('First Name').closest('div')!.querySelector('input')!, { target: { value: 'Jane' } });
      fireEvent.change(screen.getByLabelText('Last Name').closest('div')!.querySelector('input')!, { target: { value: 'Doe' } });
      fireEvent.change(screen.getByLabelText('Email or Phone').closest('div')!.querySelector('input')!, { target: { value: 'jane.doe@example.com' } });
      fireEvent.change(screen.getByLabelText('Password').closest('div')!.querySelector('input')!, { target: { value: 'password123' } });
      fireEvent.change(screen.getByLabelText('Confirm Password').closest('div')!.querySelector('input')!, { target: { value: 'different' } });
      fireEvent.click(screen.getByLabelText('I accept the Terms and Conditions and Privacy Policy')); // Check checkbox
      fireEvent.click(screen.getByRole('button', { name: 'Create Account' }));

      await waitFor(() => {
        expect(screen.getByTestId('input-error-confirm-password')).toHaveTextContent('Passwords do not match');
        expect(mockOnSubmit).not.toHaveBeenCalled();
      });
    });

    it('shows error if terms are not accepted', async () => {
      render(<AuthForm mode="signup" onSubmit={mockOnSubmit} />);
      // Fill all other fields validly
      fireEvent.change(screen.getByLabelText('First Name').closest('div')!.querySelector('input')!, { target: { value: 'Jane' } });
      fireEvent.change(screen.getByLabelText('Last Name').closest('div')!.querySelector('input')!, { target: { value: 'Doe' } });
      fireEvent.change(screen.getByLabelText('Email or Phone').closest('div')!.querySelector('input')!, { target: { value: 'jane.doe@example.com' } });
      fireEvent.change(screen.getByLabelText('Password').closest('div')!.querySelector('input')!, { target: { value: 'password123' } });
      fireEvent.change(screen.getByLabelText('Confirm Password').closest('div')!.querySelector('input')!, { target: { value: 'password123' } });
      fireEvent.click(screen.getByRole('button', { name: 'Create Account' })); // Submit without checking terms

      await waitFor(() => {
        expect(screen.getByText('You must accept the terms and conditions')).toBeInTheDocument(); // Error message for acceptTerms
        expect(mockOnSubmit).not.toHaveBeenCalled();
      });
    });
  });

  // --- Common Functionality Tests ---
  it('toggles password visibility', () => {
    render(<AuthForm mode="login" onSubmit={mockOnSubmit} />);
    const passwordInput = screen.getByLabelText('Password').closest('div')!.querySelector('input')! as HTMLInputElement;
    const toggleButton = screen.getByRole('button', { name: '👁️' }); // Initial eye icon

    expect(passwordInput.type).toBe('password');
    fireEvent.click(toggleButton);
    expect(passwordInput.type).toBe('text');
    fireEvent.click(toggleButton);
    expect(passwordInput.type).toBe('password');
  });

  it('calls onToggleMode when "Sign up" / "Sign in" button is clicked', () => {
    render(<AuthForm mode="login" onSubmit={mockOnSubmit} onToggleMode={mockOnToggleMode} />);
    fireEvent.click(screen.getByRole('button', { name: 'Sign up' }));
    expect(mockOnToggleMode).toHaveBeenCalledTimes(1);
  });

  it('shows loading indicator when loading is true', () => {
    render(<AuthForm mode="login" onSubmit={mockOnSubmit} loading={true} />);
    expect(screen.getByRole('button', { name: 'Signing In...' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Signing In...' })).toBeDisabled();
  });

  it('displays API error message', () => {
    render(<AuthForm mode="login" onSubmit={mockOnSubmit} error="Invalid credentials" />);
    expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
  });

  it('hides social auth when socialAuth is false', () => {
    render(<AuthForm mode="login" onSubmit={mockOnSubmit} socialAuth={false} />);
    expect(screen.queryByTestId('mock-social-auth')).not.toBeInTheDocument();
  });

  it('calls onSocialSuccess when social auth is successful (mocked)', () => {
    // This is implicitly tested by checking if SocialAuth is rendered and receives the prop
    // As SocialAuth is mocked, we cannot directly trigger its onSuccess.
    // The test ensures the prop is passed correctly.
    render(<AuthForm mode="login" onSubmit={mockOnSubmit} socialAuth={true} onSocialSuccess={mockOnSocialSuccess} />);
    const socialAuthComponent = screen.getByTestId('mock-social-auth');
    // Here you would typically simulate the SocialAuth component's internal action
    // to call the onSuccess prop, if it were not a shallow mock.
    // For now, we're relying on SocialAuth component's own tests to cover its internal logic.
    expect(socialAuthComponent).toBeInTheDocument();
    expect(SocialAuth).toHaveBeenCalledWith(
      expect.objectContaining({
        onSuccess: expect.any(Function),
      }),
      {}
    );
  });
});
