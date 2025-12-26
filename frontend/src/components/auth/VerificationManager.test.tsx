// frontend/src/components/auth/VerificationManager.test.tsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vitest, beforeEach } from 'vitest';
import { VerificationManager } from './VerificationManager';

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
    <div data-testid={`mock-input-${props.placeholder?.replace(/\s/g, '-')}`}>
      <input
        {...props}
        data-testid={`input-${props.placeholder?.toLowerCase().replace(/\s/g, '-')}`}
        value={props.value || ''}
        onChange={(e) => props.onChange(e)}
      />
      {props.error && <p data-testid={`input-error-${props.placeholder?.toLowerCase().replace(/\s/g, '-')}`}>{props.error}</p>}
    </div>
  )),
}));

// Mock lucide-react icons
vitest.mock('lucide-react', () => ({
  CheckCircleIcon: vitest.fn(() => <svg data-testid="icon-check-circle" />),
  XCircleIcon: vitest.fn(() => <svg data-testid="icon-x-circle" />),
  MailIcon: vitest.fn(() => <svg data-testid="icon-mail" />),
  PhoneIcon: vitest.fn(() => <svg data-testid="icon-phone" />),
}));

describe('VerificationManager Component', () => {
  const mockProps = {
    email: 'test@example.com',
    phone: '+1234567890',
    emailVerified: false,
    phoneVerified: false,
    onVerifyEmail: vitest.fn(),
    onVerifyPhone: vitest.fn(),
    onResendEmailCode: vitest.fn(),
    onResendPhoneCode: vitest.fn(),
    loading: false,
  };

  beforeEach(() => {
    vitest.clearAllMocks();
  });

  // --- Email Verification Tests ---
  it('renders email as "Unverified" when emailVerified is false', () => {
    render(<VerificationManager {...mockProps} />);
    expect(screen.getByText('Email Verification')).toBeInTheDocument();
    expect(screen.getByText(mockProps.email)).toBeInTheDocument();
    expect(screen.getByText('Unverified')).toBeInTheDocument();
    expect(screen.getByTestId('icon-x-circle')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter 6-digit code')).toBeInTheDocument(); // Email code input
    expect(screen.getByRole('button', { name: 'Verify' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Resend Code' })).toBeInTheDocument();
  });

  it('renders email as "Verified" when emailVerified is true', () => {
    render(<VerificationManager {...mockProps} emailVerified={true} />);
    expect(screen.getByText('Verified')).toBeInTheDocument();
    expect(screen.getByTestId('icon-check-circle')).toBeInTheDocument();
    expect(screen.queryByPlaceholderText('Enter 6-digit code')).not.toBeInTheDocument();
  });

  it('shows error for empty email code submission', async () => {
    render(<VerificationManager {...mockProps} />);
    fireEvent.click(screen.getByRole('button', { name: 'Verify' }));
    await waitFor(() => {
      expect(screen.getByTestId('input-error-enter-6-digit-code')).toHaveTextContent('Please enter the verification code');
      expect(mockProps.onVerifyEmail).not.toHaveBeenCalled();
    });
  });

  it('calls onVerifyEmail with code and clears input on success', async () => {
    mockProps.onVerifyEmail.mockResolvedValue(true);
    render(<VerificationManager {...mockProps} />);
    const emailCodeInput = screen.getByPlaceholderText('Enter 6-digit code').closest('div')!.querySelector('input')!;
    fireEvent.change(emailCodeInput, { target: { value: '123456' } });
    fireEvent.click(screen.getByRole('button', { name: 'Verify' }));

    await waitFor(() => {
      expect(mockProps.onVerifyEmail).toHaveBeenCalledWith('123456');
      expect(emailCodeInput).toHaveValue('');
    });
  });

  it('displays error message from onVerifyEmail failure', async () => {
    mockProps.onVerifyEmail.mockRejectedValue(new Error('Invalid code'));
    render(<VerificationManager {...mockProps} />);
    const emailCodeInput = screen.getByPlaceholderText('Enter 6-digit code').closest('div')!.querySelector('input')!;
    fireEvent.change(emailCodeInput, { target: { value: 'wrong' } });
    fireEvent.click(screen.getByRole('button', { name: 'Verify' }));

    await waitFor(() => {
      expect(screen.getByTestId('input-error-enter-6-digit-code')).toHaveTextContent('Invalid code');
    });
  });

  it('calls onResendEmailCode and shows code sent message', async () => {
    mockProps.onResendEmailCode.mockResolvedValue(true);
    render(<VerificationManager {...mockProps} />);
    fireEvent.click(screen.getByRole('button', { name: 'Resend Code' }));

    await waitFor(() => {
      expect(mockProps.onResendEmailCode).toHaveBeenCalledTimes(1);
      expect(screen.getByText(`Verification code sent to ${mockProps.email}. Please check your inbox and spam folder.`)).toBeInTheDocument();
    });
  });

  // --- Phone Verification Tests ---
  it('renders phone as "Unverified" when phoneVerified is false and phone is provided', () => {
    render(<VerificationManager {...mockProps} />);
    expect(screen.getByText('Phone Verification')).toBeInTheDocument();
    expect(screen.getByText(mockProps.phone)).toBeInTheDocument();
    expect(screen.getByText('Unverified', { selector: 'div > div > span' })).toBeInTheDocument(); // Distinguish from email
    expect(screen.getByRole('button', { name: 'Resend SMS' })).toBeInTheDocument();
  });

  it('does not render phone verification if phone prop is null', () => {
    render(<VerificationManager {...mockProps} phone={null} />);
    expect(screen.queryByText('Phone Verification')).not.toBeInTheDocument();
  });

  it('calls onVerifyPhone with code and clears input on success', async () => {
    mockProps.onVerifyPhone.mockResolvedValue(true);
    render(<VerificationManager {...mockProps} />);
    const phoneCodeInput = screen.getByPlaceholderText('Enter 6-digit code').closest('div')!.querySelectorAll('input')[1]; // Second input
    fireEvent.change(phoneCodeInput!, { target: { value: '654321' } });
    fireEvent.click(screen.getByRole('button', { name: 'Verify' }, { selector: '.flex > button' })); // Target the second Verify button

    await waitFor(() => {
      expect(mockProps.onVerifyPhone).toHaveBeenCalledWith('654321');
      expect(phoneCodeInput).toHaveValue('');
    });
  });

  it('calls onResendPhoneCode and shows code sent message', async () => {
    mockProps.onResendPhoneCode.mockResolvedValue(true);
    render(<VerificationManager {...mockProps} />);
    fireEvent.click(screen.getByRole('button', { name: 'Resend SMS' }));

    await waitFor(() => {
      expect(mockProps.onResendPhoneCode).toHaveBeenCalledTimes(1);
      expect(screen.getByText(`Verification code sent to ${mockProps.phone} via SMS.`)).toBeInTheDocument();
    });
  });

  // --- Loading State Tests ---
  it('disables buttons when loading prop is true', () => {
    render(<VerificationManager {...mockProps} loading={true} />);
    expect(screen.getByRole('button', { name: 'Verify' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Resend Code' })).toBeDisabled();
  });

  it('disables Verify button when isVerifyingEmail is true', async () => {
    mockProps.onVerifyEmail.mockImplementationOnce(() => new Promise(() => {})); // Never resolve
    render(<VerificationManager {...mockProps} />);
    const emailCodeInput = screen.getByPlaceholderText('Enter 6-digit code').closest('div')!.querySelector('input')!;
    fireEvent.change(emailCodeInput, { target: { value: '123456' } });
    fireEvent.click(screen.getByRole('button', { name: 'Verify' }));

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Verifying...' })).toBeDisabled();
    });
  });
});
