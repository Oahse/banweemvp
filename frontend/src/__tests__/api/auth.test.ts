/**
 * Tests for Auth API
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import AuthAPI from '../../api/auth';
import { apiClient } from '../../api/client';
import { mockApiResponses, mockUser } from '../setup';

vi.mock('../../api/client');

describe('AuthAPI', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('login', () => {
    it('should login successfully with valid credentials', async () => {
      const mockResponse = mockApiResponses.auth.login;
      vi.mocked(apiClient.post).mockResolvedValue({ data: mockResponse });

      const credentials = {
        email: 'test@example.com',
        password: 'password123'
      };

      const result = await AuthAPI.login(credentials);

      expect(apiClient.post).toHaveBeenCalledWith('/auth/login', credentials);
      expect(result).toEqual(mockResponse);
    });

    it('should handle login failure', async () => {
      const errorResponse = {
        response: {
          status: 401,
          data: { message: 'Invalid credentials' }
        }
      };
      vi.mocked(apiClient.post).mockRejectedValue(errorResponse);

      const credentials = {
        email: 'test@example.com',
        password: 'wrongpassword'
      };

      await expect(AuthAPI.login(credentials)).rejects.toThrow();
    });
  });

  describe('register', () => {
    it('should register user successfully', async () => {
      const mockResponse = mockApiResponses.auth.register;
      vi.mocked(apiClient.post).mockResolvedValue({ data: mockResponse });

      const userData = {
        email: 'newuser@example.com',
        username: 'newuser',
        first_name: 'New',
        last_name: 'User',
        password: 'password123'
      };

      const result = await AuthAPI.register(userData);

      expect(apiClient.post).toHaveBeenCalledWith('/auth/register', userData);
      expect(result).toEqual(mockResponse);
    });

    it('should handle registration with existing email', async () => {
      const errorResponse = {
        response: {
          status: 400,
          data: { message: 'Email already registered' }
        }
      };
      vi.mocked(apiClient.post).mockRejectedValue(errorResponse);

      const userData = {
        email: 'existing@example.com',
        username: 'existinguser',
        first_name: 'Existing',
        last_name: 'User',
        password: 'password123'
      };

      await expect(AuthAPI.register(userData)).rejects.toThrow();
    });
  });

  describe('refreshToken', () => {
    it('should refresh token successfully', async () => {
      const mockResponse = {
        access_token: 'new_access_token',
        token_type: 'bearer'
      };
      vi.mocked(apiClient.post).mockResolvedValue({ data: mockResponse });

      const refreshToken = 'valid_refresh_token';
      const result = await AuthAPI.refreshToken(refreshToken);

      expect(apiClient.post).toHaveBeenCalledWith('/auth/refresh', {
        refresh_token: refreshToken
      });
      expect(result).toEqual(mockResponse);
    });

    it('should handle invalid refresh token', async () => {
      const errorResponse = {
        response: {
          status: 401,
          data: { message: 'Invalid refresh token' }
        }
      };
      vi.mocked(apiClient.post).mockRejectedValue(errorResponse);

      const refreshToken = 'invalid_refresh_token';

      await expect(AuthAPI.refreshToken(refreshToken)).rejects.toThrow();
    });
  });

  describe('forgotPassword', () => {
    it('should send password reset email', async () => {
      const mockResponse = { message: 'Password reset email sent' };
      vi.mocked(apiClient.post).mockResolvedValue({ data: mockResponse });

      const email = 'test@example.com';
      const result = await AuthAPI.forgotPassword(email);

      expect(apiClient.post).toHaveBeenCalledWith('/auth/forgot-password', {
        email
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('resetPassword', () => {
    it('should reset password with valid token', async () => {
      const mockResponse = { message: 'Password reset successful' };
      vi.mocked(apiClient.post).mockResolvedValue({ data: mockResponse });

      const token = 'valid_reset_token';
      const newPassword = 'newpassword123';
      const result = await AuthAPI.resetPassword(token, newPassword);

      expect(apiClient.post).toHaveBeenCalledWith('/auth/reset-password', {
        token,
        new_password: newPassword
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('verifyEmail', () => {
    it('should verify email with valid token', async () => {
      const mockResponse = { message: 'Email verified successfully' };
      vi.mocked(apiClient.post).mockResolvedValue({ data: mockResponse });

      const token = 'valid_verification_token';
      const result = await AuthAPI.verifyEmail(token);

      expect(apiClient.post).toHaveBeenCalledWith('/auth/verify-email', {
        token
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('logout', () => {
    it('should logout successfully', async () => {
      const mockResponse = { message: 'Logged out successfully' };
      vi.mocked(apiClient.post).mockResolvedValue({ data: mockResponse });

      const result = await AuthAPI.logout();

      expect(apiClient.post).toHaveBeenCalledWith('/auth/logout');
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getProfile', () => {
    it('should get user profile', async () => {
      const mockResponse = mockApiResponses.auth.profile;
      vi.mocked(apiClient.get).mockResolvedValue({ data: mockResponse });

      const result = await AuthAPI.getProfile();

      expect(apiClient.get).toHaveBeenCalledWith('/user/profile');
      expect(result).toEqual(mockResponse);
    });
  });

  describe('updateProfile', () => {
    it('should update user profile', async () => {
      const updatedUser = { ...mockUser, first_name: 'Updated' };
      vi.mocked(apiClient.put).mockResolvedValue({ data: updatedUser });

      const updateData = { first_name: 'Updated' };
      const result = await AuthAPI.updateProfile(updateData);

      expect(apiClient.put).toHaveBeenCalledWith('/user/profile', updateData);
      expect(result).toEqual(updatedUser);
    });
  });

  describe('changePassword', () => {
    it('should change password successfully', async () => {
      const mockResponse = { message: 'Password changed successfully' };
      vi.mocked(apiClient.post).mockResolvedValue({ data: mockResponse });

      const passwordData = {
        current_password: 'oldpassword',
        new_password: 'newpassword123'
      };
      const result = await AuthAPI.changePassword(passwordData);

      expect(apiClient.post).toHaveBeenCalledWith('/user/change-password', passwordData);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('deactivateAccount', () => {
    it('should deactivate account successfully', async () => {
      const mockResponse = { message: 'Account deactivated successfully' };
      vi.mocked(apiClient.post).mockResolvedValue({ data: mockResponse });

      const password = 'currentpassword';
      const result = await AuthAPI.deactivateAccount(password);

      expect(apiClient.post).toHaveBeenCalledWith('/user/deactivate', {
        password
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('exportUserData', () => {
    it('should export user data successfully', async () => {
      const mockResponse = { download_url: 'https://example.com/export.zip' };
      vi.mocked(apiClient.post).mockResolvedValue({ data: mockResponse });

      const result = await AuthAPI.exportUserData();

      expect(apiClient.post).toHaveBeenCalledWith('/user/export-data');
      expect(result).toEqual(mockResponse);
    });
  });
});