import { FormEvent, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { createPlan, fetchAdminPlan, updatePlan } from '../../services/plans';
import { fetchAdminModules } from '../../services/modules';
import { CatalogModule } from '../../types';
import { ApiError } from '../../services/api';

const empty = {
  name: '',
  description: '',
  price: '',
  currency: 'PEN',
  duration_months: '12',
  is_active: true,
  is_featured: false,
  show_price: true,
  sort_order: '0',
};

export function PlanFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  const [form, setForm] = useState(empty);
  const [moduleIds, setModuleIds] = useState<number[]>([]);
  const [modules, setModules] = useState<CatalogModule[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    void fetchAdminModules().then(setModules);
  }, []);

  useEffect(() => {
    if (!id) return;
    fetchAdminPlan(Number(id))
      .then((plan) => {
        setForm({
          name: plan.name,
          description: plan.description ?? '',
          price: String(plan.price),
          currency: plan.currency,
          duration_months: String(plan.duration_months),
          is_active: Boolean(plan.is_active),
          is_featured: plan.is_featured,
          show_price: plan.show_price,
          sort_order: String(plan.sort_order),
        });
        setModuleIds(plan.modules.map((module) => module.id));
      })
      .catch((err: Error) => setError(err.message));
  }, [id]);

  function toggleModule(moduleId: number) {
    setModuleIds((current) =>
      current.includes(moduleId) ? current.filter((item) => item !== moduleId) : [...current, moduleId],
    );
  }

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setError('');
    setLoading(true);
    const payload = {
      name: form.name,
      description: form.description,
      price: Number(form.price),
      currency: form.currency,
      duration_months: Number(form.duration_months),
      is_active: form.is_active,
      is_featured: form.is_featured,
      show_price: form.show_price,
      sort_order: Number(form.sort_order),
      module_ids: moduleIds,
    };

    try {
      if (isEdit && id) {
        await updatePlan(Number(id), payload);
      } else {
        await createPlan(payload);
      }
      navigate('/admin/planes');
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'No se pudo guardar el plan');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-3xl">
      <Link to="/admin/planes" className="text-sm text-brand">
        ← Volver a planes
      </Link>
      <h1 className="mt-4 text-2xl font-semibold">{isEdit ? 'Editar plan' : 'Crear plan'}</h1>
      <form onSubmit={onSubmit} className="mt-8 space-y-5 border border-line bg-white p-6">
        <label className="block text-sm font-medium">
          Nombre
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className={inputClass}
            required
          />
        </label>
        <label className="block text-sm font-medium">
          Descripción
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className={`${inputClass} min-h-24`}
          />
        </label>
        <div className="grid gap-4 sm:grid-cols-3">
          <label className="block text-sm font-medium">
            Precio
            <input
              type="number"
              min="0"
              step="0.01"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              className={inputClass}
              required
            />
          </label>
          <label className="block text-sm font-medium">
            Moneda
            <input
              value={form.currency}
              onChange={(e) => setForm({ ...form, currency: e.target.value })}
              className={inputClass}
            />
          </label>
          <label className="block text-sm font-medium">
            Duración (meses)
            <input
              type="number"
              min="1"
              value={form.duration_months}
              onChange={(e) => setForm({ ...form, duration_months: e.target.value })}
              className={inputClass}
              required
            />
          </label>
        </div>
        <label className="block text-sm font-medium">
          Orden de visualización
          <input
            type="number"
            min="0"
            value={form.sort_order}
            onChange={(e) => setForm({ ...form, sort_order: e.target.value })}
            className={inputClass}
          />
        </label>
        <div className="grid gap-3 sm:grid-cols-3">
          <Check label="Activo / visible" checked={form.is_active} onChange={(v) => setForm({ ...form, is_active: v })} />
          <Check label="Plan recomendado" checked={form.is_featured} onChange={(v) => setForm({ ...form, is_featured: v })} />
          <Check label="Mostrar precio" checked={form.show_price} onChange={(v) => setForm({ ...form, show_price: v })} />
        </div>
        <fieldset>
          <legend className="text-sm font-medium">Módulos incluidos</legend>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {modules.map((module) => (
              <label key={module.id} className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={moduleIds.includes(module.id)}
                  onChange={() => toggleModule(module.id)}
                />
                {module.name}
                {!module.is_active ? <span className="text-xs text-ink-muted">(inactivo)</span> : null}
              </label>
            ))}
          </div>
        </fieldset>
        {error ? <p className="text-sm text-red-700">{error}</p> : null}
        <button
          type="submit"
          disabled={loading}
          className="rounded-sm bg-brand px-5 py-2.5 text-sm font-medium text-white disabled:opacity-60"
        >
          {loading ? 'Guardando…' : 'Guardar'}
        </button>
      </form>
    </div>
  );
}

const inputClass =
  'mt-1 w-full rounded-sm border border-line px-3 py-2.5 text-sm outline-none ring-brand/20 focus:ring-2';

function Check({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <label className="flex items-center gap-2 text-sm">
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
      {label}
    </label>
  );
}
