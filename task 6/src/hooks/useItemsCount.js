import { useEffect, useState } from 'react';
import { getItemsList } from '../services/service.js';

function useItemsCount() {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;

    async function loadCount() {
      try {
        const result = await getItemsList('?limit=1&page=1');
        if (!cancelled) setCount(result.total || 0);
      } catch (requestError) {
        if (!cancelled) setError(requestError.message || 'Could not load catalog.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadCount();
    return () => {
      cancelled = true;
    };
  }, []);

  return { count, loading, error };
}

export default useItemsCount;
