import { CoverImage } from '../components/CoverImage';
import { images } from '../assets/images';

const scenes = [
  {
    src: images.comercial,
    title: 'Ventas',
    text: 'Atención comercial y punto de venta conectados al resto de la operación.',
    alt: 'Caja y punto de venta con NexusERP',
  },
  {
    src: images.inventario,
    title: 'Inventario',
    text: 'Stock, movimientos y alertas alineados a la operación del almacén.',
    alt: 'Almacén con terminales NexusERP para control de inventario',
  },
  {
    src: images.logistica,
    title: 'Logística',
    text: 'Despachos y movimiento de mercadería con trazabilidad en almacén.',
    alt: 'Operación logística y despacho de mercadería',
  },
];

export function OperationsStrip() {
  return (
    <section className="border-y border-line bg-surface-muted py-20">
      <div className="page-wrap">
        <p className="text-xs font-medium uppercase tracking-[0.22em] text-brand">Operación real</p>
        <h2 className="mt-3 max-w-2xl text-3xl font-semibold md:text-4xl">
          El sistema se diseña sobre cómo ya trabaja tu empresa
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-7 text-ink-muted">
          Ventas, almacén y despacho no son módulos decorativos. Son procesos que deben verse y
          controlarse con la misma claridad en pantalla y en el piso de operación.
        </p>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {scenes.map((scene) => (
            <figure key={scene.title} className="overflow-hidden rounded-2xl border border-line bg-white">
              <div className="aspect-[4/3] overflow-hidden">
                <CoverImage src={scene.src} alt={scene.alt} />
              </div>
              <figcaption className="p-5">
                <p className="font-display text-lg font-semibold">{scene.title}</p>
                <p className="mt-1 text-sm leading-6 text-ink-muted">{scene.text}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
