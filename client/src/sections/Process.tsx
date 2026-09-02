const steps = [
  'Diagnóstico del proceso',
  'Propuesta de alcance',
  'Diseño funcional',
  'Desarrollo e integración',
  'Puesta en marcha',
  'Soporte continuo',
];

export function Process() {
  return (
    <section id="proceso" className="bg-white px-5 py-20 lg:px-8">
      <div className="mx-auto max-w-content">
        <p className="text-xs font-medium uppercase tracking-[0.22em] text-brand">Proceso</p>
        <h2 className="mt-3 max-w-xl text-3xl font-semibold md:text-4xl">Cómo trabajamos un proyecto</h2>
        <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-6">
          {steps.map((step, index) => (
            <li key={step} className="relative">
              <span className="font-display text-2xl font-semibold text-brand/30">0{index + 1}</span>
              <p className="mt-3 text-sm font-medium leading-6">{step}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
