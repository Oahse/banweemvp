/**
 * Tests for Payments API - Comprehensive test suite aligned with backend reality
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { PaymentsAPI } from '../../api/payments';
import { apiClient, TokenManager } from '../../api/client';

// Mock the API client and TokenManager
vi.mock('../../api/client', () => ({
  apiClient: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn()
  },
  TokenManager: {
    getToken: vi.fn()
  }
}));

const mockApiClient = vi.mocked(apiClient);
const mockTokenManager = vi.mocked(TokenManager);

describe('PaymentsAPI', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Mock console methods to avoid noise in tests
    vi.spyOn(console, 'log').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('getPaymentMethods', () => {
    it('should get user payment methods with authentication', async () => {
      const mockToken = 'token123';
      mockTokenManager.getToken.mockReturnValue(mockToken);

      const mockResponse = {
        success: true,
        data: [
          {
            id: 'pm_123',
            type: 'card',
            card: {
              brand: 'visa',
              last4: '4242',
              exp_month: 12,
              exp_year: 2025
            },
            is_default: true,
            created_at: '2024-01-01T00:00:00Z'
          },
          {
            id: 'pm_456',
            type: 'card',
            card: {
              brand: 'mastercard',
              last4: '5555',
              exp_month: 6,
              exp_year: 2026
            },
            is_default: false,
            created_at: '2024-01-02T00:00:00Z'
          }
        ]
      };

      mockApiClient.get.mockResolvedValue(mockResponse);

      const result = await PaymentsAPI.getPaymentMethods();

      expect(console.log).toHaveBeenCalledWith('PaymentsAPI: Making request to /v1/payments/methods');
      expect(console.log).toHaveBeenCalledWith('PaymentsAPI: Token available:', true);
      expect(console.log).toHaveBeenCalledWith('PaymentsAPI.getPaymentMethods response:', mockResponse);
      expect(mockApiClient.get).toHaveBeenCalledWith('/v1/payments/methods', {});
      expect(result).toEqual(mockResponse);
    });

    it('should handle case when no token is available', async () => {
      mockTokenManager.getToken.mockReturnValue(null);

      const mockResponse = {
        success: true,
        data: []
      };

      mockApiClient.get.mockResolvedValue(mockResponse);

      const result = await PaymentsAPI.getPaymentMethods();

      expect(console.log).toHaveBeenCalledWith('PaymentsAPI: Token available:', false);
      expect(result).toEqual(mockResponse);
    });

    it('should handle API errors and log them', async () => {
      const mockError = {
        response: {
          status: 401,
          data: {
            message: 'Unauthorized'
          }
        }
      };

      mockApiClient.get.mockRejectedValue(mockError);

      await expect(PaymentsAPI.getPaymentMethods()).rejects.toEqual(mockError);
      expect(console.error).toHaveBeenCalledWith('PaymentsAPI: Error fetching payment methods:', mockError);
    });

    it('should handle network errors', async () => {
      const networkError = new Error('Network error');
      mockApiClient.get.mockRejectedValue(networkError);

      await expect(PaymentsAPI.getPaymentMethods()).rejects.toEqual(networkError);
      expect(console.error).toHaveBeenCalledWith('PaymentsAPI: Error fetching payment methods:', networkError);
    });
  });

  describe('addPaymentMethod', () => {
    it('should add new payment method with correct backend format', async () => {
      const paymentMethodData = {
        type: 'card',
        card: {
          number: '4242424242424242',
          exp_month: 12,
          exp_year: 2025,
          cvc: '123'
        },
        billing_address: {
          line1: '123 Main St',
          city: 'New York',
          state: 'NY',
          postal_code: '10001',
          country: 'US'
        }
      };

      const mockResponse = {
        success: true,
        data: {
          id: 'pm_new123',
          type: 'card',
          card: {
            brand: 'visa',
            last4: '4242',
            exp_month: 12,
            exp_year: 2025
          },
          is_default: false,
          created_at: '2024-01-15T10:00:00Z'
        },
        message: 'Payment method added successfully'
      };

      mockApiClient.post.mockResolvedValue(mockResponse);

      const result = await PaymentsAPI.addPaymentMethod(paymentMethodData);

      expect(mockApiClient.post).toHaveBeenCalledWith('/v1/payments/methods', paymentMethodData, {});
      expect(result).toEqual(mockResponse);
    });

    it('should handle validation errors when adding payment method', async () => {
      const invalidData = {
        type: 'card',
        card: {
          number: '1234', // Invalid card number
          exp_month: 13, // Invalid month
          exp_year: 2020, // Expired year
          cvc: '12' // Invalid CVC
        }
      };

      const mockError = {
        response: {
          status: 422,
          data: {
            message: 'Validation error',
            details: {
              'card.number': ['Invalid card number'],
              'card.exp_month': ['Invalid expiration month'],
              'card.exp_year': ['Card has expired'],
              'card.cvc': ['Invalid CVC']
            }
          }
        }
      };

      mockApiClient.post.mockRejectedValue(mockError);

      await expect(PaymentsAPI.addPaymentMethod(invalidData)).rejects.toEqual(mockError);
    });
  });

  describe('updatePaymentMethod', () => {
    it('should update existing payment method', async () => {
      const paymentMethodId = 'pm_123';
      const updateData = {
        billing_address: {
          line1: '456 Oak Ave',
          city: 'Los Angeles',
          state: 'CA',
          postal_code: '90210',
          country: 'US'
        },
        is_default: true
      };

      const mockResponse = {
        success: true,
        data: {
          id: paymentMethodId,
          type: 'card',
          card: {
            brand: 'visa',
            last4: '4242',
            exp_month: 12,
            exp_year: 2025
          },
          billing_address: updateData.billing_address,
          is_default: true,
          updated_at: '2024-01-15T10:00:00Z'
        },
        message: 'Payment method updated successfully'
      };

      mockApiClient.put.mockResolvedValue(mockResponse);

      const result = await PaymentsAPI.updatePaymentMethod(paymentMethodId, updateData);

      expect(mockApiClient.put).toHaveBeenCalledWith(`/v1/payments/methods/${paymentMethodId}`, updateData, {});
      expect(result).toEqual(mockResponse);
    });

    it('should handle payment method not found error', async () => {
      const paymentMethodId = 'pm_nonexistent';
      const updateData = { is_default: true };

      const mockError = {
        response: {
          status: 404,
          data: {
            message: 'Payment method not found'
          }
        }
      };

      mockApiClient.put.mockRejectedValue(mockError);

      await expect(PaymentsAPI.updatePaymentMethod(paymentMethodId, updateData)).rejects.toEqual(mockError);
    });
  });

  describe('deletePaymentMethod', () => {
    it('should delete payment method', async () => {
      const paymentMethodId = 'pm_123';

      const mockResponse = {
        success: true,
        message: 'Payment method deleted successfully'
      };

      mockApiClient.delete.mockResolvedValue(mockResponse);

      const result = await PaymentsAPI.deletePaymentMethod(paymentMethodId);

      expect(mockApiClient.delete).toHaveBeenCalledWith(`/v1/payments/methods/${paymentMethodId}`, {});
      expect(result).toEqual(mockResponse);
    });

    it('should handle deletion of non-existent payment method', async () => {
      const paymentMethodId = 'pm_nonexistent';

      const mockError = {
        response: {
          status: 404,
          data: {
            message: 'Payment method not found'
          }
        }
      };

      mockApiClient.delete.mockRejectedValue(mockError);

      await expect(PaymentsAPI.deletePaymentMethod(paymentMethodId)).rejects.toEqual(mockError);
    });

    it('should handle deletion of default payment method error', async () => {
      const paymentMethodId = 'pm_default';

      const mockError = {
        response: {
          status: 400,
          data: {
            message: 'Cannot delete default payment method. Please set another payment method as default first.'
          }
        }
      };

      mockApiClient.delete.mockRejectedValue(mockError);

      await expect(PaymentsAPI.deletePaymentMethod(paymentMethodId)).rejects.toEqual(mockError);
    });
  });

  describe('setDefaultPaymentMethod', () => {
    it('should set payment method as default', async () => {
      const paymentMethodId = 'pm_456';

      const mockResponse = {
        success: true,
        data: {
          id: paymentMethodId,
          type: 'card',
          card: {
            brand: 'mastercard',
            last4: '5555',
            exp_month: 6,
            exp_year: 2026
          },
          is_default: true,
          updated_at: '2024-01-15T10:00:00Z'
        },
        message: 'Default payment method updated successfully'
      };

      mockApiClient.put.mockResolvedValue(mockResponse);

      const result = await PaymentsAPI.setDefaultPaymentMethod(paymentMethodId);

      expect(mockApiClient.put).toHaveBeenCalledWith(`/v1/payments/methods/${paymentMethodId}/default`, {}, {});
      expect(result).toEqual(mockResponse);
    });

    it('should handle setting non-existent payment method as default', async () => {
      const paymentMethodId = 'pm_nonexistent';

      const mockError = {
        response: {
          status: 404,
          data: {
            message: 'Payment method not found'
          }
        }
      };

      mockApiClient.put.mockRejectedValue(mockError);

      await expect(PaymentsAPI.setDefaultPaymentMethod(paymentMethodId)).rejects.toEqual(mockError);
    });

    it('should handle unauthorized access to payment method', async () => {
      const paymentMethodId = 'pm_unauthorized';

      const mockError = {
        response: {
          status: 403,
          data: {
            message: 'You do not have permission to modify this payment method'
          }
        }
      };

      mockApiClient.put.mockRejectedValue(mockError);

      await expect(PaymentsAPI.setDefaultPaymentMethod(paymentMethodId)).rejects.toEqual(mockError);
    });
  });

  describe('Error Handling', () => {
    it('should handle authentication errors consistently across all methods', async () => {
      const authError = {
        response: {
          status: 401,
          data: {
            message: 'Authentication required'
          }
        }
      };

      mockApiClient.get.mockRejectedValue(authError);
      mockApiClient.post.mockRejectedValue(authError);
      mockApiClient.put.mockRejectedValue(authError);
      mockApiClient.delete.mockRejectedValue(authError);

      await expect(PaymentsAPI.getPaymentMethods()).rejects.toEqual(authError);
      await expect(PaymentsAPI.addPaymentMethod({})).rejects.toEqual(authError);
      await expect(PaymentsAPI.updatePaymentMethod('pm_123', {})).rejects.toEqual(authError);
      await expect(PaymentsAPI.deletePaymentMethod('pm_123')).rejects.toEqual(authError);
      await expect(PaymentsAPI.setDefaultPaymentMethod('pm_123')).rejects.toEqual(authError);
    });

    it('should handle server errors consistently', async () => {
      const serverError = {
        response: {
          status: 500,
          data: {
            message: 'Internal server error'
          }
        }
      };

      mockApiClient.get.mockRejectedValue(serverError);

      await expect(PaymentsAPI.getPaymentMethods()).rejects.toEqual(serverError);
    });

    it('should handle network timeouts', async () => {
      const timeoutError = {
        code: 'ECONNABORTED',
        message: 'timeout of 5000ms exceeded'
      };

      mockApiClient.post.mockRejectedValue(timeoutError);

      await expect(PaymentsAPI.addPaymentMethod({})).rejects.toEqual(timeoutError);
    });
  });

  describe('Integration with Stripe', () => {
    it('should handle Stripe-specific payment method data', async () => {
      const stripePaymentMethodData = {
        type: 'card',
        stripe_payment_method_id: 'pm_stripe_123',
        card: {
          brand: 'visa',
          last4: '4242',
          exp_month: 12,
          exp_year: 2025,
          funding: 'credit'
        },
        billing_details: {
          name: 'John Doe',
          email: 'john@example.com',
          address: {
            line1: '123 Main St',
            city: 'New York',
            state: 'NY',
            postal_code: '10001',
            country: 'US'
          }
        }
      };

      const mockResponse = {
        success: true,
        data: {
          id: 'pm_banwee_123',
          stripe_payment_method_id: 'pm_stripe_123',
          type: 'card',
          card: stripePaymentMethodData.card,
          billing_details: stripePaymentMethodData.billing_details,
          is_default: false
        }
      };

      mockApiClient.post.mockResolvedValue(mockResponse);

      const result = await PaymentsAPI.addPaymentMethod(stripePaymentMethodData);

      expect(result).toEqual(mockResponse);
    });

    it('should handle Stripe webhook validation errors', async () => {
      const invalidStripeData = {
        type: 'card',
        stripe_payment_method_id: 'pm_invalid'
      };

      const stripeError = {
        response: {
          status: 400,
          data: {
            message: 'Invalid Stripe payment method',
            code: 'STRIPE_VALIDATION_ERROR',
            details: {
              stripe_error: 'No such payment method: pm_invalid'
            }
          }
        }
      };

      mockApiClient.post.mockRejectedValue(stripeError);

      await expect(PaymentsAPI.addPaymentMethod(invalidStripeData)).rejects.toEqual(stripeError);
    });
  });
});