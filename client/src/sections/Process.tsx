import { StickyScroll } from '../components/aceternity/StickyScroll';

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
        <StickyScroll steps={steps} />
      </div>
    </section>
  );
}
