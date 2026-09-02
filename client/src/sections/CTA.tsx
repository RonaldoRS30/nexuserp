import { Link } from 'react-router-dom';

export function CTA() {
  return (
    <section className="bg-primary-dark py-20 text-white">
      <div className="page-wrap flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <div className="min-w-0 flex-1">
          <h2 className="text-3xl font-semibold">Si el proceso ya existe, el sistema puede construirse alrededor de él.</h2>
          <p className="mt-3 text-sm leading-6 text-slate-300">
            Cuéntanos cómo opera tu empresa hoy. Preparamos una cotización con alcance, módulos y tiempos.
          </p>
        </div>
        <Link
          to="/contacto"
          className="inline-flex shrink-0 rounded-full bg-white px-5 py-3 text-sm font-semibold text-primary-dark transition-colors duration-ui hover:bg-stone-100"
        >
          Solicitar una cotización
        </Link>
      </div>
    </section>
  );
}
