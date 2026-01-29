/**
 * Tests for Shipping API - Comprehensive test suite aligned with backend reality
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ShippingAPI from '../../api/shipping';
import { apiClient } from '../../api/client';

// Mock the API client
vi.mock('../../api/client', () => ({
  apiClient: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn()
  }
}));

const mockApiClient = vi.mocked(apiClient);

describe('ShippingAPI', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getShippingMethods', () => {
    it('should get all active shipping methods', async () => {
      const mockResponse = {
        success: true,
        data: {
          data: [
            {
              id: 'ship_standard',
              name: 'Standard Shipping',
              description: '5-7 business days',
              price: 5.99,
              estimated_days: 6,
              is_active: true,
              carrier: 'USPS',
              tracking_url_template: 'https://tools.usps.com/go/TrackConfirmAction?tLabels={tracking_number}',
              created_at: '2024-01-01T00:00:00Z',
              updated_at: '2024-01-01T00:00:00Z'
            },
            {
              id: 'ship_express',
              name: 'Express Shipping',
              description: '2-3 business days',
              price: 12.99,
              estimated_days: 2,
              is_active: true,
              carrier: 'UPS',
              tracking_url_template: 'https://www.ups.com/track?tracknum={tracking_number}',
              created_at: '2024-01-01T00:00:00Z',
              updated_at: '2024-01-01T00:00:00Z'
            }
          ]
        }
      };

      mockApiClient.get.mockResolvedValue(mockResponse);

      const result = await ShippingAPI.getShippingMethods();

      expect(mockApiClient.get).toHaveBeenCalledWith('/v1/shipping/methods', {});
      expect(result).toEqual(mockResponse.data.data);
    });

    it('should handle empty shipping methods response', async () => {
      const mockResponse = {
        success: true,
        data: {
          data: []
        }
      };

      mockApiClient.get.mockResolvedValue(mockResponse);

      const result = await ShippingAPI.getShippingMethods();

      expect(result).toEqual([]);
    });

    it('should handle API errors when fetching shipping methods', async () => {
      const mockError = {
        response: {
          status: 500,
          data: {
            message: 'Internal server error'
          }
        }
      };

      mockApiClient.get.mockRejectedValue(mockError);

      await expect(ShippingAPI.getShippingMethods()).rejects.toEqual(mockError);
    });
  });

  describe('getShippingMethod', () => {
    it('should get specific shipping method by ID', async () => {
      const methodId = 'ship_express';
      const mockResponse = {
        success: true,
        data: {
          data: {
            id: methodId,
            name: 'Express Shipping',
            description: '2-3 business days',
            price: 12.99,
            estimated_days: 2,
            is_active: true,
            carrier: 'UPS',
            tracking_url_template: 'https://www.ups.com/track?tracknum={tracking_number}',
            created_at: '2024-01-01T00:00:00Z',
            updated_at: '2024-01-01T00:00:00Z'
          }
        }
      };

      mockApiClient.get.mockResolvedValue(mockResponse);

      const result = await ShippingAPI.getShippingMethod(methodId);

      expect(mockApiClient.get).toHaveBeenCalledWith(`/v1/shipping/methods/${methodId}`, {});
      expect(result).toEqual(mockResponse.data.data);
    });

    it('should handle shipping method not found', async () => {
      const methodId = 'ship_nonexistent';
      const mockError = {
        response: {
          status: 404,
          data: {
            message: 'Shipping method not found'
          }
        }
      };

      mockApiClient.get.mockRejectedValue(mockError);

      await expect(ShippingAPI.getShippingMethod(methodId)).rejects.toEqual(mockError);
    });
  });

  describe('calculateShippingCost', () => {
    it('should calculate shipping cost with order amount only', async () => {
      const orderAmount = 100.00;
      const mockResponse = {
        success: true,
        data: {
          data: {
            shipping_cost: 5.99,
            order_amount: orderAmount,
            shipping_method_id: 'ship_standard'
          }
        }
      };

      mockApiClient.post.mockResolvedValue(mockResponse);

      const result = await ShippingAPI.calculateShippingCost(orderAmount);

      expect(mockApiClient.post).toHaveBeenCalledWith('/v1/shipping/calculate?order_amount=100');
      expect(result).toEqual(mockResponse.data.data);
    });

    it('should calculate shipping cost with specific shipping method', async () => {
      const orderAmount = 150.00;
      const shippingMethodId = 'ship_express';
      const mockResponse = {
        success: true,
        data: {
          data: {
            shipping_cost: 12.99,
            order_amount: orderAmount,
            shipping_method_id: shippingMethodId
          }
        }
      };

      mockApiClient.post.mockResolvedValue(mockResponse);

      const result = await ShippingAPI.calculateShippingCost(orderAmount, shippingMethodId);

      expect(mockApiClient.post).toHaveBeenCalledWith('/v1/shipping/calculate?order_amount=150&shipping_method_id=ship_express');
      expect(result).toEqual(mockResponse.data.data);
    });

    it('should handle free shipping threshold', async () => {
      const orderAmount = 200.00; // Above free shipping threshold
      const mockResponse = {
        success: true,
        data: {
          data: {
            shipping_cost: 0.00,
            order_amount: orderAmount,
            shipping_method_id: 'ship_standard',
            free_shipping_applied: true,
            free_shipping_threshold: 150.00
          }
        }
      };

      mockApiClient.post.mockResolvedValue(mockResponse);

      const result = await ShippingAPI.calculateShippingCost(orderAmount);

      expect(result.shipping_cost).toBe(0.00);
      expect(result.free_shipping_applied).toBe(true);
    });

    it('should handle invalid order amount', async () => {
      const invalidAmount = -10;
      const mockError = {
        response: {
          status: 422,
          data: {
            message: 'Validation error',
            details: {
              order_amount: ['Order amount must be positive']
            }
          }
        }
      };

      mockApiClient.post.mockRejectedValue(mockError);

      await expect(ShippingAPI.calculateShippingCost(invalidAmount)).rejects.toEqual(mockError);
    });
  });

  describe('Admin Endpoints', () => {
    describe('createShippingMethod', () => {
      it('should create new shipping method', async () => {
        const methodData = {
          name: 'Overnight Shipping',
          description: 'Next business day delivery',
          price: 24.99,
          estimated_days: 1,
          is_active: true,
          carrier: 'FedEx'
        };

        const mockResponse = {
          success: true,
          data: {
            data: {
              id: 'ship_overnight',
              ...methodData,
              tracking_url_template: 'https://www.fedex.com/fedextrack/?tracknum={tracking_number}',
              created_at: '2024-01-15T10:00:00Z',
              updated_at: '2024-01-15T10:00:00Z'
            }
          },
          message: 'Shipping method created successfully'
        };

        mockApiClient.post.mockResolvedValue(mockResponse);

        const result = await ShippingAPI.createShippingMethod(methodData);

        expect(mockApiClient.post).toHaveBeenCalledWith('/v1/shipping/methods', methodData);
        expect(result).toEqual(mockResponse.data.data);
      });

      it('should handle validation errors when creating shipping method', async () => {
        const invalidMethodData = {
          name: '', // Empty name
          price: -5, // Negative price
          estimated_days: 0 // Invalid days
        };

        const mockError = {
          response: {
            status: 422,
            data: {
              message: 'Validation error',
              details: {
                name: ['Name is required'],
                price: ['Price must be positive'],
                estimated_days: ['Estimated days must be at least 1']
              }
            }
          }
        };

        mockApiClient.post.mockRejectedValue(mockError);

        await expect(ShippingAPI.createShippingMethod(invalidMethodData)).rejects.toEqual(mockError);
      });

      it('should handle unauthorized access for admin endpoints', async () => {
        const methodData = {
          name: 'Test Shipping',
          price: 10.00,
          estimated_days: 3
        };

        const mockError = {
          response: {
            status: 403,
            data: {
              message: 'Admin access required'
            }
          }
        };

        mockApiClient.post.mockRejectedValue(mockError);

        await expect(ShippingAPI.createShippingMethod(methodData)).rejects.toEqual(mockError);
      });
    });

    describe('updateShippingMethod', () => {
      it('should update existing shipping method', async () => {
        const methodId = 'ship_standard';
        const updateData = {
          name: 'Standard Shipping (Updated)',
          price: 6.99,
          description: '5-7 business days with tracking'
        };

        const mockResponse = {
          success: true,
          data: {
            data: {
              id: methodId,
              name: 'Standard Shipping (Updated)',
              description: '5-7 business days with tracking',
              price: 6.99,
              estimated_days: 6,
              is_active: true,
              carrier: 'USPS',
              updated_at: '2024-01-15T10:00:00Z'
            }
          },
          message: 'Shipping method updated successfully'
        };

        mockApiClient.put.mockResolvedValue(mockResponse);

        const result = await ShippingAPI.updateShippingMethod(methodId, updateData);

        expect(mockApiClient.put).toHaveBeenCalledWith(`/v1/shipping/methods/${methodId}`, updateData);
        expect(result).toEqual(mockResponse.data.data);
      });

      it('should handle partial updates', async () => {
        const methodId = 'ship_express';
        const partialUpdate = {
          price: 14.99
        };

        const mockResponse = {
          success: true,
          data: {
            data: {
              id: methodId,
              name: 'Express Shipping',
              description: '2-3 business days',
              price: 14.99, // Updated price
              estimated_days: 2,
              is_active: true,
              carrier: 'UPS',
              updated_at: '2024-01-15T10:00:00Z'
            }
          }
        };

        mockApiClient.put.mockResolvedValue(mockResponse);

        const result = await ShippingAPI.updateShippingMethod(methodId, partialUpdate);

        expect(result.price).toBe(14.99);
        expect(result.name).toBe('Express Shipping'); // Unchanged
      });

      it('should handle shipping method not found during update', async () => {
        const methodId = 'ship_nonexistent';
        const updateData = { price: 10.00 };

        const mockError = {
          response: {
            status: 404,
            data: {
              message: 'Shipping method not found'
            }
          }
        };

        mockApiClient.put.mockRejectedValue(mockError);

        await expect(ShippingAPI.updateShippingMethod(methodId, updateData)).rejects.toEqual(mockError);
      });
    });

    describe('deleteShippingMethod', () => {
      it('should delete shipping method', async () => {
        const methodId = 'ship_old';
        const mockResponse = {
          success: true,
          data: {
            data: {
              deleted: true
            }
          },
          message: 'Shipping method deleted successfully'
        };

        mockApiClient.delete.mockResolvedValue(mockResponse);

        const result = await ShippingAPI.deleteShippingMethod(methodId);

        expect(mockApiClient.delete).toHaveBeenCalledWith(`/v1/shipping/methods/${methodId}`);
        expect(result).toEqual(mockResponse.data.data);
      });

      it('should handle deletion of non-existent shipping method', async () => {
        const methodId = 'ship_nonexistent';
        const mockError = {
          response: {
            status: 404,
            data: {
              message: 'Shipping method not found'
            }
          }
        };

        mockApiClient.delete.mockRejectedValue(mockError);

        await expect(ShippingAPI.deleteShippingMethod(methodId)).rejects.toEqual(mockError);
      });

      it('should handle deletion of shipping method in use', async () => {
        const methodId = 'ship_in_use';
        const mockError = {
          response: {
            status: 400,
            data: {
              message: 'Cannot delete shipping method that is currently in use by active orders',
              code: 'SHIPPING_METHOD_IN_USE'
            }
          }
        };

        mockApiClient.delete.mockRejectedValue(mockError);

        await expect(ShippingAPI.deleteShippingMethod(methodId)).rejects.toEqual(mockError);
      });
    });
  });

  describe('Error Handling', () => {
    it('should handle network timeouts', async () => {
      const timeoutError = {
        code: 'ECONNABORTED',
        message: 'timeout of 5000ms exceeded'
      };

      mockApiClient.get.mockRejectedValue(timeoutError);

      await expect(ShippingAPI.getShippingMethods()).rejects.toEqual(timeoutError);
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

      mockApiClient.post.mockRejectedValue(serverError);

      await expect(ShippingAPI.calculateShippingCost(100)).rejects.toEqual(serverError);
    });

    it('should handle authentication errors for admin operations', async () => {
      const authError = {
        response: {
          status: 401,
          data: {
            message: 'Authentication required'
          }
        }
      };

      mockApiClient.post.mockRejectedValue(authError);
      mockApiClient.put.mockRejectedValue(authError);
      mockApiClient.delete.mockRejectedValue(authError);

      await expect(ShippingAPI.createShippingMethod({})).rejects.toEqual(authError);
      await expect(ShippingAPI.updateShippingMethod('ship_123', {})).rejects.toEqual(authError);
      await expect(ShippingAPI.deleteShippingMethod('ship_123')).rejects.toEqual(authError);
    });
  });

  describe('Integration Scenarios', () => {
    it('should handle shipping calculation with multiple methods', async () => {
      const orderAmount = 75.00;
      const mockResponse = {
        success: true,
        data: {
          data: {
            shipping_cost: 5.99,
            order_amount: orderAmount,
            shipping_method_id: 'ship_standard',
            available_methods: [
              {
                id: 'ship_standard',
                name: 'Standard Shipping',
                cost: 5.99,
                estimated_days: 6
              },
              {
                id: 'ship_express',
                name: 'Express Shipping',
                cost: 12.99,
                estimated_days: 2
              }
            ]
          }
        }
      };

      mockApiClient.post.mockResolvedValue(mockResponse);

      const result = await ShippingAPI.calculateShippingCost(orderAmount);

      expect(result.available_methods).toHaveLength(2);
      expect(result.shipping_cost).toBe(5.99);
    });

    it('should handle international shipping calculations', async () => {
      const orderAmount = 100.00;
      const internationalMethodId = 'ship_international';
      const mockResponse = {
        success: true,
        data: {
          data: {
            shipping_cost: 25.99,
            order_amount: orderAmount,
            shipping_method_id: internationalMethodId,
            international: true,
            customs_fee: 5.00,
            estimated_days: 10
          }
        }
      };

      mockApiClient.post.mockResolvedValue(mockResponse);

      const result = await ShippingAPI.calculateShippingCost(orderAmount, internationalMethodId);

      expect(result.international).toBe(true);
      expect(result.customs_fee).toBe(5.00);
      expect(result.shipping_cost).toBe(25.99);
    });

    it('should handle shipping method deactivation', async () => {
      const methodId = 'ship_seasonal';
      const deactivateData = {
        is_active: false,
        deactivation_reason: 'Seasonal service ended'
      };

      const mockResponse = {
        success: true,
        data: {
          data: {
            id: methodId,
            name: 'Seasonal Express',
            is_active: false,
            deactivation_reason: 'Seasonal service ended',
            updated_at: '2024-01-15T10:00:00Z'
          }
        }
      };

      mockApiClient.put.mockResolvedValue(mockResponse);

      const result = await ShippingAPI.updateShippingMethod(methodId, deactivateData);

      expect(result.is_active).toBe(false);
      expect(result.deactivation_reason).toBe('Seasonal service ended');
    });
  });
});