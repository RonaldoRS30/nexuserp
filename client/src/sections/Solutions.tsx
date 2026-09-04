import { SectionHeading } from '../components/SectionHeading';
import { CoverImage } from '../components/CoverImage';
import { images } from '../assets/images';

const groups = [
  {
    title: 'Operación comercial',
    image: images.market,
    alt: 'Punto de venta en minimarket con lectora y caja',
    items: [
      { name: 'Facturación', text: 'Comprobantes, series y control de documentos.' },
      { name: 'Ventas', text: 'Pedidos, cotizaciones y seguimiento comercial.' },
      { name: 'Clientes', text: 'Datos, historial y condiciones de cada cuenta.' },
    ],
  },
  {
    title: 'Operación interna',
    image: images.inventario,
    alt: 'Control de inventario con NexusERP en almacén',
    items: [
      { name: 'Productos', text: 'Catálogo, precios y categorías.' },
      { name: 'Inventario', text: 'Stock, movimientos y alertas.' },
      { name: 'Compras', text: 'Órdenes y control de proveedores.' },
    ],
  },
  {
    title: 'Control y soporte',
    image: images.implementacion,
    alt: 'Equipo revisando reportes e indicadores de gestión',
    items: [
      { name: 'Logística', text: 'Despachos y seguimiento de entregas.' },
      { name: 'Reportes', text: 'Indicadores para decidir con datos.' },
      { name: 'Administración', text: 'Parámetros y configuración del sistema.' },
    ],
  },
];

export function Solutions() {
  return (
    <section id="soluciones" className="border-y border-line bg-surface-muted py-20">
      <div className="page-wrap">
        <SectionHeading
          eyebrow="Soluciones"
          title="Digitalizamos los procesos que hacen crecer tu negocio"
          description="Las soluciones se arman según cómo trabaja tu empresa. Los módulos se combinan, se ajustan o se desarrollan si el proceso lo requiere."
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {groups.map((group, index) => (
            <div key={group.title} className="overflow-hidden bg-white ring-1 ring-line">
              <div className="aspect-[16/10]">
                <CoverImage src={group.image} alt={group.alt} />
              </div>
              <div className="p-6">
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-brand">
                0{index + 1} / {group.title}
              </p>
              <ul className="mt-6 divide-y divide-line">
                {group.items.map((item) => (
                  <li key={item.name} className="py-4">
                    <p className="font-display text-lg font-semibold">{item.name}</p>
                    <p className="mt-1 text-sm text-ink-muted">{item.text}</p>
                  </li>
                ))}
              </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
