import { useState, useEffect, useRef, useCallback } from 'react';

interface PollingOptions {
  interval?: number;
  enabled?: boolean;
  onError?: (error: any) => void;
}

export function usePolling<T>(
  fetchFn: () => Promise<T>,
  options: PollingOptions = {}
) {
  const { interval = 5000, enabled = true, onError } = options;
  
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  
  const intervalRef = useRef<NodeJS.Timeout>();
  const dataRef = useRef<T | null>(null);
  const isFirstLoad = useRef(true);

  const fetchData = useCallback(async () => {
    try {
      if (isFirstLoad.current) {
        setLoading(true);
      }
      
      const newData = await fetchFn();
      
      // Only update state if data actually changed
      if (JSON.stringify(newData) !== JSON.stringify(dataRef.current)) {
        dataRef.current = newData;
        setData(newData);
      }
      
      setError(null);
    } catch (err) {
      setError(err);
      onError?.(err);
    } finally {
      if (isFirstLoad.current) {
        setLoading(false);
        isFirstLoad.current = false;
      }
    }
  }, [fetchFn, onError]);

  useEffect(() => {
    if (!enabled) return;

    // Initial fetch
    fetchData();

    // Set up polling
    intervalRef.current = setInterval(fetchData, interval);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [fetchData, interval, enabled]);

  const refresh = useCallback(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refresh };
}