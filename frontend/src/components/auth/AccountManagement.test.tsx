// frontend/src/components/auth/AccountManagement.test.tsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vitest, beforeEach } from 'vitest';
import { AccountManagement } from './AccountManagement';
import { UserProfile } from './UserProfile';
import { AddressManager } from './AddressManager';
import { UserDataExport } from './UserDataExport';
import { VerificationManager } from './VerificationManager';
import { SocialAuth } from './SocialAuth';
import { Button } from '../ui/Button';

// --- Mock external dependencies ---
vitest.mock('./UserProfile', () => ({
  UserProfile: vitest.fn((props) => <div data-testid="mock-user-profile">Mock User Profile</div>),
}));
vitest.mock('./AddressManager', () => ({
  AddressManager: vitest.fn((props) => <div data-testid="mock-address-manager">Mock Address Manager</div>),
}));
vitest.mock('./UserDataExport', () => ({
  UserDataExport: vitest.fn((props) => <div data-testid="mock-user-data-export">Mock User Data Export</div>),
}));
vitest.mock('./VerificationManager', () => ({
  VerificationManager: vitest.fn((props) => <div data-testid="mock-verification-manager">Mock Verification Manager</div>),
}));
vitest.mock('./SocialAuth', () => ({
  SocialAuth: vitest.fn((props) => <div data-testid="mock-social-auth">Mock Social Auth</div>),
}));
vitest.mock('../ui/Button', () => ({
  Button: vitest.fn((props) => <button {...props} data-testid="mock-button">{props.children}</button>),
}));

// Mock lucide-react icons
vitest.mock('lucide-react', () => ({
  UserIcon: vitest.fn(() => <svg data-testid="icon-user" />),
  MapPinIcon: vitest.fn(() => <svg data-testid="icon-map-pin" />),
  DownloadIcon: vitest.fn(() => <svg data-testid="icon-download" />),
  ShieldCheckIcon: vitest.fn(() => <svg data-testid="icon-shield-check" />),
  LinkIcon: vitest.fn(() => <svg data-testid="icon-link" />),
  SettingsIcon: vitest.fn(() => <svg data-testid="icon-settings" />),
}));


