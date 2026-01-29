/**
 * Error handling and formatting utilities
 */

export interface ApiError {
  message?: string;
  statusCode?: number;
  code?: string;
  response?: {
    status?: number;
    data?: {
      message?: string;
      detail?: string;
      errors?: Record<string, string[]>;
    };
  };
}

/**
 * Consistently formats error messages from various sources
 */
export const formatErrorMessage = (error: any): string => {
  // Try multiple paths for error message
  if (typeof error === 'string') {
    return error;
  }

  return (
    error?.message ||
    error?.data?.message ||
    error?.response?.data?.message ||
    error?.response?.data?.detail ||
    error?.detail ||
    error?.error ||
    'An error occurred. Please try again.'
  );
};

/**
 * Extract all validation errors from API response
 */
export const extractValidationErrors = (error: any): Record<string, string> => {
  const errors: Record<string, string> = {};
  
  // Check for field-level errors from API response
  const fieldErrors = error?.response?.data?.errors || error?.errors;
  if (fieldErrors && typeof fieldErrors === 'object') {
    Object.keys(fieldErrors).forEach(field => {
      const fieldError = fieldErrors[field];
      // Handle both string and array formats
      errors[field] = Array.isArray(fieldError) ? fieldError[0] : fieldError;
    });
  }
  
  return errors;
};

/**
 * Get error for a specific field
 */
export const getFieldError = (fieldName: string, validationErrors: Record<string, string>): string | undefined => {
  return validationErrors?.[fieldName];
};

/**
 * Check if error response contains field-level validation errors
 */
export const hasValidationErrors = (error: any): boolean => {
  return !!(error?.response?.data?.errors || error?.errors);
};

/**
 * Format error for display in UI (with default message)
 */
export const formatDisplayError = (error: any, defaultMessage: string = 'An error occurred'): string => {
  try {
    const message = formatErrorMessage(error);
    return message && message !== 'An error occurred. Please try again.' ? message : defaultMessage;
  } catch {
    return defaultMessage;
  }
};
