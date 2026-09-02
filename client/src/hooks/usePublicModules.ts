import { useEffect, useState } from 'react';
import { fetchPublicModules } from '../services/modules';
import { CatalogModule } from '../types';

let cached: CatalogModule[] | null = null;
let inflight: Promise<CatalogModule[]> | null = null;

function loadModules() {
  if (cached) return Promise.resolve(cached);
  if (!inflight) {
    inflight = fetchPublicModules()
      .then((modules) => {
        cached = modules;
        return modules;
      })
      .finally(() => {
        inflight = null;
      });
  }
  return inflight;
}

export function prefetchPublicModules() {
  void loadModules();
}

export function usePublicModules() {
  const [modules, setModules] = useState<CatalogModule[]>(cached ?? []);
  const [loading, setLoading] = useState(!cached);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    loadModules()
      .then((data) => {
        if (active) setModules(data);
      })
      .catch((err: Error) => {
        if (active) setError(err.message);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  return { modules, loading, error };
}
