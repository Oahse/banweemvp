import { useState, useCallback } from 'react';
import { toast } from 'react-hot-toast';

interface UseAsyncOptions {
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
  showSuccessToast?: boolean;
  showErrorToast?: boolean;
  successMessage?: string;
}

export function useAsync(options: UseAsyncOptions = {}) {
  const {
    onSuccess,
    onError,
    showSuccessToast = false,
    showErrorToast = true,
    successMessage = 'Success',
  } = options;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const execute = useCallback(async (asyncFn: (...args: any[]) => Promise<any>, ...args: any[]) => {
    if (!asyncFn) return null;

    setLoading(true);
    setError(null);

    try {
      const result = await asyncFn(...args);
      setData(result);
      
      if (showSuccessToast) {
        toast.success(successMessage);
      }
      
      if (onSuccess) {
        onSuccess(result);
      }
      
      return result;
    } catch (err: any) {
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

  return { data, loading, error, execute };
}

// Alias for API calls - same functionality
export const useApi = useAsync;

// Paginated version for admin pages
export function usePaginatedApi(options: UseAsyncOptions = {}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  
  const { data, loading, error, execute: baseExecute } = useAsync(options);

  const execute = useCallback(async (apiFunction: (...args: any[]) => Promise<any>, ...args: any[]) => {
    const result = await baseExecute(apiFunction, ...args);
    
    if (result && typeof result === 'object') {
      // Handle paginated response structure
      if (result.data && Array.isArray(result.data)) {
        setTotalPages(result.total_pages || 1);
        setTotalItems(result.total || result.data.length);
      }
    }
    
    return result;
  }, [baseExecute]);

  return {
    data,
    loading,
    error,
    execute,
    currentPage,
    setCurrentPage,
    totalPages,
    totalItems
  };
}