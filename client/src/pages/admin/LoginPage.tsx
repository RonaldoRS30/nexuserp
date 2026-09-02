import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Logo } from '../../components/Logo';
import { login } from '../../services/auth';
import { ApiError } from '../../services/api';
import { SEO } from '../../components/SEO';

export function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/admin/dashboard', { replace: true });
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'No se pudo iniciar sesión');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-surface-muted px-5">
      <SEO title="Administración" path="/admin" />
      <div className="w-full max-w-md rounded-2xl border border-line bg-white p-8 shadow-panel">
        <Logo to="/" />
        <h1 className="mt-6 text-2xl font-semibold">Acceso administrativo</h1>
        <p className="mt-2 text-sm text-ink-muted">Gestión del contenido comercial del sitio.</p>
        <form onSubmit={onSubmit} className="mt-8 space-y-4">
          <label className="block text-sm font-medium">
            Correo
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-lg border border-line px-3 py-2.5 text-sm outline-none ring-brand/20 transition-[box-shadow] duration-ui focus:ring-2"
              autoComplete="username"
              required
            />
          </label>
          <label className="block text-sm font-medium">
            Contraseña
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-lg border border-line px-3 py-2.5 text-sm outline-none ring-brand/20 transition-[box-shadow] duration-ui focus:ring-2"
              autoComplete="current-password"
              required
            />
          </label>
          {error ? <p className="text-sm text-red-700">{error}</p> : null}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-brand py-2.5 text-sm font-semibold text-white transition-colors duration-ui hover:bg-brand-hover disabled:opacity-60"
          >
            {loading ? 'Ingresando…' : 'Ingresar'}
          </button>
        </form>
      </div>
    </div>
  );
}
