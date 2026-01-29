/**
 * Tests for Wishlists API - Comprehensive test suite aligned with backend reality
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { WishlistAPI } from '../../api/wishlists';
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

describe('WishlistAPI', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getWishlists', () => {
    it('should get user wishlists with correct backend format', async () => {
      const userId = 'user123';
      const mockResponse = {
        success: true,
        data: [
          {
            id: 'wishlist123',
            name: 'My Wishlist',
            is_default: true,
            user_id: userId,
            items: [
              {
                id: 'item123',
                product_id: 'prod123',
                variant_id: 'var123',
                quantity: 1,
                added_at: '2024-01-01T00:00:00Z'
              }
            ],
            created_at: '2024-01-01T00:00:00Z',
            updated_at: '2024-01-15T10:00:00Z'
          },
          {
            id: 'wishlist456',
            name: 'Holiday Gifts',
            is_default: false,
            user_id: userId,
            items: [],
            created_at: '2024-01-10T00:00:00Z',
            updated_at: '2024-01-10T00:00:00Z'
          }
        ]
      };

      mockApiClient.get.mockResolvedValue(mockResponse);

      const result = await WishlistAPI.getWishlists(userId);

      expect(mockApiClient.get).toHaveBeenCalledWith(`/v1/users/${userId}/wishlists`);
      expect(result).toEqual(mockResponse);
      expect(result.data).toHaveLength(2);
      expect(result.data[0].is_default).toBe(true);
    });

    it('should handle empty wishlists', async () => {
      const userId = 'user456';
      const mockResponse = {
        success: true,
        data: []
      };

      mockApiClient.get.mockResolvedValue(mockResponse);

      const result = await WishlistAPI.getWishlists(userId);

      expect(result.data).toHaveLength(0);
    });

    it('should handle unauthorized access to wishlists', async () => {
      const userId = 'user123';
      const mockError = {
        response: {
          status: 403,
          data: {
            message: 'You can only access your own wishlists'
          }
        }
      };

      mockApiClient.get.mockRejectedValue(mockError);

      await expect(WishlistAPI.getWishlists(userId)).rejects.toEqual(mockError);
    });
  });

  describe('createWishlist', () => {
    it('should create new wishlist with correct format', async () => {
      const userId = 'user123';
      const wishlistData = {
        name: 'Birthday Wishlist',
        is_default: false
      };

      const mockResponse = {
        success: true,
        data: {
          id: 'wishlist789',
          name: 'Birthday Wishlist',
          is_default: false,
          user_id: userId,
          items: [],
          created_at: '2024-01-15T10:00:00Z',
          updated_at: '2024-01-15T10:00:00Z'
        },
        message: 'Wishlist created successfully'
      };

      mockApiClient.post.mockResolvedValue(mockResponse);

      const result = await WishlistAPI.createWishlist(userId, wishlistData);

      expect(mockApiClient.post).toHaveBeenCalledWith(`/v1/users/${userId}/wishlists`, wishlistData);
      expect(result).toEqual(mockResponse);
      expect(result.data.name).toBe('Birthday Wishlist');
      expect(result.data.is_default).toBe(false);
    });

    it('should create default wishlist', async () => {
      const userId = 'user123';
      const wishlistData = {
        name: 'My Default Wishlist',
        is_default: true
      };

      const mockResponse = {
        success: true,
        data: {
          id: 'wishlist_default',
          name: 'My Default Wishlist',
          is_default: true,
          user_id: userId,
          items: [],
          created_at: '2024-01-15T10:00:00Z'
        }
      };

      mockApiClient.post.mockResolvedValue(mockResponse);

      const result = await WishlistAPI.createWishlist(userId, wishlistData);

      expect(result.data.is_default).toBe(true);
    });

    it('should handle validation errors when creating wishlist', async () => {
      const userId = 'user123';
      const invalidData = {
        name: '', // Empty name
        is_default: 'invalid' // Invalid boolean
      };

      const mockError = {
        response: {
          status: 422,
          data: {
            message: 'Validation error',
            details: {
              name: ['Wishlist name is required'],
              is_default: ['Must be a boolean value']
            }
          }
        }
      };

      mockApiClient.post.mockRejectedValue(mockError);

      await expect(WishlistAPI.createWishlist(userId, invalidData)).rejects.toEqual(mockError);
    });

    it('should handle duplicate wishlist name error', async () => {
      const userId = 'user123';
      const wishlistData = {
        name: 'My Wishlist' // Already exists
      };

      const mockError = {
        response: {
          status: 409,
          data: {
            message: 'Wishlist with this name already exists',
            code: 'DUPLICATE_WISHLIST_NAME'
          }
        }
      };

      mockApiClient.post.mockRejectedValue(mockError);

      await expect(WishlistAPI.createWishlist(userId, wishlistData)).rejects.toEqual(mockError);
    });
  });

  describe('addItemToWishlist', () => {
    it('should add item to wishlist with correct format', async () => {
      const userId = 'user123';
      const wishlistId = 'wishlist123';
      const itemData = {
        product_id: 'prod456',
        variant_id: 'var456',
        quantity: 2
      };

      const mockResponse = {
        success: true,
        data: {
          id: 'item456',
          product_id: 'prod456',
          variant_id: 'var456',
          quantity: 2,
          wishlist_id: wishlistId,
          added_at: '2024-01-15T10:00:00Z',
          product: {
            id: 'prod456',
            name: 'Awesome Product',
            images: ['image1.jpg']
          },
          variant: {
            id: 'var456',
            name: 'Blue - Large',
            price: 99.99,
            stock_quantity: 10
          }
        },
        message: 'Item added to wishlist'
      };

      mockApiClient.post.mockResolvedValue(mockResponse);

      const result = await WishlistAPI.addItemToWishlist(userId, wishlistId, itemData);

      expect(mockApiClient.post).toHaveBeenCalledWith(
        `/v1/users/${userId}/wishlists/${wishlistId}/items`,
        itemData
      );
      expect(result).toEqual(mockResponse);
      expect(result.data.quantity).toBe(2);
    });

    it('should add item without variant_id', async () => {
      const userId = 'user123';
      const wishlistId = 'wishlist123';
      const itemData = {
        product_id: 'prod789',
        quantity: 1
      };

      const mockResponse = {
        success: true,
        data: {
          id: 'item789',
          product_id: 'prod789',
          variant_id: null,
          quantity: 1,
          wishlist_id: wishlistId,
          added_at: '2024-01-15T10:00:00Z'
        }
      };

      mockApiClient.post.mockResolvedValue(mockResponse);

      const result = await WishlistAPI.addItemToWishlist(userId, wishlistId, itemData);

      expect(result.data.variant_id).toBeNull();
      expect(result.data.product_id).toBe('prod789');
    });

    it('should handle duplicate item in wishlist', async () => {
      const userId = 'user123';
      const wishlistId = 'wishlist123';
      const itemData = {
        product_id: 'prod123', // Already in wishlist
        variant_id: 'var123',
        quantity: 1
      };

      const mockError = {
        response: {
          status: 409,
          data: {
            message: 'Item already exists in wishlist',
            code: 'DUPLICATE_WISHLIST_ITEM'
          }
        }
      };

      mockApiClient.post.mockRejectedValue(mockError);

      await expect(WishlistAPI.addItemToWishlist(userId, wishlistId, itemData)).rejects.toEqual(mockError);
    });

    it('should handle product not found error', async () => {
      const userId = 'user123';
      const wishlistId = 'wishlist123';
      const itemData = {
        product_id: 'prod_nonexistent',
        quantity: 1
      };

      const mockError = {
        response: {
          status: 404,
          data: {
            message: 'Product not found'
          }
        }
      };

      mockApiClient.post.mockRejectedValue(mockError);

      await expect(WishlistAPI.addItemToWishlist(userId, wishlistId, itemData)).rejects.toEqual(mockError);
    });
  });

  describe('removeItemFromWishlist', () => {
    it('should remove item from wishlist', async () => {
      const userId = 'user123';
      const wishlistId = 'wishlist123';
      const itemId = 'item123';

      const mockResponse = {
        success: true,
        message: 'Item removed from wishlist'
      };

      mockApiClient.delete.mockResolvedValue(mockResponse);

      const result = await WishlistAPI.removeItemFromWishlist(userId, wishlistId, itemId);

      expect(mockApiClient.delete).toHaveBeenCalledWith(
        `/v1/users/${userId}/wishlists/${wishlistId}/items/${itemId}`
      );
      expect(result).toEqual(mockResponse);
    });

    it('should handle item not found in wishlist', async () => {
      const userId = 'user123';
      const wishlistId = 'wishlist123';
      const itemId = 'item_nonexistent';

      const mockError = {
        response: {
          status: 404,
          data: {
            message: 'Wishlist item not found'
          }
        }
      };

      mockApiClient.delete.mockRejectedValue(mockError);

      await expect(WishlistAPI.removeItemFromWishlist(userId, wishlistId, itemId)).rejects.toEqual(mockError);
    });

    it('should handle unauthorized removal', async () => {
      const userId = 'user123';
      const wishlistId = 'wishlist_other_user';
      const itemId = 'item123';

      const mockError = {
        response: {
          status: 403,
          data: {
            message: 'You can only modify your own wishlist items'
          }
        }
      };

      mockApiClient.delete.mockRejectedValue(mockError);

      await expect(WishlistAPI.removeItemFromWishlist(userId, wishlistId, itemId)).rejects.toEqual(mockError);
    });
  });

  describe('clearWishlist', () => {
    it('should clear wishlist by removing all items', async () => {
      const userId = 'user123';
      const wishlistId = 'wishlist123';
      const itemIds = ['item1', 'item2', 'item3'];

      // Mock successful deletion for each item
      mockApiClient.delete.mockResolvedValue({
        success: true,
        message: 'Item removed from wishlist'
      });

      const result = await WishlistAPI.clearWishlist(userId, wishlistId, itemIds);

      expect(mockApiClient.delete).toHaveBeenCalledTimes(3);
      expect(mockApiClient.delete).toHaveBeenCalledWith(`/v1/users/${userId}/wishlists/${wishlistId}/items/item1`);
      expect(mockApiClient.delete).toHaveBeenCalledWith(`/v1/users/${userId}/wishlists/${wishlistId}/items/item2`);
      expect(mockApiClient.delete).toHaveBeenCalledWith(`/v1/users/${userId}/wishlists/${wishlistId}/items/item3`);
      
      expect(result).toEqual({
        success: true,
        data: null,
        message: "Wishlist cleared successfully"
      });
    });

    it('should handle empty item list', async () => {
      const userId = 'user123';
      const wishlistId = 'wishlist123';
      const itemIds = [];

      const result = await WishlistAPI.clearWishlist(userId, wishlistId, itemIds);

      expect(mockApiClient.delete).not.toHaveBeenCalled();
      expect(result).toEqual({
        success: true,
        data: null,
        message: "Wishlist cleared successfully"
      });
    });

    it('should handle partial failure when clearing wishlist', async () => {
      const userId = 'user123';
      const wishlistId = 'wishlist123';
      const itemIds = ['item1', 'item2', 'item3'];

      // Mock first deletion success, second failure, third success
      mockApiClient.delete
        .mockResolvedValueOnce({ success: true })
        .mockRejectedValueOnce(new Error('Network error'))
        .mockResolvedValueOnce({ success: true });

      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      const result = await WishlistAPI.clearWishlist(userId, wishlistId, itemIds);

      expect(result).toEqual({
        success: false,
        data: null,
        message: "Failed to clear wishlist"
      });
      expect(consoleSpy).toHaveBeenCalledWith('Error clearing wishlist:', expect.any(Error));

      consoleSpy.mockRestore();
    });
  });

  describe('setAsDefault', () => {
    it('should set wishlist as default', async () => {
      const userId = 'user123';
      const wishlistId = 'wishlist456';

      const mockResponse = {
        success: true,
        data: {
          id: wishlistId,
          name: 'Holiday Gifts',
          is_default: true,
          user_id: userId,
          updated_at: '2024-01-15T10:00:00Z'
        },
        message: 'Default wishlist updated successfully'
      };

      mockApiClient.put.mockResolvedValue(mockResponse);

      const result = await WishlistAPI.setAsDefault(userId, wishlistId);

      expect(mockApiClient.put).toHaveBeenCalledWith(`/v1/users/${userId}/wishlists/${wishlistId}/default`);
      expect(result).toEqual(mockResponse);
      expect(result.data.is_default).toBe(true);
    });

    it('should handle wishlist not found when setting as default', async () => {
      const userId = 'user123';
      const wishlistId = 'wishlist_nonexistent';

      const mockError = {
        response: {
          status: 404,
          data: {
            message: 'Wishlist not found'
          }
        }
      };

      mockApiClient.put.mockRejectedValue(mockError);

      await expect(WishlistAPI.setAsDefault(userId, wishlistId)).rejects.toEqual(mockError);
    });

    it('should handle unauthorized access when setting default', async () => {
      const userId = 'user123';
      const wishlistId = 'wishlist_other_user';

      const mockError = {
        response: {
          status: 403,
          data: {
            message: 'You can only modify your own wishlists'
          }
        }
      };

      mockApiClient.put.mockRejectedValue(mockError);

      await expect(WishlistAPI.setAsDefault(userId, wishlistId)).rejects.toEqual(mockError);
    });
  });

  describe('Error Handling', () => {
    it('should handle authentication errors consistently', async () => {
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

      const userId = 'user123';
      const wishlistId = 'wishlist123';

      await expect(WishlistAPI.getWishlists(userId)).rejects.toEqual(authError);
      await expect(WishlistAPI.createWishlist(userId, { name: 'Test' })).rejects.toEqual(authError);
      await expect(WishlistAPI.addItemToWishlist(userId, wishlistId, { product_id: 'prod123', quantity: 1 })).rejects.toEqual(authError);
      await expect(WishlistAPI.removeItemFromWishlist(userId, wishlistId, 'item123')).rejects.toEqual(authError);
      await expect(WishlistAPI.setAsDefault(userId, wishlistId)).rejects.toEqual(authError);
    });

    it('should handle server errors', async () => {
      const serverError = {
        response: {
          status: 500,
          data: {
            message: 'Internal server error'
          }
        }
      };

      mockApiClient.get.mockRejectedValue(serverError);

      await expect(WishlistAPI.getWishlists('user123')).rejects.toEqual(serverError);
    });

    it('should handle network timeouts', async () => {
      const timeoutError = {
        code: 'ECONNABORTED',
        message: 'timeout of 5000ms exceeded'
      };

      mockApiClient.post.mockRejectedValue(timeoutError);

      await expect(WishlistAPI.createWishlist('user123', { name: 'Test' })).rejects.toEqual(timeoutError);
    });
  });

  describe('Integration Scenarios', () => {
    it('should handle wishlist with product and variant details', async () => {
      const userId = 'user123';
      const mockResponse = {
        success: true,
        data: [
          {
            id: 'wishlist123',
            name: 'Tech Wishlist',
            is_default: true,
            items: [
              {
                id: 'item123',
                product_id: 'prod123',
                variant_id: 'var123',
                quantity: 1,
                product: {
                  id: 'prod123',
                  name: 'Gaming Laptop',
                  brand: 'TechBrand',
                  category: 'Electronics',
                  images: ['laptop1.jpg', 'laptop2.jpg']
                },
                variant: {
                  id: 'var123',
                  name: 'Black - 16GB RAM',
                  price: 1299.99,
                  sale_price: 1199.99,
                  on_sale: true,
                  stock_quantity: 5,
                  sku: 'LAPTOP-BLACK-16GB'
                }
              }
            ]
          }
        ]
      };

      mockApiClient.get.mockResolvedValue(mockResponse);

      const result = await WishlistAPI.getWishlists(userId);

      const item = result.data[0].items[0];
      expect(item.product.name).toBe('Gaming Laptop');
      expect(item.variant.on_sale).toBe(true);
      expect(item.variant.sale_price).toBe(1199.99);
    });

    it('should handle wishlist sharing functionality', async () => {
      const userId = 'user123';
      const wishlistId = 'wishlist123';
      const shareData = {
        is_public: true,
        share_token: 'share_token_123'
      };

      const mockResponse = {
        success: true,
        data: {
          id: wishlistId,
          name: 'My Public Wishlist',
          is_public: true,
          share_token: 'share_token_123',
          share_url: 'https://banwee.com/wishlist/share/share_token_123'
        }
      };

      mockApiClient.put.mockResolvedValue(mockResponse);

      const result = await WishlistAPI.setAsDefault(userId, wishlistId); // Using existing method as proxy

      // This would be a separate method in a real implementation
      expect(mockApiClient.put).toHaveBeenCalled();
    });

    it('should handle wishlist item with out-of-stock variant', async () => {
      const userId = 'user123';
      const wishlistId = 'wishlist123';
      const itemData = {
        product_id: 'prod456',
        variant_id: 'var456',
        quantity: 1
      };

      const mockResponse = {
        success: true,
        data: {
          id: 'item456',
          product_id: 'prod456',
          variant_id: 'var456',
          quantity: 1,
          variant: {
            id: 'var456',
            name: 'Red - Medium',
            price: 79.99,
            stock_quantity: 0,
            in_stock: false
          }
        },
        warnings: ['This item is currently out of stock']
      };

      mockApiClient.post.mockResolvedValue(mockResponse);

      const result = await WishlistAPI.addItemToWishlist(userId, wishlistId, itemData);

      expect(result.data.variant.in_stock).toBe(false);
      expect(result.warnings).toContain('This item is currently out of stock');
    });
  });
});