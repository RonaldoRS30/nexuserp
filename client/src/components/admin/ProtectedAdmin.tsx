import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { AdminLayout } from '../../layouts/AdminLayout';

export function ProtectedAdmin() {
  const { admin, loading } = useAuth();

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center text-sm text-ink-muted">Cargando panel…</div>;
  }

  if (!admin) {
    return <Navigate to="/admin" replace />;
  }

  return (
    <AdminLayout />
  );
}

export function AdminIndexRedirect() {
  const { admin, loading } = useAuth();
  if (loading) return <div className="flex min-h-screen items-center justify-center text-sm text-ink-muted">Cargando…</div>;
  if (admin) return <Navigate to="/admin/dashboard" replace />;
  return <Outlet />;
}
