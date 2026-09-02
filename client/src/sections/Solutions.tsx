import { SectionHeading } from '../components/SectionHeading';

const groups = [
  {
    title: 'Operación comercial',
    items: [
      { name: 'Facturación', text: 'Comprobantes, series y control de documentos.' },
      { name: 'Ventas', text: 'Pedidos, cotizaciones y seguimiento comercial.' },
      { name: 'Clientes', text: 'Datos, historial y condiciones de cada cuenta.' },
    ],
  },
  {
    title: 'Operación interna',
    items: [
      { name: 'Productos', text: 'Catálogo, precios y categorías.' },
      { name: 'Inventario', text: 'Stock, movimientos y alertas.' },
      { name: 'Compras', text: 'Órdenes y control de proveedores.' },
    ],
  },
  {
    title: 'Control y soporte',
    items: [
      { name: 'Logística', text: 'Despachos y seguimiento de entregas.' },
      { name: 'Reportes', text: 'Indicadores para decidir con datos.' },
      { name: 'Administración', text: 'Parámetros y configuración del sistema.' },
    ],
  },
];

export function Solutions() {
  return (
    <section id="soluciones" className="border-y border-line bg-surface-muted px-5 py-20 lg:px-8">
      <div className="mx-auto max-w-content">
        <SectionHeading
          eyebrow="Soluciones"
          title="Digitalizamos los procesos que hacen crecer tu negocio"
          description="Las soluciones se arman según cómo trabaja tu empresa. Los módulos se combinan, se ajustan o se desarrollan si el proceso lo requiere."
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {groups.map((group, index) => (
            <div key={group.title} className="bg-white p-6 ring-1 ring-line">
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
          ))}
        </div>
      </div>
    </section>
  );
}
