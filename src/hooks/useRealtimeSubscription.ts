
import { useEffect, useState } from 'react';
import { realtime } from '@/lib/supabase';

type SubscriptionCallback = (payload: any) => void;

/**
 * Hook for subscribing to Supabase realtime updates
 */
export const useRealtimeSubscription = <T>(
  tableName: string,
  initialData: T[] = [],
  filters?: Record<string, any>
) => {
  const [data, setData] = useState<T[]>(initialData);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let subscription: any;

    const setupSubscription = async () => {
      try {
        setIsLoading(true);
        
        // Subscribe to real-time updates
        subscription = realtime.subscribeToTable(tableName, (payload) => {
          // Process the real-time update
          const { eventType, new: newRecord, old: oldRecord } = payload;
          
          // Apply any filters
          if (filters && Object.keys(filters).length > 0) {
            const matchesFilters = Object.entries(filters).every(
              ([key, value]) => newRecord[key] === value
            );
            
            if (!matchesFilters) return;
          }
          
          // Update the data based on the event type
          setData((currentData) => {
            switch (eventType) {
              case 'INSERT':
                return [...currentData, newRecord as T];
                
              case 'UPDATE':
                return currentData.map((item) => 
                  // @ts-ignore - we don't know the exact structure of T
                  item.id === newRecord.id ? newRecord : item
                );
                
              case 'DELETE':
                return currentData.filter((item) => 
                  // @ts-ignore - we don't know the exact structure of T
                  item.id !== oldRecord.id
                );
                
              default:
                return currentData;
            }
          });
        });
        
        setIsLoading(false);
      } catch (err) {
        console.error(`Error setting up subscription to ${tableName}:`, err);
        setError(err instanceof Error ? err : new Error(String(err)));
        setIsLoading(false);
      }
    };

    setupSubscription();

    // Clean up subscription on unmount
    return () => {
      if (subscription) {
        realtime.unsubscribe(subscription);
      }
    };
  }, [tableName, JSON.stringify(filters)]); // Re-run if filters change

  // Function to manually update data
  const updateData = (newData: T[]) => {
    setData(newData);
  };

  return { data, setData: updateData, isLoading, error };
};

export default useRealtimeSubscription;
