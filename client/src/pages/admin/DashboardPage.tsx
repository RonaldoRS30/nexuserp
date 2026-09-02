import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchDashboardStats } from '../../services/contacts';
import { DashboardStats } from '../../types';

export function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDashboardStats()
      .then(setStats)
      .catch((err: Error) => setError(err.message));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <p className="mt-1 text-sm text-ink-muted">Resumen del contenido comercial publicado en el sitio.</p>
      {error ? <p className="mt-6 text-sm text-red-700">{error}</p> : null}
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <Stat label="Planes activos" value={stats?.activePlans} to="/admin/planes" />
        <Stat label="Módulos activos" value={stats?.activeModules} to="/admin/modulos" />
        <Stat label="Consultas recibidas" value={stats?.contacts} to="/admin/consultas" />
      </div>
    </div>
  );
}

function Stat({ label, value, to }: { label: string; value?: number; to: string }) {
  return (
    <Link to={to} className="lift rounded-xl border border-line bg-white p-5 hover:border-brand">
      <p className="text-sm text-ink-muted">{label}</p>
      <p className="mt-3 font-display text-3xl font-semibold">{value ?? '—'}</p>
    </Link>
  );
}
