import { Link } from 'react-router-dom';
import { Cable, FileText, LifeBuoy, Monitor, RefreshCw, Workflow } from 'lucide-react';
import { SectionHeading } from '../components/SectionHeading';

const services = [
  {
    icon: FileText,
    name: 'Sistemas de Facturación',
    description:
      'Emisión de comprobantes, control de series y seguimiento del estado de cada documento desde un solo lugar.',
    benefits: ['Comprobantes electrónicos', 'Historial por cliente', 'Exportación contable'],
    featured: true,
  },
  {
    icon: Monitor,
    name: 'Sistemas Web a Medida',
    description:
      'Aplicaciones construidas sobre los flujos de tu operación, no sobre una plantilla genérica de mercado.',
    benefits: ['Flujos propios', 'Acceso por roles', 'Escalable'],
  },
  {
    icon: Workflow,
    name: 'Software Empresarial',
    description:
      'Módulos de ventas, productos, inventario y administración conectados para reducir trabajo duplicado.',
    benefits: ['Operación unificada', 'Menos retrabajo', 'Visibilidad'],
  },
  {
    icon: RefreshCw,
    name: 'Automatización de Procesos',
    description:
      'Identificamos tareas repetitivas y las convertimos en reglas, validaciones y seguimientos automáticos.',
    benefits: ['Menos carga operativa', 'Menos errores'],
  },
  {
    icon: Cable,
    name: 'Integración de Sistemas',
    description:
      'Conectamos el sistema con herramientas que ya usa tu empresa: contabilidad, pasarelas, APIs o archivos.',
    benefits: ['Datos consistentes', 'Menos digitación'],
  },
  {
    icon: LifeBuoy,
    name: 'Soporte y Mantenimiento',
    description:
      'Acompañamiento después de la puesta en marcha: correcciones, ajustes y evolución del sistema.',
    benefits: ['Soporte técnico', 'Mejoras continuas'],
  },
];

export function Services() {
  const featured = services[0];
  const rest = services.slice(1);

  return (
    <section id="servicios" className="bg-white py-20">
      <div className="page-wrap">
        <SectionHeading
          eyebrow="Servicios"
          title="Soluciones tecnológicas para tu empresa"
          description="Cada servicio responde a un problema operativo concreto. El alcance se define con el proceso de tu empresa, no con un paquete cerrado."
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-5">
          <article className="lift rounded-2xl border border-line bg-surface-muted p-8 lg:col-span-2">
            <featured.icon className="h-6 w-6 text-brand" strokeWidth={1.6} />
            <h3 className="mt-5 text-2xl font-semibold">{featured.name}</h3>
            <p className="mt-3 text-sm leading-7 text-ink-muted">{featured.description}</p>
            <ul className="mt-6 space-y-2 text-sm">
              {featured.benefits.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand" />
                  {item}
                </li>
              ))}
            </ul>
            <Link to="/contacto" className="mt-8 inline-block text-sm font-medium text-brand transition-colors duration-ui hover:text-brand-hover">
              Consultar este servicio
            </Link>
          </article>
          <div className="grid gap-6 sm:grid-cols-2 lg:col-span-3">
            {rest.map((service) => (
              <article key={service.name} className="lift rounded-2xl border border-line bg-white p-6">
                <service.icon className="h-5 w-5 text-primary" strokeWidth={1.6} />
                <h3 className="mt-4 text-lg font-semibold">{service.name}</h3>
                <p className="mt-2 text-sm leading-6 text-ink-muted">{service.description}</p>
                <p className="mt-4 text-xs text-ink-muted">{service.benefits.join(' · ')}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
