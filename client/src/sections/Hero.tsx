import { Link } from 'react-router-dom';
import { DashboardMockup } from '../components/DashboardMockup';

export function Hero() {
  return (
    <section id="inicio" className="border-b border-line">
      <div className="page-wrap grid items-center gap-12 py-16 lg:grid-cols-2 lg:gap-16 lg:py-24">
        <div className="reveal">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-brand">Software empresarial</p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight text-ink md:text-5xl">
            Software que se adapta a tu negocio.
          </h1>
          <p className="mt-5 text-lg leading-8 text-ink-muted">
            Desarrollamos sistemas de facturación y soluciones web a medida para optimizar los procesos de tu
            empresa.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/contacto"
              className="inline-flex items-center justify-center rounded-full bg-brand px-5 py-3 text-sm font-semibold text-white transition-colors duration-ui hover:bg-brand-hover"
            >
              Solicitar una cotización
            </Link>
            <Link
              to="/soluciones"
              className="inline-flex items-center justify-center rounded-full border border-line px-5 py-3 text-sm font-medium text-ink transition-colors duration-ui hover:border-brand hover:text-brand"
            >
              Ver soluciones
            </Link>
          </div>
          <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-line pt-6">
            <div>
              <dt className="text-xs text-ink-muted">Especialidad</dt>
              <dd className="mt-1 text-sm font-medium">Facturación y ERP</dd>
            </div>
            <div>
              <dt className="text-xs text-ink-muted">Enfoque</dt>
              <dd className="mt-1 text-sm font-medium">Procesos reales</dd>
            </div>
            <div>
              <dt className="text-xs text-ink-muted">Modelo</dt>
              <dd className="mt-1 text-sm font-medium">A medida</dd>
            </div>
          </dl>
        </div>
        <div className="reveal reveal-delay-2">
          <DashboardMockup />
        </div>
      </div>
    </section>
  );
}
