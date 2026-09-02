import { useEffect, useState } from 'react';
import { fetchPublicPlans } from '../services/plans';
import { Plan } from '../types';

export function usePublicPlans() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPublicPlans()
      .then(setPlans)
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { plans, loading, error };
}
