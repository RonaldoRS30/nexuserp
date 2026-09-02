import { useEffect, useState } from 'react';
import { fetchPublicModules } from '../services/modules';
import { CatalogModule } from '../types';

export function usePublicModules() {
  const [modules, setModules] = useState<CatalogModule[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPublicModules()
      .then(setModules)
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { modules, loading, error };
}
