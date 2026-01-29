/**
 * Utility for consistently unwrapping API responses
 * Handles both wrapped {data: {...}} and direct response formats
 */

export interface ApiResponse<T = any> {
  data?: T;
  success?: boolean;
  message?: string;
  error?: string;
}

/**
 * Safely unwrap API response data
 * Handles both wrapped and direct response formats
 */
export const unwrapResponse = <T = any>(response: ApiResponse<T> | T): T => {
  if (!response) return response as T;
  
  // If response has data property, return it
  if (typeof response === 'object' && 'data' in response) {
    const data = (response as ApiResponse<T>).data;
    return (data || response) as T;
  }
  
  // Otherwise return response as-is
  return response as T;
};

/**
 * Extract error message from various error response formats
 */
export const extractErrorMessage = (error: any): string => {
  // Try multiple paths for error message
  return (
    error?.message ||
    error?.data?.message ||
    error?.response?.data?.message ||
    error?.response?.data?.detail ||
    error?.detail ||
    'An error occurred. Please try again.'
  );
};

/**
 * Check if API response indicates an error
 */
export const isApiError = (response: any): boolean => {
  return (
    response?.success === false ||
    response?.error !== undefined ||
    response?.errors !== undefined
  );
};
