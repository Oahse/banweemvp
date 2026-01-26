import { useState, useCallback, useRef } from 'react';

export function useData<T>(initialData: T | null = null) {
  const [data, setData] = useState<T | null>(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  
  const dataRef = useRef<T | null>(initialData);

  const updateData = useCallback((newData: T | null) => {
    // Only update if data actually changed
    if (JSON.stringify(newData) !== JSON.stringify(dataRef.current)) {
      dataRef.current = newData;
      setData(newData);
    }
  }, []);

  const setLoadingState = useCallback((isLoading: boolean) => {
    setLoading(isLoading);
  }, []);

  const setErrorState = useCallback((err: any) => {
    setError(err);
  }, []);

  const reset = useCallback(() => {
    setData(initialData);
    setLoading(false);
    setError(null);
    dataRef.current = initialData;
  }, [initialData]);

  return {
    data,
    loading,
    error,
    updateData,
    setLoadingState,
    setErrorState,
    reset
  };
}