// frontend/src/components/auth/SocialAuthButtons.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vitest, beforeEach, afterEach } from 'vitest';
import SocialAuthButtons from './SocialAuthButtons';
import { GoogleLogin } from '@react-oauth/google';
import FacebookLogin from '@greatsumini/react-facebook-login';
import { toast } from 'react-hot-toast';
import { apiClient } from '../../api';

// --- Mock external dependencies ---
vitest.mock('@react-oauth/google', () => ({
  GoogleLogin: vitest.fn((props) => (
    <button data-testid="mock-google-login-button" onClick={() => props.onSuccess?.({ credential: 'mock_google_credential' })} onError={props.onError}>
      Google
    </button>
  )),
}));

vitest.mock('@greatsumini/react-facebook-login', () => ({
  __esModule: true,
  default: vitest.fn((props) => (
    props.render?.({ onClick: () => props.onSuccess?.({ accessToken: 'mock_fb_access_token', userID: 'mock_fb_user_id' }) }) || (
      <button data-testid="mock-facebook-login-button" onClick={() => props.onSuccess?.({ accessToken: 'mock_fb_access_token', userID: 'mock_fb_user_id' })} onFail={props.onFail}>
        Facebook
      </button>
    )
  )),
}));

vitest.mock('react-icons/fa', () => ({
  FaFacebook: vitest.fn(() => <svg data-testid="icon-facebook" />),
  FaTiktok: vitest.fn(() => <svg data-testid="icon-tiktok" />),
  FaGoogle: vitest.fn(() => <svg data-testid="icon-google" />),
}));

vitest.mock('react-hot-toast', () => ({
  toast: {
    success: vitest.fn(),
    error: vitest.fn(),
  },
}));

vitest.mock('../../apis', () => ({
  apiClient: {
    post: vitest.fn(),
  },
}));

// Mock window.location for TikTok redirect
const mockWindowLocation = { ...window.location };
const originalWindowLocation = window.location;
Object.defineProperty(window, 'location', {
  value: {
    ...mockWindowLocation,
    protocol: 'https:', // Default to HTTPS
    origin: 'http://localhost',
    href: originalWindowLocation.href, // Keep original href
    assign: vitest.fn(),
  },
  writable: true,
});

