import { useRef } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Layers, LogOut, Mail, Settings, Tags } from 'lucide-react';
import { Logo } from '../components/Logo';
import { RouteProgress } from '../components/RouteProgress';
import { logout } from '../services/auth';
import { classNames } from '../utils/format';
import { useNavDirection } from '../hooks/useNavDirection';
import { useSlidingIndicator } from '../hooks/useSlidingIndicator';

const items = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/admin/planes', label: 'Planes', icon: Tags },
  { to: '/admin/modulos', label: 'Módulos', icon: Layers },
  { to: '/admin/consultas', label: 'Consultas', icon: Mail },
  { to: '/admin/configuracion', label: 'Configuración', icon: Settings },
];

export function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const navRef = useRef<HTMLElement>(null);
  const activeKey = items.find((item) => location.pathname.startsWith(item.to))?.to ?? location.pathname;
  const direction = useNavDirection(location.pathname, items.map((item) => item.to));
  const indicator = useSlidingIndicator(activeKey, navRef);

  function handleLogout() {
    logout();
    navigate('/admin');
  }

  return (
    <div className="min-h-screen bg-surface-muted lg:grid lg:grid-cols-[256px_1fr]">
      <RouteProgress trigger={location.pathname} />
      <aside className="border-b border-line bg-stone-50 lg:flex lg:min-h-screen lg:flex-col lg:border-b-0 lg:border-r">
        <div className="flex items-center justify-between px-4 py-4 lg:block">
          <Logo to="/admin/dashboard" className="[&_img]:h-8" />
          <p className="hidden px-3 pt-6 pb-2 text-[11px] font-medium tracking-[0.08em] text-neutral-400 lg:block">
            Administración
          </p>
        </div>
        <nav
          ref={navRef}
          className="relative flex gap-1.5 overflow-x-auto px-3 pb-3 lg:block lg:space-y-1.5 lg:overflow-visible lg:px-3"
        >
          <span
            className="nav-indicator pointer-events-none absolute z-0 rounded-lg bg-indigo-50"
            style={{
              left: indicator.left,
              top: indicator.top,
              width: indicator.width,
              height: indicator.height,
              opacity: indicator.ready ? 1 : 0,
            }}
            aria-hidden
          />
          <span
            className="nav-indicator pointer-events-none absolute z-0 hidden rounded-full bg-indigo-600 lg:block"
            style={{
              left: indicator.left,
              top: indicator.top + Math.max((indicator.height - 16) / 2, 0),
              width: 2,
              height: indicator.ready ? 16 : 0,
              opacity: indicator.ready ? 1 : 0,
            }}
            aria-hidden
          />
          {items.map((item) => {
            const isActive = location.pathname.startsWith(item.to);
            return (
              <NavLink
                key={item.to}
                to={item.to}
                data-nav-item
                data-active={isActive ? 'true' : 'false'}
                className={classNames(
                  'relative z-10 flex items-center gap-2.5 whitespace-nowrap rounded-lg px-3 py-2.5 text-[13px] transition-colors duration-ui',
                  isActive
                    ? 'font-semibold text-indigo-700'
                    : 'font-medium text-neutral-500 hover:text-neutral-950',
                )}
              >
                <item.icon className="h-[18px] w-[18px] shrink-0 stroke-[1.5] transition-colors duration-ui" />
                {item.label}
              </NavLink>
            );
          })}
        </nav>
        <button
          type="button"
          onClick={handleLogout}
          className="mt-auto hidden items-center gap-2.5 px-6 py-4 text-[13px] font-medium text-neutral-500 transition-colors duration-ui hover:text-neutral-950 lg:flex"
        >
          <LogOut className="h-[18px] w-[18px] stroke-[1.5]" />
          Cerrar sesión
        </button>
      </aside>
      <div className="min-w-0">
        <div className="flex items-center justify-between border-b border-line bg-white px-5 py-3 lg:hidden">
          <p className="text-sm font-medium">Panel NexusERP</p>
          <button
            type="button"
            onClick={handleLogout}
            className="text-sm text-ink-muted transition-colors duration-ui hover:text-ink"
          >
            Salir
          </button>
        </div>
        <div className="page-stage overflow-x-hidden">
          <div key={location.pathname} className="page-sheet p-5 lg:p-8" data-dir={direction}>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
