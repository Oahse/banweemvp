/**
 * API Response Utilities
 * Helper functions for handling API responses and errors
 */

/**
 * Unwraps an API response to extract the data
 * @param response - The API response object
 * @returns The unwrapped data
 */
export function unwrapResponse<T>(response: any): T {
  // If response has a data property, return it
  if (response && typeof response === 'object' && 'data' in response) {
    return response.data as T;
  }
  
  // Otherwise return the response as-is
  return response as T;
}

/**
 * Extracts error message from various error formats
 * @param error - The error object
 * @returns A user-friendly error message
 */
export function extractErrorMessage(error: any): string {
  // Handle string errors
  if (typeof error === 'string') {
    return error;
  }
  
  // Handle Error objects
  if (error instanceof Error) {
    return error.message;
  }
  
  // Handle API error responses
  if (error && typeof error === 'object') {
    // Check for response.data.message (common API error format)
    if (error.response?.data?.message) {
      return error.response.data.message;
    }
    
    // Check for response.data.error
    if (error.response?.data?.error) {
      return error.response.data.error;
    }
    
    // Check for response.data.detail (FastAPI format)
    if (error.response?.data?.detail) {
      return error.response.data.detail;
    }
    
    // Check for direct message property
    if (error.message) {
      return error.message;
    }
    
    // Check for error property
    if (error.error) {
      return error.error;
    }
    
    // Check for detail property
    if (error.detail) {
      return error.detail;
    }
  }
  
  // Default error message
  return 'An unexpected error occurred. Please try again.';
}

/**
 * Checks if a response indicates success
 * @param response - The API response
 * @returns True if the response indicates success
 */
export function isSuccessResponse(response: any): boolean {
  if (!response) return false;
  
  // Check for explicit success property
  if (typeof response.success === 'boolean') {
    return response.success;
  }
  
  // Check for status code
  if (response.status) {
    return response.status >= 200 && response.status < 300;
  }
  
  // Check for statusCode
  if (response.statusCode) {
    return response.statusCode >= 200 && response.statusCode < 300;
  }
  
  // If no clear indicator, assume success if data exists
  return Boolean(response.data);
}

/**
 * Formats validation errors from API responses
 * @param error - The error object
 * @returns Formatted validation errors
 */
export function formatValidationErrors(error: any): Record<string, string> {
  const errors: Record<string, string> = {};
  
  // Handle FastAPI validation errors
  if (error?.response?.data?.detail && Array.isArray(error.response.data.detail)) {
    error.response.data.detail.forEach((err: any) => {
      const field = err.loc?.[err.loc.length - 1] || 'general';
      errors[field] = err.msg || 'Validation error';
    });
    return errors;
  }
  
  // Handle object-based validation errors
  if (error?.response?.data?.errors && typeof error.response.data.errors === 'object') {
    return error.response.data.errors;
  }
  
  // Return empty object if no validation errors found
  return errors;
}
