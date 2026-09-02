import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';
import { SectionHeading } from '../components/SectionHeading';
import { usePublicPlans } from '../hooks/usePublicPlans';
import { formatPrice } from '../utils/format';
import { classNames } from '../utils/format';

export function Plans() {
  const { plans, loading, error } = usePublicPlans();

  return (
    <section id="planes" className="bg-white px-5 py-20 lg:px-8">
      <div className="mx-auto max-w-content">
        <SectionHeading
          eyebrow="Planes"
          title="Elige el alcance que necesita tu operación"
          description="Cada plan agrupa módulos concretos. El precio corresponde a 12 meses de uso del sistema comercializado. Si tu proceso no encaja, evaluamos un desarrollo a medida."
        />

        {loading ? (
          <p className="mt-12 text-sm text-ink-muted">Cargando planes…</p>
        ) : null}
        {error ? (
          <p className="mt-12 text-sm text-red-700">No se pudieron cargar los planes. Intente más tarde.</p>
        ) : null}
        {!loading && !error && plans.length === 0 ? (
          <p className="mt-12 text-sm text-ink-muted">Aún no hay planes publicados.</p>
        ) : null}

        {plans.length > 0 ? (
          <div className="plan-scroll mt-12 flex snap-x gap-5 overflow-x-auto pb-4 lg:grid lg:grid-cols-3 lg:overflow-visible lg:pb-0">
            {plans.map((plan) => (
              <article
                key={plan.id}
                className={classNames(
                  'lift flex min-w-[280px] snap-start flex-col rounded-2xl border bg-white p-6 lg:min-w-0',
                  plan.is_featured ? 'border-brand shadow-panel' : 'border-line',
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-xl font-semibold">{plan.name}</h3>
                  {plan.is_featured ? (
                    <span className="rounded-full bg-brand/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-brand">
                      Recomendado
                    </span>
                  ) : null}
                </div>
                <p className="mt-3 min-h-[64px] text-sm leading-6 text-ink-muted">{plan.description}</p>
                <div className="mt-6 border-y border-line py-5">
                  {plan.show_price ? (
                    <p className="font-display text-3xl font-semibold">{formatPrice(plan.price, plan.currency)}</p>
                  ) : (
                    <p className="font-display text-3xl font-semibold">A consultar</p>
                  )}
                  <p className="mt-1 text-sm text-ink-muted">Por {plan.duration_months} meses</p>
                </div>
                <ul className="mt-6 flex-1 space-y-2.5 text-sm">
                  {plan.modules.map((module) => (
                    <li key={module.id} className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" strokeWidth={2} />
                      <span>{module.name}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/contacto"
                  className={classNames(
                    'mt-8 inline-flex justify-center rounded-full px-4 py-2.5 text-sm font-medium transition-colors duration-ui',
                    plan.is_featured
                      ? 'bg-brand text-white hover:bg-brand-hover'
                      : 'border border-line text-ink hover:border-brand hover:text-brand',
                  )}
                >
                  Solicitar este plan
                </Link>
              </article>
            ))}
          </div>
        ) : null}

        <div className="mt-10 flex flex-col items-start justify-between gap-4 border border-dashed border-line bg-surface-muted px-6 py-5 sm:flex-row sm:items-center">
          <div>
            <p className="font-display text-lg font-semibold">¿Necesitas una solución personalizada?</p>
            <p className="mt-1 text-sm text-ink-muted">
              Si los módulos no cubren tu operación, evaluamos un desarrollo ajustado a tu proceso.
            </p>
          </div>
          <Link
            to="/contacto"
            className="inline-flex rounded-full bg-primary-dark px-4 py-2.5 text-sm font-medium text-white transition-colors duration-ui hover:bg-primary"
          >
            Solicitar cotización
          </Link>
        </div>
      </div>
    </section>
  );
}
