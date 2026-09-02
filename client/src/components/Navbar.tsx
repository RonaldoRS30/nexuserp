import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Logo } from './Logo';
import { navLinks } from '../config';
import { classNames } from '../utils/format';

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header
      className={classNames(
        'sticky top-0 z-50 border-b bg-white/95 backdrop-blur-sm transition-shadow',
        scrolled ? 'border-line shadow-nav' : 'border-transparent',
      )}
    >
      <div className="mx-auto flex max-w-content items-center justify-between gap-6 px-5 py-3 lg:px-8">
        <Logo />
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Principal">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[13px] font-medium text-ink-muted transition-colors hover:text-ink"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="hidden lg:block">
          <Link
            to="/#contacto"
            className="inline-flex rounded-sm bg-brand px-4 py-2.5 text-[13px] font-medium text-white transition-colors hover:bg-[#125890]"
          >
            Solicitar cotización
          </Link>
        </div>
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-sm border border-line text-ink lg:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open ? (
        <div className="border-t border-line bg-white lg:hidden">
          <nav className="flex flex-col px-5 py-4" aria-label="Móvil">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="border-b border-line py-3 text-sm font-medium text-ink"
              >
                {link.label}
              </a>
            ))}
            <Link
              to="/#contacto"
              className="mt-4 inline-flex justify-center rounded-sm bg-brand px-4 py-3 text-sm font-medium text-white"
            >
              Solicitar cotización
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
