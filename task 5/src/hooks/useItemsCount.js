import { useEffect, useState } from 'react';
import { getItemsList } from '../services/service.js';

function useItemsCount() {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function loadCount() {
      try {
        const result = await getItemsList('?limit=1&page=1');
        if (!cancelled) setCount(result.total || 0);
      } catch {
        if (!cancelled) setCount(0);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadCount();
    return () => {
      cancelled = true;
    };
  }, []);

  return { count, loading };
}

export default useItemsCount;
