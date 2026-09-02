import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { deletePlan, fetchAdminPlans, updatePlan } from '../../services/plans';
import { Plan } from '../../types';
import { formatPrice } from '../../utils/format';

export function PlansPage() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [error, setError] = useState('');

  async function load() {
    try {
      setPlans(await fetchAdminPlans());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar planes');
    }
  }

  useEffect(() => {
    void load();
  }, []);

  async function toggleActive(plan: Plan) {
    await updatePlan(plan.id, {
      name: plan.name,
      description: plan.description,
      price: plan.price,
      currency: plan.currency,
      duration_months: plan.duration_months,
      is_active: !plan.is_active,
      is_featured: plan.is_featured,
      show_price: plan.show_price,
      sort_order: plan.sort_order,
      module_ids: plan.modules.map((module) => module.id),
    });
    await load();
  }

  async function remove(plan: Plan) {
    if (!window.confirm(`¿Eliminar el plan "${plan.name}"?`)) return;
    await deletePlan(plan.id);
    await load();
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold">Planes</h1>
          <p className="mt-1 text-sm text-ink-muted">Contenido que se muestra en la sección pública de planes.</p>
        </div>
        <Link to="/admin/planes/nuevo" className="rounded-full bg-brand px-4 py-2.5 text-sm font-medium text-white transition-colors duration-ui hover:bg-brand-hover">
          Crear plan
        </Link>
      </div>
      {error ? <p className="mt-6 text-sm text-red-700">{error}</p> : null}
      <div className="mt-6 overflow-x-auto border border-line bg-white">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="bg-surface-muted text-ink-muted">
            <tr>
              <th className="px-4 py-3 font-medium">Plan</th>
              <th className="px-4 py-3 font-medium">Precio</th>
              <th className="px-4 py-3 font-medium">Módulos</th>
              <th className="px-4 py-3 font-medium">Estado</th>
              <th className="px-4 py-3 font-medium">Orden</th>
              <th className="px-4 py-3 font-medium" />
            </tr>
          </thead>
          <tbody>
            {plans.map((plan) => (
              <tr key={plan.id} className="border-t border-line">
                <td className="px-4 py-3">
                  <p className="font-medium">{plan.name}</p>
                  {plan.is_featured ? <p className="text-xs text-brand">Recomendado</p> : null}
                </td>
                <td className="px-4 py-3">
                  {plan.show_price ? formatPrice(plan.price, plan.currency) : 'Oculto'}
                </td>
                <td className="px-4 py-3 text-ink-muted">{plan.modules.length}</td>
                <td className="px-4 py-3">{plan.is_active ? 'Activo' : 'Oculto'}</td>
                <td className="px-4 py-3">{plan.sort_order}</td>
                <td className="px-4 py-3 text-right">
                  <div className="flex justify-end gap-3">
                    <button type="button" className="text-brand" onClick={() => void toggleActive(plan)}>
                      {plan.is_active ? 'Ocultar' : 'Mostrar'}
                    </button>
                    <Link to={`/admin/planes/${plan.id}`} className="text-brand">
                      Editar
                    </Link>
                    <button type="button" className="text-red-700" onClick={() => void remove(plan)}>
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {plans.length === 0 ? <p className="px-4 py-8 text-sm text-ink-muted">No hay planes registrados.</p> : null}
      </div>
    </div>
  );
}
