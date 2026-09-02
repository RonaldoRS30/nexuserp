import { Link } from 'react-router-dom';

export function CTA() {
  return (
    <section className="bg-primary-dark px-5 py-20 text-white lg:px-8">
      <div className="mx-auto flex max-w-content flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <div>
          <h2 className="text-3xl font-semibold">Si el proceso ya existe, el sistema puede construirse alrededor de él.</h2>
          <p className="mt-3 max-w-xl text-sm leading-6 text-slate-300">
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
