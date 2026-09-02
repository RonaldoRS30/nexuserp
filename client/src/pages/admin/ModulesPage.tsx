import { FormEvent, useEffect, useState } from 'react';
import { createModule, deleteModule, fetchAdminModules, updateModule } from '../../services/modules';
import { CatalogModule } from '../../types';
import { moduleIconOptions, ModuleIcon } from '../../components/ModuleIcon';
import { ApiError } from '../../services/api';

const empty = {
  name: '',
  description: '',
  icon: 'layers',
  is_active: true,
  sort_order: '0',
};

export function ModulesPage() {
  const [modules, setModules] = useState<CatalogModule[]>([]);
  const [form, setForm] = useState(empty);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [error, setError] = useState('');

  async function load() {
    setModules(await fetchAdminModules());
  }

  useEffect(() => {
    void load().catch((err: Error) => setError(err.message));
  }, []);

  function startEdit(module: CatalogModule) {
    setEditingId(module.id);
    setForm({
      name: module.name,
      description: module.description ?? '',
      icon: module.icon,
      is_active: Boolean(module.is_active),
      sort_order: String(module.sort_order),
    });
  }

  function reset() {
    setEditingId(null);
    setForm(empty);
  }

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setError('');
    const payload = {
      name: form.name,
      description: form.description,
      icon: form.icon,
      is_active: form.is_active,
      sort_order: Number(form.sort_order),
    };
    try {
      if (editingId) {
        await updateModule(editingId, payload);
      } else {
        await createModule(payload);
      }
      reset();
      await load();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'No se pudo guardar el módulo');
    }
  }

  async function toggle(module: CatalogModule) {
    await updateModule(module.id, {
      name: module.name,
      description: module.description,
      icon: module.icon,
      is_active: !module.is_active,
      sort_order: module.sort_order,
    });
    await load();
  }

  async function remove(module: CatalogModule) {
    if (!window.confirm(`¿Eliminar el módulo "${module.name}"?`)) return;
    await deleteModule(module.id);
    await load();
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
      <div>
        <h1 className="text-2xl font-semibold">Módulos</h1>
        <p className="mt-1 text-sm text-ink-muted">Catálogo dinámico asociado a los planes comerciales.</p>
        {error ? <p className="mt-4 text-sm text-red-700">{error}</p> : null}
        <div className="mt-6 overflow-x-auto border border-line bg-white">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="bg-surface-muted text-ink-muted">
              <tr>
                <th className="px-4 py-3 font-medium">Módulo</th>
                <th className="px-4 py-3 font-medium">Estado</th>
                <th className="px-4 py-3 font-medium">Orden</th>
                <th className="px-4 py-3 font-medium" />
              </tr>
            </thead>
            <tbody>
              {modules.map((module) => (
                <tr key={module.id} className="border-t border-line">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <ModuleIcon name={module.icon} className="h-4 w-4 text-brand" />
                      <span className="font-medium">{module.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">{module.is_active ? 'Activo' : 'Oculto'}</td>
                  <td className="px-4 py-3">{module.sort_order}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-3">
                      <button type="button" className="text-brand" onClick={() => void toggle(module)}>
                        {module.is_active ? 'Desactivar' : 'Activar'}
                      </button>
                      <button type="button" className="text-brand" onClick={() => startEdit(module)}>
                        Editar
                      </button>
                      <button type="button" className="text-red-700" onClick={() => void remove(module)}>
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {modules.length === 0 ? <p className="px-4 py-8 text-sm text-ink-muted">No hay módulos.</p> : null}
        </div>
      </div>
      <form onSubmit={onSubmit} className="h-fit border border-line bg-white p-5">
        <h2 className="font-display text-lg font-semibold">{editingId ? 'Editar módulo' : 'Crear módulo'}</h2>
        <label className="mt-4 block text-sm font-medium">
          Nombre
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className={inputClass}
            required
          />
        </label>
        <label className="mt-3 block text-sm font-medium">
          Descripción
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className={`${inputClass} min-h-20`}
          />
        </label>
        <label className="mt-3 block text-sm font-medium">
          Icono
          <select value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} className={inputClass}>
            {moduleIconOptions.map((icon) => (
              <option key={icon} value={icon}>
                {icon}
              </option>
            ))}
          </select>
        </label>
        <label className="mt-3 block text-sm font-medium">
          Orden
          <input
            type="number"
            min="0"
            value={form.sort_order}
            onChange={(e) => setForm({ ...form, sort_order: e.target.value })}
            className={inputClass}
          />
        </label>
        <label className="mt-3 flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={form.is_active}
            onChange={(e) => setForm({ ...form, is_active: e.target.checked })}
          />
          Activo
        </label>
        <div className="mt-5 flex gap-3">
          <button type="submit" className="rounded-full bg-brand px-4 py-2 text-sm font-medium text-white transition-colors duration-ui hover:bg-brand-hover">
            Guardar
          </button>
          {editingId ? (
            <button type="button" onClick={reset} className="text-sm text-ink-muted">
              Cancelar
            </button>
          ) : null}
        </div>
      </form>
    </div>
  );
}

const inputClass =
  'mt-1 w-full rounded-sm border border-line px-3 py-2 text-sm outline-none ring-brand/20 focus:ring-2';
