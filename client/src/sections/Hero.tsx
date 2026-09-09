import { Link } from 'react-router-dom';
import { DashboardMockup } from '../components/DashboardMockup';
import { MacbookScroll } from '@/components/ui/macbook-scroll';
import { DotBackground } from '../components/aceternity/DotBackground';
import { HoverBorderGradient } from '../components/aceternity/HoverBorderGradient';

export function Hero() {
  return (
    <section id="inicio" className="relative z-0 border-b border-line bg-white max-md:overflow-x-clip">
      <DotBackground />
      <div className="relative w-full">
        <MacbookScroll
          showGradient={false}
          screen={<DashboardMockup className="h-full min-h-0 rounded-none border-0 shadow-none" />}
          title={
            <span className="flex flex-col items-center gap-3">
              <span className="text-xs font-medium uppercase tracking-[0.22em] text-brand">
                Software empresarial
              </span>
              <h1 className="block text-4xl font-semibold leading-tight text-ink md:text-5xl">
                Software que se adapta a tu negocio.
              </h1>
              <span className="mx-auto block max-w-2xl text-base font-normal leading-7 text-ink-muted md:text-lg">
                Desarrollamos sistemas de facturación y soluciones web a medida para optimizar los procesos de
                tu empresa.
              </span>
              <span className="mt-2 flex w-full flex-col items-center justify-center gap-3 sm:mt-1 sm:flex-row">
                <Link
                  to="/contacto"
                  className="inline-flex w-full max-w-xs items-center justify-center rounded-full bg-brand px-5 py-3 text-sm font-semibold text-white transition-colors duration-ui hover:bg-brand-hover sm:w-auto"
                >
                  Solicitar una cotización
                </Link>
                <HoverBorderGradient to="/soluciones">Ver soluciones</HoverBorderGradient>
              </span>
            </span>
          }
        />
      </div>
    </section>
  );
}
