import { Link } from 'react-router-dom';
import { Logo } from './Logo';
import { config } from '../config';

const footerLinks = [
  { label: 'Inicio', href: '/#inicio' },
  { label: 'Servicios', href: '/#servicios' },
  { label: 'Soluciones', href: '/#soluciones' },
  { label: 'Planes', href: '/#planes' },
  { label: 'Contacto', href: '/#contacto' },
];

export function Footer() {
  return (
    <footer className="border-t border-line bg-primary-dark text-white">
      <div className="mx-auto grid max-w-content gap-10 px-5 py-14 md:grid-cols-3 lg:px-8">
        <div>
          <div className="inline-flex rounded-sm bg-white px-3 py-2">
            <Logo className="[&_img]:h-9" />
          </div>
          <p className="mt-5 max-w-sm text-sm leading-6 text-slate-300">
            Soluciones de software diseñadas para optimizar procesos y acompañar el crecimiento de las
            empresas.
          </p>
          <p className="mt-4 text-[11px] font-medium uppercase tracking-[0.22em] text-slate-400">
            {config.slogan}
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold">Navegación</p>
          <ul className="mt-4 space-y-2 text-sm text-slate-300">
            {footerLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="hover:text-white">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold">Legal</p>
          <ul className="mt-4 space-y-2 text-sm text-slate-300">
            <li>
              <Link to="/privacidad" className="hover:text-white">
                Política de privacidad
              </Link>
            </li>
            <li>
              <Link to="/terminos" className="hover:text-white">
                Términos y condiciones
              </Link>
            </li>
          </ul>
          {config.contactEmail ? (
            <p className="mt-6 text-sm text-slate-300">{config.contactEmail}</p>
          ) : null}
          {config.contactPhone ? (
            <p className="text-sm text-slate-300">{config.contactPhone}</p>
          ) : null}
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-content px-5 py-5 text-xs text-slate-400 lg:px-8">
          © 2026 NexusERP. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
