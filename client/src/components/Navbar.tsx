import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Logo } from './Logo';
import { isNavActive, navLinks } from '../config';
import { classNames } from '../utils/format';
import { useSlidingIndicator } from '../hooks/useSlidingIndicator';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navRef = useRef<HTMLElement>(null);
  const activeTo = navLinks.find((link) => isNavActive(location.pathname, link.to))?.to ?? '';
  const indicator = useSlidingIndicator(activeTo, navRef);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={classNames(
        'sticky top-0 z-50 border-b bg-white/90 backdrop-blur-md transition-[border-color,box-shadow] duration-ui',
        scrolled ? 'border-line shadow-nav' : 'border-transparent',
      )}
    >
      <div className="page-wrap flex h-16 items-center gap-3 sm:gap-5">
        <Logo className="shrink-0" />
        <nav
          ref={navRef}
          className="relative flex min-w-0 flex-1 items-center gap-0.5 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          aria-label="Principal"
        >
          <span
            className="nav-indicator pointer-events-none absolute top-1/2 -z-0 h-8 -translate-y-1/2 rounded-full bg-stone-100"
            style={{
              left: indicator.left,
              width: indicator.width,
              opacity: indicator.ready ? 1 : 0,
            }}
            aria-hidden
          />
          <span
            className="nav-indicator pointer-events-none absolute -bottom-0.5 z-0 h-[3px] rounded-full bg-brand"
            style={{
              left: indicator.left + 10,
              width: Math.max(indicator.width - 20, 0),
              opacity: indicator.ready ? 1 : 0,
            }}
            aria-hidden
          />
          {navLinks.map((link) => {
            const active = isNavActive(location.pathname, link.to);
            return (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                data-nav-item
                data-active={active ? 'true' : 'false'}
                className={classNames(
                  'relative z-10 inline-flex shrink-0 items-center rounded-full px-2.5 py-1.5 text-sm font-medium tracking-tight transition-colors duration-ui sm:px-3.5',
                  active ? 'font-semibold text-brand' : 'text-ink hover:text-brand',
                )}
              >
                {link.label}
              </NavLink>
            );
          })}
        </nav>
        <Link
          to="/contacto"
          className="hidden h-9 shrink-0 items-center rounded-full bg-brand px-4 text-[13px] font-semibold text-white transition-[background-color,transform] duration-ui hover:-translate-y-px hover:bg-brand-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30 sm:inline-flex"
        >
          Solicitar cotización
        </Link>
      </div>
    </header>
  );
}
