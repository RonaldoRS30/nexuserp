import { Link } from 'react-router-dom';
import { Logo } from './Logo';
import { config, footerLinks } from '../config';
import { useSiteSettings } from '../hooks/useSiteSettings';

export function Footer() {
  const { settings } = useSiteSettings();

  return (
    <footer className="mt-auto border-t border-white/10 bg-primary-dark text-white">
      <div className="page-wrap grid gap-10 py-16 md:grid-cols-3">
        <div>
          <div className="inline-flex rounded-lg bg-white px-3 py-2">
            <Logo className="[&_img]:h-16" />
          </div>
          <p className="mt-5 text-sm leading-6 text-neutral-400">
            Soluciones de software diseñadas para optimizar procesos y acompañar el crecimiento de las
            empresas.
          </p>
          <p className="mt-4 text-[11px] font-medium uppercase tracking-[0.22em] text-neutral-500">
            {config.slogan}
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold">Navegación</p>
          <ul className="mt-4 space-y-2.5 text-sm text-neutral-400">
            {footerLinks.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="transition-colors duration-ui hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold">Legal</p>
          <ul className="mt-4 space-y-2.5 text-sm text-neutral-400">
            <li>
              <Link to="/privacidad" className="transition-colors duration-ui hover:text-white">
                Política de privacidad
              </Link>
            </li>
            <li>
              <Link to="/terminos" className="transition-colors duration-ui hover:text-white">
                Términos y condiciones
              </Link>
            </li>
          </ul>
          {settings.contact_email ? (
            <p className="mt-6 text-sm text-neutral-400">{settings.contact_email}</p>
          ) : null}
          {settings.contact_phone ? (
            <p className="text-sm text-neutral-400">{settings.contact_phone}</p>
          ) : null}
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="page-wrap py-5 text-xs text-neutral-500">
          © 2026 NexusERP. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
