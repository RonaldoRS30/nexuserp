import { SectionHeading } from '../components/SectionHeading';
import { ModuleIcon } from '../components/ModuleIcon';
import { usePublicModules } from '../hooks/usePublicModules';

export function Modules() {
  const { modules, loading, error } = usePublicModules();

  return (
    <section id="modulos" className="border-y border-line bg-surface-muted px-5 py-20 lg:px-8">
      <div className="mx-auto max-w-content">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.2fr)]">
          <SectionHeading
            eyebrow="Módulos"
            title="El sistema se arma con las piezas que tu empresa realmente usa"
            description="Los módulos se combinan dentro de cada plan. También pueden formar parte de un desarrollo a medida si el proceso lo exige."
          />
          <div>
            {loading ? <p className="text-sm text-ink-muted">Cargando módulos…</p> : null}
            {error ? <p className="text-sm text-red-700">No se pudieron cargar los módulos.</p> : null}
            {!loading && !error && modules.length === 0 ? (
              <p className="text-sm text-ink-muted">Aún no hay módulos publicados.</p>
            ) : null}
            <div className="grid gap-px bg-line sm:grid-cols-2">
              {modules.map((module) => (
                <article key={module.id} className="bg-white p-5">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center bg-surface-muted text-brand">
                      <ModuleIcon name={module.icon} />
                    </span>
                    <h3 className="font-display text-base font-semibold">{module.name}</h3>
                  </div>
                  {module.description ? (
                    <p className="mt-3 text-sm leading-6 text-ink-muted">{module.description}</p>
                  ) : null}
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
