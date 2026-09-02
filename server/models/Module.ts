import { ResultSetHeader } from 'mysql2';
import { query } from '../config/database';
import { ModuleRow } from '../types';

export async function findAllModules(): Promise<ModuleRow[]> {
  return query<ModuleRow[]>('SELECT * FROM modules ORDER BY sort_order ASC, id ASC');
}

export async function findActiveModules(): Promise<ModuleRow[]> {
  return query<ModuleRow[]>(
    'SELECT * FROM modules WHERE is_active = 1 ORDER BY sort_order ASC, id ASC',
  );
}

export async function findModuleById(id: number): Promise<ModuleRow | null> {
  const rows = await query<ModuleRow[]>('SELECT * FROM modules WHERE id = :id LIMIT 1', { id });
  return rows[0] ?? null;
}

export async function createModule(data: {
  name: string;
  description: string | null;
  icon: string;
  is_active: boolean;
  sort_order: number;
}): Promise<number> {
  const result = await query<ResultSetHeader>(
    `INSERT INTO modules (name, description, icon, is_active, sort_order)
     VALUES (:name, :description, :icon, :is_active, :sort_order)`,
    {
      name: data.name,
      description: data.description,
      icon: data.icon,
      is_active: data.is_active ? 1 : 0,
      sort_order: data.sort_order,
    },
  );
  return result.insertId;
}

export async function updateModule(
  id: number,
  data: {
    name: string;
    description: string | null;
    icon: string;
    is_active: boolean;
    sort_order: number;
  },
): Promise<void> {
  await query(
    `UPDATE modules
     SET name = :name, description = :description, icon = :icon,
         is_active = :is_active, sort_order = :sort_order
     WHERE id = :id`,
    {
      id,
      name: data.name,
      description: data.description,
      icon: data.icon,
      is_active: data.is_active ? 1 : 0,
      sort_order: data.sort_order,
    },
  );
}

export async function deleteModule(id: number): Promise<void> {
  await query('DELETE FROM modules WHERE id = :id', { id });
}

export async function countActiveModules(): Promise<number> {
  const rows = await query<Array<{ total: number }>>(
    'SELECT COUNT(*) AS total FROM modules WHERE is_active = 1',
  );
  return rows[0]?.total ?? 0;
}

export async function findModulesByPlanIds(planIds: number[]): Promise<
  Array<ModuleRow & { plan_id: number }>
> {
  if (!planIds.length) return [];
  const placeholders = planIds.map((_, i) => `:id${i}`).join(', ');
  const params = Object.fromEntries(planIds.map((id, i) => [`id${i}`, id]));
  return query<Array<ModuleRow & { plan_id: number }>>(
    `SELECT m.*, pm.plan_id
     FROM plan_modules pm
     INNER JOIN modules m ON m.id = pm.module_id
     WHERE pm.plan_id IN (${placeholders})
     ORDER BY m.sort_order ASC, m.id ASC`,
    params,
  );
}