describe('SocialAuthButtons Component', () => {
  const mockOnSuccess = vitest.fn();
  const mockOnError = vitest.fn();

  beforeEach(() => {
    vitest.clearAllMocks();
    // Reset env vars before each test
    import.meta.env.VITE_FACEBOOK_APP_ID = 'mock-fb-app-id';
    import.meta.env.VITE_GOOGLE_CLIENT_ID = 'mock-google-client-id';
    import.meta.env.VITE_TIKTOK_CLIENT_ID = 'mock-tiktok-client-id';
    localStorage.clear(); // Clear localStorage
    (window.location as any).href = originalWindowLocation.href; // Reset href
    (window.location as any).assign.mockClear();

    // Mock Facebook SDK load
    (window as any).FB = {
      init: vitest.fn(),
    };
    (window as any).fbAsyncInit = vitest.fn();

    // Default API client success
    apiClient.post.mockResolvedValue({
      success: true,
      data: { access_token: 'mock_token', user: { id: '123' } },
    });
  });

  afterEach(() => {
    // Clean up global mocks if necessary
    delete (window as any).FB;
    delete (window as any).fbAsyncInit;
    Object.defineProperty(window, 'location', { value: originalWindowLocation });
  });

  it('renders Google, Facebook, and TikTok buttons when client IDs are provided', () => {
    render(<SocialAuthButtons onSuccess={mockOnSuccess} onError={mockOnError} />);
    expect(screen.getByText('Google')).toBeInTheDocument();
    expect(screen.getByText(/facebook/i)).toBeInTheDocument();
    expect(screen.getByText(/tiktok/i)).toBeInTheDocument();
  });

  it('does not render Google button if VITE_GOOGLE_CLIENT_ID is missing', () => {
    import.meta.env.VITE_GOOGLE_CLIENT_ID = undefined;
    render(<SocialAuthButtons onSuccess={mockOnSuccess} onError={mockOnError} />);
    expect(screen.queryByText('Google')).not.toBeInTheDocument();
  });

  it('does not render Facebook button if VITE_FACEBOOK_APP_ID is missing', () => {
    import.meta.env.VITE_FACEBOOK_APP_ID = undefined;
    render(<SocialAuthButtons onSuccess={mockOnSuccess} onError={mockOnError} />);
    expect(screen.queryByText(/facebook/i)).not.toBeInTheDocument();
  });

  it('handles Google login success', async () => {
    render(<SocialAuthButtons mode="login" onSuccess={mockOnSuccess} onError={mockOnError} />);
    fireEvent.click(screen.getByText('Google'));

    await waitFor(() => {
      expect(apiClient.post).toHaveBeenCalledWith('/auth/social/google', {
        credential: 'mock_google_credential',
        mode: 'login',
      });
      expect(localStorage.setItem).toHaveBeenCalledWith('banwee_access_token', 'mock_token');
      expect(localStorage.setItem).toHaveBeenCalledWith('banwee_user', JSON.stringify({ id: '123' }));
      expect(toast.success).toHaveBeenCalledWith('Successfully logged in with Google!');
      expect(mockOnSuccess).toHaveBeenCalledTimes(1);
    });
  });

  it('handles Google login error', async () => {
    render(<SocialAuthButtons mode="login" onSuccess={mockOnSuccess} onError={mockOnError} />);
    fireEvent.click(screen.getByTestId('mock-google-login-button').closest('button')!); // Simulate error
    
    // As the mock button doesn't explicitly trigger the onError prop in this click,
    // we need to call it directly for the test.
    (GoogleLogin as vitest.Mock).mock.calls[0][0].onError();

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Google login failed');
      expect(mockOnError).toHaveBeenCalledWith('Google login failed');
      expect(localStorage.setItem).not.toHaveBeenCalled();
    });
  });

  it('handles Facebook login success', async () => {
    render(<SocialAuthButtons mode="login" onSuccess={mockOnSuccess} onError={mockOnError} />);
    fireEvent.click(screen.getByText(/facebook/i));

    await waitFor(() => {
      expect(apiClient.post).toHaveBeenCalledWith('/auth/social/facebook', {
        access_token: 'mock_fb_access_token',
        user_id: 'mock_fb_user_id',
        mode: 'login',
      });
      expect(localStorage.setItem).toHaveBeenCalledWith('banwee_access_token', 'mock_token');
      expect(localStorage.setItem).toHaveBeenCalledWith('banwee_user', JSON.stringify({ id: '123' }));
      expect(toast.success).toHaveBeenCalledWith('Successfully logged in with Facebook!');
      expect(mockOnSuccess).toHaveBeenCalledTimes(1);
    });
  });

  it('handles Facebook login error', async () => {
    apiClient.post.mockRejectedValueOnce(new Error('FB API failed'));
    render(<SocialAuthButtons mode="login" onSuccess={mockOnSuccess} onError={mockOnError} />);
    fireEvent.click(screen.getByText(/facebook/i)); // This will trigger onSuccess of FacebookLogin mock, but then apiClient.post will fail

    await waitFor(() => {
      expect(apiClient.post).toHaveBeenCalledTimes(1);
      expect(toast.error).toHaveBeenCalledWith('Failed to login with Facebook');
      expect(mockOnError).toHaveBeenCalledWith('Failed to login with Facebook');
    });
  });

  it('handles TikTok login initiation', async () => {
    render(<SocialAuthButtons mode="login" onSuccess={mockOnSuccess} onError={mockOnError} />);
    fireEvent.click(screen.getByText(/tiktok/i));

    await waitFor(() => {
      expect(localStorage.setItem).toHaveBeenCalledWith('tiktok_oauth_state', expect.any(String));
      expect(window.location.assign).toHaveBeenCalledWith(
        expect.stringContaining('https://www.tiktok.com/auth/authorize/')
      );
      expect(window.location.assign).toHaveBeenCalledWith(
        expect.stringContaining(`client_key=${import.meta.env.VITE_TIKTOK_CLIENT_ID}`)
      );
      expect(window.location.assign).toHaveBeenCalledWith(
        expect.stringContaining(`redirect_uri=${encodeURIComponent(window.location.origin + '/auth/tiktok/callback')}`)
      );
    });
  });

  it('shows warning if social auth is not configured', () => {
    import.meta.env.VITE_GOOGLE_CLIENT_ID = undefined;
    import.meta.env.VITE_FACEBOOK_APP_ID = undefined;
    import.meta.env.VITE_TIKTOK_CLIENT_ID = undefined;
    render(<SocialAuthButtons onSuccess={mockOnSuccess} onError={mockOnError} />);
    expect(screen.getByText(/Social Authentication Setup Required/i)).toBeInTheDocument();
  });

  it('initializes Facebook SDK when facebookAppId is present and on HTTPS', () => {
    expect((window as any).FB.init).toHaveBeenCalledWith(expect.objectContaining({ appId: 'mock-fb-app-id' }));
  });
});
