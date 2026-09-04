import { CoverImage } from '../components/CoverImage';
import { images } from '../assets/images';

const reasons = [
  {
    title: 'Desarrollo a medida',
    text: 'El sistema se adapta a tus procesos. No partimos de una plantilla genérica: modelamos pantallas, flujos y reglas con el lenguaje de tu operación.',
  },
  {
    title: 'Arquitectura escalable',
    text: 'Construimos soluciones preparadas para crecer, con validaciones, roles y datos reales desde la puesta en marcha.',
  },
  {
    title: 'Enfoque empresarial',
    text: 'Analizamos el proceso antes de desarrollar. Revisamos documentos, cuellos de botella y el alcance antes de construir.',
  },
  {
    title: 'Tecnología moderna',
    text: 'Utilizamos herramientas actuales para crear soluciones eficientes, estables y entendibles para tu equipo.',
  },
  {
    title: 'Soporte',
    text: 'Acompañamos la solución después de su implementación: correcciones, ajustes y evolución del sistema.',
  },
];

export function WhyNexus() {
  return (
    <section id="nosotros" className="border-y border-line bg-surface-muted py-20">
      <div className="page-wrap grid gap-12 lg:grid-cols-2">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-brand">Por qué NexusERP</p>
          <h2 className="mt-3 text-3xl font-semibold md:text-4xl">Construimos el sistema alrededor de su operación</h2>
          <p className="mt-4 text-base leading-7 text-ink-muted">
            Trabajamos con empresas que necesitan un sistema estable, entendible para su equipo y alineado con
            la forma en que ya operan.
          </p>
          <div className="mt-8 overflow-hidden rounded-2xl border border-line">
            <div className="aspect-[16/10]">
              <CoverImage
                src={images.sistema}
                alt="Sistema empresarial NexusERP en operación"
              />
            </div>
          </div>
        </div>
        <ol className="divide-y divide-line border-y border-line bg-white">
          {reasons.map((item, index) => (
            <li key={item.title} className="grid grid-cols-[72px_1fr] gap-4 px-5 py-5">
              <span className="font-display text-sm text-ink-muted">0{index + 1}</span>
              <div>
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="mt-1 text-sm text-ink-muted">{item.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
