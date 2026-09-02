import { Link } from 'react-router-dom';

const steps = [
  { n: '01', title: 'Analizamos tu necesidad', text: 'Revisamos el proceso actual, los documentos y los cuellos de botella.' },
  { n: '02', title: 'Definimos la solución', text: 'Acordamos alcance, módulos y criterios de entrega antes de construir.' },
  { n: '03', title: 'Diseñamos el sistema', text: 'Modelamos pantallas, flujos y reglas con el lenguaje de tu operación.' },
  { n: '04', title: 'Desarrollamos', text: 'Implementamos con arquitectura clara, validaciones y datos reales.' },
  { n: '05', title: 'Implementamos', text: 'Cargamos información, capacitamos al equipo y ponemos el sistema en marcha.' },
  { n: '06', title: 'Brindamos soporte', text: 'Corregimos, ajustamos y acompañamos la operación después del go-live.' },
];

export function CustomSystems() {
  return (
    <section id="a-medida" className="bg-white px-5 py-20 lg:px-8">
      <div className="mx-auto max-w-content">
        <div className="max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-brand">Desarrollo a medida</p>
          <h2 className="mt-3 text-3xl font-semibold md:text-4xl">¿Necesitas un sistema diferente?</h2>
          <p className="mt-4 text-lg leading-8 text-ink-muted">
            No todos los negocios trabajan de la misma manera. Desarrollamos soluciones web adaptadas a los
            procesos específicos de tu empresa.
          </p>
        </div>
        <ol className="mt-12 grid gap-0 border-l border-line md:grid-cols-2 md:border-l-0 md:border-t">
          {steps.map((step) => (
            <li key={step.n} className="border-b border-line px-0 py-6 md:border-r md:px-6 md:even:border-r-0">
              <p className="font-display text-sm font-semibold text-brand">{step.n}</p>
              <h3 className="mt-2 text-xl font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm leading-6 text-ink-muted">{step.text}</p>
            </li>
          ))}
        </ol>
        <Link
          to="/contacto"
          className="mt-10 inline-flex rounded-full bg-brand px-5 py-3 text-sm font-semibold text-white transition-colors duration-ui hover:bg-brand-hover"
        >
          Cuéntanos tu proyecto
        </Link>
      </div>
    </section>
  );
}
