import { Link } from 'react-router-dom';
import { CoverImage } from '../components/CoverImage';
import { images } from '../assets/images';

const paths = [
  {
    to: '/servicios',
    label: 'Servicios',
    title: 'Soluciones tecnológicas para tu empresa',
    text: 'Cada servicio responde a un problema operativo concreto. El alcance se define con el proceso de tu empresa, no con un paquete cerrado.',
    image: images.reunion,
    alt: 'Equipo analizando indicadores y estrategia con NexusERP',
  },
  {
    to: '/soluciones',
    label: 'Soluciones',
    title: 'Digitalizamos los procesos que hacen crecer tu negocio',
    text: 'Las soluciones se arman según cómo trabaja tu empresa. Los módulos se combinan, se ajustan o se desarrollan si el proceso lo requiere.',
    image: images.almacen,
    alt: 'Almacén general con control de inventario y logística',
  },
  {
    to: '/planes',
    label: 'Planes',
    title: 'Elige el alcance que necesita tu operación',
    text: 'Cada plan agrupa módulos concretos. Si tu proceso no encaja, evaluamos un desarrollo a medida.',
    image: images.market,
    alt: 'Punto de venta en un minimarket con sistema de caja',
  },
];

export function HomePaths() {
  return (
    <section className="bg-white py-20">
      <div className="page-wrap">
        <p className="text-xs font-medium uppercase tracking-[0.22em] text-brand">Cómo podemos ayudarte</p>
        <h2 className="mt-3 text-3xl font-semibold md:text-4xl">Empieza por lo que tu empresa necesita hoy</h2>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {paths.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="lift flex flex-col overflow-hidden rounded-2xl border border-line bg-white"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <CoverImage src={item.image} alt={item.alt} />
              </div>
              <div className="flex flex-1 flex-col p-7">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-brand">{item.label}</p>
              <h3 className="mt-4 text-xl font-semibold leading-snug">{item.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-6 text-ink-muted">{item.text}</p>
              <span className="mt-6 text-sm font-medium text-brand">Ver {item.label}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
