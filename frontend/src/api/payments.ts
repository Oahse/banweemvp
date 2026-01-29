import { apiClient, TokenManager } from './client';


export class PaymentsAPI {
  static async getPaymentMethods() {
    console.log('PaymentsAPI: Making request to /v1/payments/methods');
    console.log('PaymentsAPI: Token available:', !!TokenManager.getToken());
    try {
      const response = await apiClient.get('/v1/payments/methods', {});
      console.log('PaymentsAPI.getPaymentMethods response:', response);
      return response;
    } catch (error) {
      console.error('PaymentsAPI: Error fetching payment methods:', error);
      throw error;
    }
  }

  static async addPaymentMethod(data: any) {
    return await apiClient.post('/v1/payments/methods', data, {});
  }

  static async updatePaymentMethod(paymentMethodId: string, data: any) {
    return await apiClient.put(`/v1/payments/methods/${paymentMethodId}`, data, {});
  }

  static async deletePaymentMethod(paymentMethodId: string) {
    return await apiClient.delete(`/v1/payments/methods/${paymentMethodId}`, {});
  }

  static async setDefaultPaymentMethod(paymentMethodId: string) {
    return await apiClient.put(`/v1/payments/methods/${paymentMethodId}/default`, {}, {});
  }
}

export default PaymentsAPI;
