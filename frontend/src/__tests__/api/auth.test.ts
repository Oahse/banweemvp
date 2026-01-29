/**
 * Tests for Auth API - Comprehensive test suite aligned with backend reality
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AuthAPI } from '../../api/auth';
import { apiClient, TokenManager } from '../../api/client';

// Mock the API client
vi.mock('../../api/client', () => ({
  apiClient: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn()
  },
  TokenManager: {
    setToken: vi.fn(),
    setRefreshToken: vi.fn(),
    setUser: vi.fn(),
    clearTokens: vi.fn(),
    getRefreshToken: vi.fn(),
    isAuthenticated: vi.fn(),
    getUser: vi.fn()
  }
}));

const mockApiClient = vi.mocked(apiClient);
const mockTokenManager = vi.mocked(TokenManager);

describe('AuthAPI', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('register', () => {
    it('should register a new user with correct backend format', async () => {
      const registerData = {
        email: 'test@example.com',
        password: 'password123',
        firstname: 'John',
        lastname: 'Doe'
      };

      const mockResponse = {
        success: true,
        data: {
          id: 'user123',
          email: 'test@example.com',
          firstname: 'John',
          lastname: 'Doe'
        },
        message: 'User registered successfully'
      };

      mockApiClient.post.mockResolvedValue(mockResponse);

      const result = await AuthAPI.register(registerData);

      expect(mockApiClient.post).toHaveBeenCalledWith('/v1/auth/register', registerData);
      expect(result).toEqual(mockResponse);
      // Should not set tokens automatically - let AuthContext handle it
      expect(mockTokenManager.setToken).not.toHaveBeenCalled();
    });

    it('should handle registration errors', async () => {
      const registerData = {
        email: 'invalid-email',
        password: '123',
        firstname: 'John',
        lastname: 'Doe'
      };

      const mockError = {
        response: {
          status: 422,
          data: {
            message: 'Validation error',
            details: {
              email: ['Invalid email format'],
              password: ['Password must be at least 8 characters']
            }
          }
        }
      };

      mockApiClient.post.mockRejectedValue(mockError);

      await expect(AuthAPI.register(registerData)).rejects.toEqual(mockError);
    });
  });

  describe('login', () => {
    it('should login user with correct backend format', async () => {
      const loginData = {
        email: 'test@example.com',
        password: 'password123'
      };

      const mockResponse = {
        success: true,
        data: {
          access_token: 'token123',
          refresh_token: 'refresh123',
          user: {
            id: 'user123',
            email: 'test@example.com',
            firstname: 'John',
            lastname: 'Doe'
          }
        },
        message: 'Login successful'
      };

      mockApiClient.post.mockResolvedValue(mockResponse);

      const result = await AuthAPI.login(loginData);

      expect(mockApiClient.post).toHaveBeenCalledWith('/v1/auth/login', loginData);
      expect(result).toEqual(mockResponse);
      // Should not set tokens automatically - let AuthContext handle it
      expect(mockTokenManager.setToken).not.toHaveBeenCalled();
    });

    it('should handle login errors', async () => {
      const loginData = {
        email: 'test@example.com',
        password: 'wrongpassword'
      };

      const mockError = {
        response: {
          status: 401,
          data: {
            message: 'Invalid credentials'
          }
        }
      };

      mockApiClient.post.mockRejectedValue(mockError);

      await expect(AuthAPI.login(loginData)).rejects.toEqual(mockError);
    });
  });

  describe('logout', () => {
    it('should logout user and clear tokens', async () => {
      mockApiClient.post.mockResolvedValue({ success: true });

      await AuthAPI.logout();

      expect(mockApiClient.post).toHaveBeenCalledWith('/v1/auth/logout');
      expect(mockTokenManager.clearTokens).toHaveBeenCalled();
    });

    it('should clear tokens even if API call fails', async () => {
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      mockApiClient.post.mockRejectedValue(new Error('Network error'));

      await AuthAPI.logout();

      expect(mockTokenManager.clearTokens).toHaveBeenCalled();
      expect(consoleSpy).toHaveBeenCalledWith('Logout API call failed:', expect.any(Error));
      
      consoleSpy.mockRestore();
    });
  });

  describe('getProfile', () => {
    it('should get user profile with correct backend format', async () => {
      const mockResponse = {
        success: true,
        data: {
          id: 'user123',
          email: 'test@example.com',
          firstname: 'John',
          lastname: 'Doe',
          full_name: 'John Doe',
          phone: '+1234567890',
          role: 'Customer',
          verified: true,
          is_active: true,
          created_at: '2024-01-01T00:00:00Z'
        }
      };

      mockApiClient.get.mockResolvedValue(mockResponse);

      const result = await AuthAPI.getProfile();

      expect(mockApiClient.get).toHaveBeenCalledWith('/v1/auth/profile');
      expect(result).toEqual(mockResponse);
    });
  });

  describe('updateProfile', () => {
    it('should update user profile and store updated user data', async () => {
      const profileData = {
        firstname: 'Jane',
        lastname: 'Smith',
        email: 'jane@example.com'
      };

      const mockResponse = {
        success: true,
        data: {
          id: 'user123',
          email: 'jane@example.com',
          firstname: 'Jane',
          lastname: 'Smith',
          full_name: 'Jane Smith'
        },
        message: 'Profile updated successfully'
      };

      mockApiClient.put.mockResolvedValue(mockResponse);

      const result = await AuthAPI.updateProfile(profileData);

      expect(mockApiClient.put).toHaveBeenCalledWith('/v1/auth/profile', profileData);
      expect(mockTokenManager.setUser).toHaveBeenCalledWith(mockResponse.data);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('changePassword', () => {
    it('should change password with correct format', async () => {
      const passwordData = {
        current_password: 'oldpassword',
        new_password: 'newpassword123'
      };

      const mockResponse = {
        success: true,
        message: 'Password changed successfully'
      };

      mockApiClient.put.mockResolvedValue(mockResponse);

      const result = await AuthAPI.changePassword(passwordData);

      expect(mockApiClient.put).toHaveBeenCalledWith('/v1/auth/change-password', passwordData);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('requestPasswordReset', () => {
    it('should request password reset', async () => {
      const email = 'test@example.com';
      const mockResponse = {
        success: true,
        message: 'Password reset email sent'
      };

      mockApiClient.post.mockResolvedValue(mockResponse);

      const result = await AuthAPI.requestPasswordReset(email);

      expect(mockApiClient.post).toHaveBeenCalledWith('/v1/auth/forgot-password', { email });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('forgotPassword', () => {
    it('should be an alias for requestPasswordReset', async () => {
      const email = 'test@example.com';
      const mockResponse = {
        success: true,
        message: 'Password reset email sent'
      };

      mockApiClient.post.mockResolvedValue(mockResponse);

      const result = await AuthAPI.forgotPassword(email);

      expect(mockApiClient.post).toHaveBeenCalledWith('/v1/auth/forgot-password', { email });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('resetPassword', () => {
    it('should reset password with token', async () => {
      const resetData = {
        token: 'reset-token-123',
        password: 'newpassword123'
      };

      const mockResponse = {
        success: true,
        message: 'Password reset successfully'
      };

      mockApiClient.post.mockResolvedValue(mockResponse);

      const result = await AuthAPI.resetPassword(resetData);

      expect(mockApiClient.post).toHaveBeenCalledWith('/v1/auth/reset-password', resetData);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('verifyEmail', () => {
    it('should verify email with token', async () => {
      const token = 'verify-token-123';
      const mockResponse = {
        success: true,
        message: 'Email verified successfully'
      };

      mockApiClient.get.mockResolvedValue(mockResponse);

      const result = await AuthAPI.verifyEmail(token);

      expect(mockApiClient.get).toHaveBeenCalledWith(`/v1/auth/verify-email?token=${token}`);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('refreshToken', () => {
    it('should refresh access token', async () => {
      const refreshToken = 'refresh123';
      mockTokenManager.getRefreshToken.mockReturnValue(refreshToken);

      const mockResponse = {
        success: true,
        data: {
          access_token: 'new-token-123'
        },
        message: 'Token refreshed successfully'
      };

      mockApiClient.post.mockResolvedValue(mockResponse);

      const result = await AuthAPI.refreshToken();

      expect(mockApiClient.post).toHaveBeenCalledWith('/v1/auth/refresh', {
        refresh_token: refreshToken
      });
      expect(mockTokenManager.setToken).toHaveBeenCalledWith('new-token-123');
      expect(result).toEqual(mockResponse);
    });

    it('should throw error if no refresh token available', async () => {
      mockTokenManager.getRefreshToken.mockReturnValue(null);

      await expect(AuthAPI.refreshToken()).rejects.toThrow('No refresh token available');
    });

    it('should clear tokens on refresh failure', async () => {
      const refreshToken = 'refresh123';
      mockTokenManager.getRefreshToken.mockReturnValue(refreshToken);
      mockApiClient.post.mockRejectedValue(new Error('Invalid refresh token'));

      await expect(AuthAPI.refreshToken()).rejects.toThrow('Invalid refresh token');
      expect(mockTokenManager.clearTokens).toHaveBeenCalled();
    });
  });

  describe('Address Management', () => {
    describe('getAddresses', () => {
      it('should get user addresses', async () => {
        const mockResponse = {
          success: true,
          data: [
            {
              id: 'addr123',
              street: '123 Main St',
              city: 'New York',
              state: 'NY',
              postal_code: '10001',
              country: 'US'
            }
          ]
        };

        mockApiClient.get.mockResolvedValue(mockResponse);

        const result = await AuthAPI.getAddresses();

        expect(mockApiClient.get).toHaveBeenCalledWith('/v1/auth/addresses');
        expect(result).toEqual(mockResponse);
      });
    });

    describe('createAddress', () => {
      it('should create new address', async () => {
        const addressData = {
          street: '456 Oak Ave',
          city: 'Los Angeles',
          state: 'CA',
          postal_code: '90210',
          country: 'US'
        };

        const mockResponse = {
          success: true,
          data: {
            id: 'addr456',
            ...addressData
          },
          message: 'Address created successfully'
        };

        mockApiClient.post.mockResolvedValue(mockResponse);

        const result = await AuthAPI.createAddress(addressData);

        expect(mockApiClient.post).toHaveBeenCalledWith('/v1/auth/addresses', addressData);
        expect(result).toEqual(mockResponse);
      });
    });

    describe('updateAddress', () => {
      it('should update existing address', async () => {
        const addressId = 'addr123';
        const addressData = {
          street: '789 Pine St'
        };

        const mockResponse = {
          success: true,
          data: {
            id: addressId,
            street: '789 Pine St',
            city: 'New York',
            state: 'NY'
          },
          message: 'Address updated successfully'
        };

        mockApiClient.put.mockResolvedValue(mockResponse);

        const result = await AuthAPI.updateAddress(addressId, addressData);

        expect(mockApiClient.put).toHaveBeenCalledWith(`/v1/auth/addresses/${addressId}`, addressData);
        expect(result).toEqual(mockResponse);
      });
    });

    describe('deleteAddress', () => {
      it('should delete address', async () => {
        const addressId = 'addr123';
        const mockResponse = {
          success: true,
          message: 'Address deleted successfully'
        };

        mockApiClient.delete.mockResolvedValue(mockResponse);

        const result = await AuthAPI.deleteAddress(addressId);

        expect(mockApiClient.delete).toHaveBeenCalledWith(`/v1/auth/addresses/${addressId}`);
        expect(result).toEqual(mockResponse);
      });
    });
  });

  describe('Utility Methods', () => {
    describe('isAuthenticated', () => {
      it('should return authentication status from TokenManager', () => {
        mockTokenManager.isAuthenticated.mockReturnValue(true);

        const result = AuthAPI.isAuthenticated();

        expect(mockTokenManager.isAuthenticated).toHaveBeenCalled();
        expect(result).toBe(true);
      });
    });

    describe('getCurrentUser', () => {
      it('should return current user from TokenManager', () => {
        const mockUser = {
          id: 'user123',
          email: 'test@example.com',
          firstname: 'John'
        };

        mockTokenManager.getUser.mockReturnValue(mockUser);

        const result = AuthAPI.getCurrentUser();

        expect(mockTokenManager.getUser).toHaveBeenCalled();
        expect(result).toEqual(mockUser);
      });
    });

    describe('deleteAccount', () => {
      it('should delete user account and clear tokens', async () => {
        const password = 'password123';
        const mockResponse = {
          success: true,
          message: 'Account deleted successfully'
        };

        mockApiClient.delete.mockResolvedValue(mockResponse);

        const result = await AuthAPI.deleteAccount(password);

        expect(mockApiClient.delete).toHaveBeenCalledWith('/v1/users', {
          data: { password }
        });
        expect(mockTokenManager.clearTokens).toHaveBeenCalled();
        expect(result).toEqual(mockResponse);
      });
    });
  });
});