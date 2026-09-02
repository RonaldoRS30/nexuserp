export function CTA() {
  return (
    <section className="bg-primary-dark px-5 py-16 text-white lg:px-8">
      <div className="mx-auto flex max-w-content flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <div>
          <h2 className="text-3xl font-semibold">Si el proceso ya existe, el sistema puede construirse alrededor de él.</h2>
          <p className="mt-3 max-w-xl text-sm leading-6 text-slate-300">
            Cuéntanos cómo opera tu empresa hoy. Preparamos una cotización con alcance, módulos y tiempos.
          </p>
        </div>
        <a
          href="#contacto"
          className="inline-flex shrink-0 rounded-sm bg-white px-5 py-3 text-sm font-medium text-primary-dark hover:bg-slate-100"
        >
          Solicitar una cotización
        </a>
      </div>
    </section>
  );
}
