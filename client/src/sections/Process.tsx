const steps = [
  {
    title: 'Diagnóstico del proceso',
    text: 'Revisamos el proceso actual, los documentos y los cuellos de botella.',
  },
  {
    title: 'Propuesta de alcance',
    text: 'Acordamos alcance, módulos y criterios de entrega antes de construir.',
  },
  {
    title: 'Diseño funcional',
    text: 'Modelamos pantallas, flujos y reglas con el lenguaje de tu operación.',
  },
  {
    title: 'Desarrollo e integración',
    text: 'Implementamos con arquitectura clara, validaciones y datos reales.',
  },
  {
    title: 'Puesta en marcha',
    text: 'Cargamos información, capacitamos al equipo y ponemos el sistema en marcha.',
  },
  {
    title: 'Soporte continuo',
    text: 'Corregimos, ajustamos y acompañamos la operación después del go-live.',
  },
];

export function Process() {
  return (
    <section id="proceso" className="bg-white py-20">
      <div className="page-wrap">
        <p className="text-xs font-medium uppercase tracking-[0.22em] text-brand">Proceso</p>
        <h2 className="mt-3 text-3xl font-semibold md:text-4xl">Cómo trabajamos un proyecto</h2>
        <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, index) => (
            <li key={step.title} className="rounded-2xl border border-line bg-surface-muted p-6">
              <span className="font-display text-2xl font-semibold text-brand/35">0{index + 1}</span>
              <p className="mt-3 text-sm font-semibold leading-6">{step.title}</p>
              <p className="mt-2 text-sm leading-6 text-ink-muted">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
