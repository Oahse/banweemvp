import { useState, useCallback } from 'react';
import { toast } from 'react-hot-toast';

export function useAsync(options = {}) {
  const {
    onSuccess,
    onError,
    showSuccessToast = false,
    showErrorToast = true,
    successMessage = 'Success',
  } = options;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback(async (asyncFn) => {
    setLoading(true);
    setError(null);

    try {
      const result = await asyncFn();
      
      if (showSuccessToast) {
        toast.success(successMessage);
      }
      
      if (onSuccess) {
        onSuccess(result);
      }
      
      return result;
    } catch (err) {
      setError(err);
      
      if (showErrorToast) {
        const message = err?.message || 'An error occurred';
        toast.error(message);
      }
      
      if (onError) {
        onError(err);
      }
      
      throw err;
    } finally {
      setLoading(false);
    }
  }, [onSuccess, onError, showSuccessToast, showErrorToast, successMessage]);

  return { loading, error, execute };
}