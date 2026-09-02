import { useEffect, useState } from 'react';
import { fetchPublicPlans } from '../services/plans';
import { Plan } from '../types';

let cached: Plan[] | null = null;
let inflight: Promise<Plan[]> | null = null;

function loadPlans() {
  if (cached) return Promise.resolve(cached);
  if (!inflight) {
    inflight = fetchPublicPlans()
      .then((plans) => {
        cached = plans;
        return plans;
      })
      .finally(() => {
        inflight = null;
      });
  }
  return inflight;
}

export function prefetchPublicPlans() {
  void loadPlans();
}

export function usePublicPlans() {
  const [plans, setPlans] = useState<Plan[]>(cached ?? []);
  const [loading, setLoading] = useState(!cached);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    loadPlans()
      .then((data) => {
        if (active) setPlans(data);
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

  return { plans, loading, error };
}
