import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Layers, LogOut, Mail, Settings, Tags } from 'lucide-react';
import { Logo } from '../components/Logo';
import { logout } from '../services/auth';
import { classNames } from '../utils/format';

const items = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/admin/planes', label: 'Planes', icon: Tags },
  { to: '/admin/modulos', label: 'Módulos', icon: Layers },
  { to: '/admin/consultas', label: 'Consultas', icon: Mail },
  { to: '/admin/configuracion', label: 'Configuración', icon: Settings },
];

export function AdminLayout() {
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/admin');
  }

  return (
    <div className="min-h-screen bg-surface-muted lg:grid lg:grid-cols-[240px_1fr]">
      <aside className="border-b border-white/10 bg-primary-dark text-white lg:min-h-screen lg:border-b-0">
        <div className="flex items-center justify-between px-4 py-4 lg:block">
          <div className="rounded-sm bg-white px-2 py-1.5">
            <Logo to="/admin/dashboard" className="[&_img]:h-8" />
          </div>
          <p className="hidden px-1 pt-4 text-[11px] uppercase tracking-[0.18em] text-slate-400 lg:block">
            Administración
          </p>
        </div>
        <nav className="flex gap-1 overflow-x-auto px-3 pb-3 lg:block lg:space-y-1 lg:overflow-visible lg:px-3">
          {items.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                classNames(
                  'flex items-center gap-2 whitespace-nowrap rounded-sm px-3 py-2 text-sm',
                  isActive ? 'bg-white/10 text-white' : 'text-slate-300 hover:bg-white/5 hover:text-white',
                )
              }
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </NavLink>
          ))}
        </nav>
        <button
          type="button"
          onClick={handleLogout}
          className="hidden items-center gap-2 px-6 py-4 text-sm text-slate-400 hover:text-white lg:flex"
        >
          <LogOut className="h-4 w-4" />
          Cerrar sesión
        </button>
      </aside>
      <div className="min-w-0">
        <div className="flex items-center justify-between border-b border-line bg-white px-5 py-3 lg:hidden">
          <p className="text-sm font-medium">Panel NexusERP</p>
          <button type="button" onClick={handleLogout} className="text-sm text-ink-muted">
            Salir
          </button>
        </div>
        <div className="p-5 lg:p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
