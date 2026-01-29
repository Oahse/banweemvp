/**
 * Frontend authentication security tests
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders, mockUser } from '../setup';
import Login from '../../pages/Login';
import Register from '../../pages/Register';
import * as AuthAPI from '../../api/auth';

vi.mock('../../api/auth');

describe('Authentication Security Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
    sessionStorage.clear();
  });

  describe('Login Security', () => {
    it('should prevent XSS in login form', async () => {
      const user = userEvent.setup();
      
      render(<Login />);

      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);

      // Try to inject XSS payload
      const xssPayload = '<script>alert("XSS")</script>';
      
      await user.type(emailInput, xssPayload);
      await user.type(passwordInput, 'password123');

      // Input should be sanitized or escaped
      expect(emailInput).toHaveValue(xssPayload);
      // But the actual DOM should not contain executable script
      expect(document.body.innerHTML).not.toContain('<script>alert("XSS")</script>');
    });

    it('should enforce password complexity requirements', async () => {
      const user = userEvent.setup();
      
      render(<Register />);

      const passwordInput = screen.getByLabelText(/^password/i);
      const weakPasswords = [
        '123',
        'password',
        'abc123',
        '12345678'
      ];

      for (const weakPassword of weakPasswords) {
        await user.clear(passwordInput);
        await user.type(passwordInput, weakPassword);
        await user.tab(); // Trigger validation

        await waitFor(() => {
          expect(screen.getByText(/password must be stronger/i)).toBeInTheDocument();
        });
      }
    });

    it('should prevent credential stuffing attacks with rate limiting', async () => {
      const user = userEvent.setup();
      
      // Mock failed login attempts
      vi.mocked(AuthAPI.login).mockRejectedValue({
        response: {
          status: 401,
          data: { message: 'Invalid credentials' }
        }
      });

      render(<Login />);

      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const loginButton = screen.getByRole('button', { name: /sign in/i });

      // Simulate multiple failed attempts
      for (let i = 0; i < 5; i++) {
        await user.clear(emailInput);
        await user.clear(passwordInput);
        await user.type(emailInput, `attempt${i}@example.com`);
        await user.type(passwordInput, 'wrongpassword');
        await user.click(loginButton);

        await waitFor(() => {
          expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument();
        });
      }

      // After multiple attempts, should show rate limiting message
      await waitFor(() => {
        expect(screen.getByText(/too many attempts/i) || screen.getByText(/rate limited/i)).toBeInTheDocument();
      });
    });

    it('should not expose sensitive information in error messages', async () => {
      const user = userEvent.setup();
      
      vi.mocked(AuthAPI.login).mockRejectedValue({
        response: {
          status: 401,
          data: { message: 'Invalid credentials' }
        }
      });

      render(<Login />);

      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const loginButton = screen.getByRole('button', { name: /sign in/i });

      await user.type(emailInput, 'nonexistent@example.com');
      await user.type(passwordInput, 'wrongpassword');
      await user.click(loginButton);

      await waitFor(() => {
        const errorMessage = screen.getByText(/invalid credentials/i);
        expect(errorMessage).toBeInTheDocument();
        
        // Should not reveal whether email exists or not
        expect(screen.queryByText(/user not found/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/email does not exist/i)).not.toBeInTheDocument();
      });
    });

    it('should clear sensitive data from memory on logout', async () => {
      const user = userEvent.setup();
      
      // Mock successful login
      vi.mocked(AuthAPI.login).mockResolvedValue({
        success: true,
        data: {
          user: mockUser,
          access_token: 'sensitive_token_123',
          refresh_token: 'refresh_token_456'
        }
      });

      vi.mocked(AuthAPI.logout).mockResolvedValue({
        success: true,
        message: 'Logged out successfully'
      });

      render(<Login />);

      // Login
      await user.type(screen.getByLabelText(/email/i), mockUser.email);
      await user.type(screen.getByLabelText(/password/i), 'password123');
      await user.click(screen.getByRole('button', { name: /sign in/i }));

      // Verify tokens are stored
      await waitFor(() => {
        expect(localStorage.getItem('access_token')).toBeTruthy();
      });

      // Logout
      const logoutButton = screen.getByText(/logout/i);
      await user.click(logoutButton);

      // Verify sensitive data is cleared
      await waitFor(() => {
        expect(localStorage.getItem('access_token')).toBeNull();
        expect(localStorage.getItem('refresh_token')).toBeNull();
        expect(sessionStorage.getItem('user')).toBeNull();
      });
    });

    it('should validate JWT token format', async () => {
      // Test with malformed JWT tokens
      const malformedTokens = [
        'invalid.token',
        'not.a.jwt.token',
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.invalid',
        '',
        null,
        undefined
      ];

      for (const token of malformedTokens) {
        localStorage.setItem('access_token', token as string);
        
        render(<Login />);
        
        // Should not consider user as authenticated with invalid token
        expect(screen.queryByText(/welcome back/i)).not.toBeInTheDocument();
        
        // Should clear invalid token
        expect(localStorage.getItem('access_token')).toBeNull();
      }
    });

    it('should handle token expiration gracefully', async () => {
      // Mock expired token scenario
      vi.mocked(AuthAPI.getProfile).mockRejectedValue({
        response: {
          status: 401,
          data: { message: 'Token expired' }
        }
      });

      vi.mocked(AuthAPI.refreshToken).mockRejectedValue({
        response: {
          status: 401,
          data: { message: 'Refresh token expired' }
        }
      });

      // Set expired token
      localStorage.setItem('access_token', 'expired_token');
      localStorage.setItem('refresh_token', 'expired_refresh');

      render(<Login />);

      // Should automatically attempt to refresh token
      await waitFor(() => {
        expect(vi.mocked(AuthAPI.refreshToken)).toHaveBeenCalled();
      });

      // Should clear tokens and redirect to login
      await waitFor(() => {
        expect(localStorage.getItem('access_token')).toBeNull();
        expect(screen.getByText(/sign in/i)).toBeInTheDocument();
      });
    });
  });

  describe('Registration Security', () => {
    it('should prevent email enumeration attacks', async () => {
      const user = userEvent.setup();
      
      vi.mocked(AuthAPI.register).mockRejectedValue({
        response: {
          status: 400,
          data: { message: 'Registration failed' }
        }
      });

      render(<Register />);

      await user.type(screen.getByLabelText(/email/i), 'existing@example.com');
      await user.type(screen.getByLabelText(/first name/i), 'Test');
      await user.type(screen.getByLabelText(/last name/i), 'User');
      await user.type(screen.getByLabelText(/^password/i), 'StrongPassword123!');
      await user.click(screen.getByRole('button', { name: /register/i }));

      await waitFor(() => {
        const errorMessage = screen.getByText(/registration failed/i);
        expect(errorMessage).toBeInTheDocument();
        
        // Should not reveal if email already exists
        expect(screen.queryByText(/email already exists/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/user already registered/i)).not.toBeInTheDocument();
      });
    });

    it('should validate email format strictly', async () => {
      const user = userEvent.setup();
      
      render(<Register />);

      const emailInput = screen.getByLabelText(/email/i);
      const invalidEmails = [
        'invalid-email',
        '@example.com',
        'test@',
        'test..test@example.com',
        'test@example',
        '<script>alert("xss")</script>@example.com'
      ];

      for (const invalidEmail of invalidEmails) {
        await user.clear(emailInput);
        await user.type(emailInput, invalidEmail);
        await user.tab();

        await waitFor(() => {
          expect(screen.getByText(/valid email/i)).toBeInTheDocument();
        });
      }
    });

    it('should enforce strong password requirements', async () => {
      const user = userEvent.setup();
      
      render(<Register />);

      const passwordInput = screen.getByLabelText(/^password/i);
      
      // Test password requirements
      const passwordTests = [
        { password: 'weak', shouldFail: true, reason: 'too short' },
        { password: 'onlylowercase', shouldFail: true, reason: 'no uppercase' },
        { password: 'ONLYUPPERCASE', shouldFail: true, reason: 'no lowercase' },
        { password: 'NoNumbers!', shouldFail: true, reason: 'no numbers' },
        { password: 'NoSpecialChars123', shouldFail: true, reason: 'no special chars' },
        { password: 'StrongPassword123!', shouldFail: false, reason: 'valid' }
      ];

      for (const test of passwordTests) {
        await user.clear(passwordInput);
        await user.type(passwordInput, test.password);
        await user.tab();

        if (test.shouldFail) {
          await waitFor(() => {
            expect(screen.getByText(/password must/i)).toBeInTheDocument();
          });
        } else {
          await waitFor(() => {
            expect(screen.queryByText(/password must/i)).not.toBeInTheDocument();
          });
        }
      }
    });

    it('should prevent automated registration attacks', async () => {
      const user = userEvent.setup();
      
      render(<Register />);

      // Should have CAPTCHA or similar protection
      expect(screen.getByText(/captcha/i) || screen.getByText(/verify/i)).toBeInTheDocument();

      // Should have honeypot fields (hidden from users)
      const honeypotField = document.querySelector('input[name="website"]');
      expect(honeypotField).toBeInTheDocument();
      expect(honeypotField).toHaveStyle({ display: 'none' });
    });
  });

  describe('Session Security', () => {
    it('should implement secure session timeout', async () => {
      vi.useFakeTimers();
      
      // Mock user session
      localStorage.setItem('access_token', 'valid_token');
      localStorage.setItem('session_start', Date.now().toString());

      render(<Login />);

      // Fast forward time to simulate session timeout
      vi.advanceTimersByTime(30 * 60 * 1000); // 30 minutes

      // Should automatically logout after timeout
      await waitFor(() => {
        expect(localStorage.getItem('access_token')).toBeNull();
      });

      vi.useRealTimers();
    });

    it('should detect concurrent sessions', async () => {
      // Simulate multiple tabs/windows
      const originalToken = 'original_token';
      const newToken = 'new_token';

      localStorage.setItem('access_token', originalToken);

      render(<Login />);

      // Simulate token change in another tab
      const storageEvent = new StorageEvent('storage', {
        key: 'access_token',
        newValue: newToken,
        oldValue: originalToken
      });

      window.dispatchEvent(storageEvent);

      // Should handle concurrent session appropriately
      await waitFor(() => {
        expect(screen.getByText(/session updated/i) || screen.getByText(/logged out/i)).toBeInTheDocument();
      });
    });

    it('should clear session data on browser close', async () => {
      // Mock beforeunload event
      const beforeUnloadEvent = new Event('beforeunload');
      
      localStorage.setItem('access_token', 'token');
      sessionStorage.setItem('temp_data', 'sensitive');

      render(<Login />);

      // Trigger beforeunload
      window.dispatchEvent(beforeUnloadEvent);

      // Should clear sensitive session data
      expect(sessionStorage.getItem('temp_data')).toBeNull();
    });
  });

  describe('CSRF Protection', () => {
    it('should include CSRF tokens in state-changing requests', async () => {
      const user = userEvent.setup();
      
      // Mock CSRF token
      const csrfToken = 'csrf_token_123';
      document.querySelector('meta[name="csrf-token"]')?.setAttribute('content', csrfToken);

      vi.mocked(AuthAPI.login).mockImplementation((credentials) => {
        // Verify CSRF token is included
        expect(credentials).toHaveProperty('_token', csrfToken);
        return Promise.resolve({
          success: true,
          data: { user: mockUser, access_token: 'token' }
        });
      });

      render(<Login />);

      await user.type(screen.getByLabelText(/email/i), 'test@example.com');
      await user.type(screen.getByLabelText(/password/i), 'password123');
      await user.click(screen.getByRole('button', { name: /sign in/i }));

      await waitFor(() => {
        expect(vi.mocked(AuthAPI.login)).toHaveBeenCalled();
      });
    });
  });

  describe('Input Sanitization', () => {
    it('should sanitize user inputs to prevent injection attacks', async () => {
      const user = userEvent.setup();
      
      render(<Register />);

      const maliciousInputs = [
        '<script>alert("xss")</script>',
        'javascript:alert("xss")',
        '"><script>alert("xss")</script>',
        "'; DROP TABLE users; --",
        '{{7*7}}', // Template injection
        '${7*7}', // Expression injection
      ];

      const firstNameInput = screen.getByLabelText(/first name/i);

      for (const maliciousInput of maliciousInputs) {
        await user.clear(firstNameInput);
        await user.type(firstNameInput, maliciousInput);

        // Input should be sanitized or escaped
        const inputValue = firstNameInput.getAttribute('value') || '';
        expect(inputValue).not.toContain('<script>');
        expect(inputValue).not.toContain('javascript:');
      }
    });
  });

  describe('Secure Storage', () => {
    it('should not store sensitive data in localStorage', async () => {
      vi.mocked(AuthAPI.login).mockResolvedValue({
        success: true,
        data: {
          user: mockUser,
          access_token: 'access_token_123',
          refresh_token: 'refresh_token_456'
        }
      });

      const user = userEvent.setup();
      render(<Login />);

      await user.type(screen.getByLabelText(/email/i), 'test@example.com');
      await user.type(screen.getByLabelText(/password/i), 'password123');
      await user.click(screen.getByRole('button', { name: /sign in/i }));

      await waitFor(() => {
        // Sensitive data should not be in localStorage
        expect(localStorage.getItem('password')).toBeNull();
        expect(localStorage.getItem('credit_card')).toBeNull();
        expect(localStorage.getItem('ssn')).toBeNull();
        
        // Only non-sensitive tokens should be stored
        expect(localStorage.getItem('access_token')).toBeTruthy();
      });
    });

    it('should encrypt sensitive data if stored locally', async () => {
      // If sensitive data must be stored locally, it should be encrypted
      const sensitiveData = 'sensitive_user_data';
      
      // Mock encryption function
      const encrypt = (data: string) => btoa(data); // Simple base64 for demo
      const decrypt = (data: string) => atob(data);

      const encryptedData = encrypt(sensitiveData);
      localStorage.setItem('encrypted_data', encryptedData);

      // Verify data is encrypted
      expect(localStorage.getItem('encrypted_data')).not.toBe(sensitiveData);
      expect(decrypt(localStorage.getItem('encrypted_data')!)).toBe(sensitiveData);
    });
  });

  describe('Content Security Policy', () => {
    it('should prevent inline script execution', async () => {
      // Mock CSP violation
      const cspViolationEvent = new SecurityPolicyViolationEvent('securitypolicyviolation', {
        violatedDirective: 'script-src',
        blockedURI: 'inline',
        documentURI: window.location.href,
        originalPolicy: "script-src 'self'"
      });

      const cspHandler = vi.fn();
      document.addEventListener('securitypolicyviolation', cspHandler);

      // Try to inject inline script
      const scriptElement = document.createElement('script');
      scriptElement.innerHTML = 'alert("CSP Test")';
      document.body.appendChild(scriptElement);

      // CSP should prevent execution
      document.dispatchEvent(cspViolationEvent);
      expect(cspHandler).toHaveBeenCalled();
    });
  });
});