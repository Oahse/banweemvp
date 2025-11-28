import { apiClient, TokenManager } from './client';


export class PaymentsAPI {
  static async getPaymentMethods() {
    return await apiClient.get('/users/me/payment-methods', {});
  }

  static async addPaymentMethod(data: any) {
    // Get current user ID from token manager
    const user = TokenManager.getUser();
    const userId = user?.id;
    if (!userId) {
      throw new Error('User not authenticated');
    }
    return await apiClient.post(`/users/${userId}/payment-methods`, data, {});
  }

  static async updatePaymentMethod(paymentMethodId: string, data: any) {
    // Get current user ID from token manager
    const user = TokenManager.getUser();
    const userId = user?.id;
    if (!userId) {
      throw new Error('User not authenticated');
    }
    return await apiClient.put(`/users/${userId}/payment-methods/${paymentMethodId}`, data, {});
  }

  static async deletePaymentMethod(paymentMethodId: string) {
    // Get current user ID from token manager
    const user = TokenManager.getUser();
    const userId = user?.id;
    if (!userId) {
      throw new Error('User not authenticated');
    }
    return await apiClient.delete(`/users/${userId}/payment-methods/${paymentMethodId}`, {});
  }

  static async setDefaultPaymentMethod(paymentMethodId: string) {
    // Get current user ID from token manager
    const user = TokenManager.getUser();
    const userId = user?.id;
    if (!userId) {
      throw new Error('User not authenticated');
    }
    return await apiClient.put(`/users/${userId}/payment-methods/${paymentMethodId}/default`, {}, {});
  }
}

export default PaymentsAPI;
