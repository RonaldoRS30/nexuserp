import { useEffect, useState } from 'react';
import { getToken } from '../services/api';
import { fetchMe, logout } from '../services/auth';
import { AdminUser } from '../types';

export function useAuth() {
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      setLoading(false);
      return;
    }

    fetchMe()
      .then(setAdmin)
      .catch(() => {
        logout();
        setAdmin(null);
      })
      .finally(() => setLoading(false));
  }, []);

  return { admin, loading, setAdmin };
}
