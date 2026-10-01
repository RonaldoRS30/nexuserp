import { Link, useLocation } from 'react-router-dom';
import { SEO } from '../components/SEO';

export function NotFoundPage() {
  const { pathname } = useLocation();

  return (
    <>
      <SEO path={pathname} notFound />
      <section className="bg-white py-28">
        <div className="page-wrap text-center">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-brand">Error 404</p>
          <h1 className="mt-3 text-4xl font-semibold text-ink md:text-5xl">Página no encontrada</h1>
          <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-ink-muted">
            La página que buscas no existe o fue movida.
          </p>
          <Link
            to="/"
            className="mt-8 inline-flex rounded-full bg-brand px-5 py-3 text-sm font-semibold text-white transition-colors duration-ui hover:bg-brand-hover"
          >
            Volver al inicio
          </Link>
        </div>
      </section>
    </>
  );
}