describe('AccountManagement Component', () => {
  const mockUser = {
    email: 'test@example.com',
    phone: '123-456-7890',
    emailVerified: true,
    phoneVerified: false,
    firstname: 'John',
    lastname: 'Doe',
  };
  const mockAddresses = [{ id: '1', street: '123 Main St' }];
  const mockCallbacks = {
    onUpdateUser: vitest.fn(),
    onAddAddress: vitest.fn(),
    onUpdateAddress: vitest.fn(),
    onDeleteAddress: vitest.fn(),
    onExportData: vitest.fn(),
    onVerifyEmail: vitest.fn(),
    onVerifyPhone: vitest.fn(),
    onResendEmailCode: vitest.fn(),
    onResendPhoneCode: vitest.fn(),
    onSocialAuthSuccess: vitest.fn(),
  };

  beforeEach(() => {
    vitest.clearAllMocks();
    (UserProfile as vitest.Mock).mockClear();
    (AddressManager as vitest.Mock).mockClear();
    (VerificationManager as vitest.Mock).mockClear();
    (SocialAuth as vitest.Mock).mockClear();
    (UserDataExport as vitest.Mock).mockClear();
    (Button as vitest.Mock).mockClear();
  });

  it('renders title and description', () => {
    render(<AccountManagement user={mockUser} addresses={[]} {...mockCallbacks} />);
    expect(screen.getByText('Account Management')).toBeInTheDocument();
    expect(screen.getByText('Manage your account settings, preferences, and personal information')).toBeInTheDocument();
  });

  it('renders tab navigation with "Profile" active by default', () => {
    render(<AccountManagement user={mockUser} addresses={[]} {...mockCallbacks} />);
    expect(screen.getByRole('button', { name: /profile/i })).toHaveClass('bg-blue-50');
    expect(screen.getByTestId('mock-user-profile')).toBeInTheDocument();
  });

  it('switches to "Addresses" tab when clicked', () => {
    render(<AccountManagement user={mockUser} addresses={[]} {...mockCallbacks} />);
    fireEvent.click(screen.getByRole('button', { name: /addresses/i }));
    expect(screen.getByRole('button', { name: /addresses/i })).toHaveClass('bg-blue-50');
    expect(screen.getByTestId('mock-address-manager')).toBeInTheDocument();
    expect(screen.queryByTestId('mock-user-profile')).not.toBeInTheDocument();
  });

  it('switches to "Verification" tab when clicked', () => {
    render(<AccountManagement user={mockUser} addresses={[]} {...mockCallbacks} />);
    fireEvent.click(screen.getByRole('button', { name: /verification/i }));
    expect(screen.getByTestId('mock-verification-manager')).toBeInTheDocument();
  });

  it('switches to "Social Accounts" tab when clicked', () => {
    render(<AccountManagement user={mockUser} addresses={[]} {...mockCallbacks} />);
    fireEvent.click(screen.getByRole('button', { name: /social accounts/i }));
    expect(screen.getByText('Social Media Accounts')).toBeInTheDocument();
    expect(screen.getByTestId('mock-social-auth')).toBeInTheDocument();
    expect(screen.getByText('Connected Accounts')).toBeInTheDocument();
    expect(screen.getByText(mockUser.email)).toBeInTheDocument();
    expect(screen.getByText(mockUser.phone)).toBeInTheDocument();
  });

  it('switches to "Data Export" tab when clicked', () => {
    render(<AccountManagement user={mockUser} addresses={[]} {...mockCallbacks} />);
    fireEvent.click(screen.getByRole('button', { name: /data export/i }));
    expect(screen.getByTestId('mock-user-data-export')).toBeInTheDocument();
  });

  it('switches to "Preferences" tab when clicked', () => {
    render(<AccountManagement user={mockUser} addresses={[]} {...mockCallbacks} />);
    fireEvent.click(screen.getByRole('button', { name: /preferences/i }));
    expect(screen.getByText('Preferences')).toBeInTheDocument();
    expect(screen.getByText('Language & Region')).toBeInTheDocument();
    expect(screen.getByText('Email Notifications')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Save Preferences' })).toBeInTheDocument();
  });

  it('passes user and onUpdate prop to UserProfile', () => {
    render(<AccountManagement user={mockUser} addresses={[]} {...mockCallbacks} />);
    expect(UserProfile).toHaveBeenCalledWith(
      expect.objectContaining({
        user: mockUser,
        onUpdate: mockCallbacks.onUpdateUser,
        loading: false,
      }),
      {}
    );
  });

  it('passes addresses and related callbacks to AddressManager', () => {
    render(<AccountManagement user={mockUser} addresses={mockAddresses} {...mockCallbacks} />);
    fireEvent.click(screen.getByRole('button', { name: /addresses/i }));
    expect(AddressManager).toHaveBeenCalledWith(
      expect.objectContaining({
        addresses: mockAddresses,
        onAdd: mockCallbacks.onAddAddress,
        onUpdate: mockCallbacks.onUpdateAddress,
        onDelete: mockCallbacks.onDeleteAddress,
        loading: false,
      }),
      {}
    );
  });

  it('passes verification props to VerificationManager', () => {
    render(<AccountManagement user={mockUser} addresses={[]} {...mockCallbacks} />);
    fireEvent.click(screen.getByRole('button', { name: /verification/i }));
    expect(VerificationManager).toHaveBeenCalledWith(
      expect.objectContaining({
        email: mockUser.email,
        phone: mockUser.phone,
        emailVerified: mockUser.emailVerified,
        phoneVerified: mockUser.phoneVerified,
        onVerifyEmail: mockCallbacks.onVerifyEmail,
        onVerifyPhone: mockCallbacks.onVerifyPhone,
        onResendEmailCode: mockCallbacks.onResendEmailCode,
        onResendPhoneCode: mockCallbacks.onResendPhoneCode,
        loading: false,
      }),
      {}
    );
  });

  it('passes onExportData to UserDataExport', () => {
    render(<AccountManagement user={mockUser} addresses={[]} {...mockCallbacks} />);
    fireEvent.click(screen.getByRole('button', { name: /data export/i }));
    expect(UserDataExport).toHaveBeenCalledWith(
      expect.objectContaining({
        onExport: mockCallbacks.onExportData,
        loading: false,
      }),
      {}
    );
  });

  it('passes social auth props to SocialAuth', () => {
    render(<AccountManagement user={mockUser} addresses={[]} {...mockCallbacks} />);
    fireEvent.click(screen.getByRole('button', { name: /social accounts/i }));
    expect(SocialAuth).toHaveBeenCalledWith(
      expect.objectContaining({
        mode: 'link',
        onSuccess: mockCallbacks.onSocialAuthSuccess,
        onError: expect.any(Function), // Internal handler
      }),
      {}
    );
  });

  it('passes loading prop to child components', () => {
    render(<AccountManagement user={mockUser} addresses={[]} {...mockCallbacks} loading={true} />);
    expect(UserProfile).toHaveBeenCalledWith(
      expect.objectContaining({ loading: true }), {}
    );
    fireEvent.click(screen.getByRole('button', { name: /addresses/i }));
    expect(AddressManager).toHaveBeenCalledWith(
      expect.objectContaining({ loading: true }), {}
    );
  });
});
