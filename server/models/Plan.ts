import { ResultSetHeader } from 'mysql2';
import { query } from '../config/database';
import { PlanRow } from '../types';

export async function findAllPlans(): Promise<PlanRow[]> {
  return query<PlanRow[]>('SELECT * FROM plans ORDER BY sort_order ASC, id ASC');
}

export async function findPublicPlans(): Promise<PlanRow[]> {
  return query<PlanRow[]>(
    'SELECT * FROM plans WHERE is_active = 1 ORDER BY sort_order ASC, id ASC',
  );
}

export async function findPlanById(id: number): Promise<PlanRow | null> {
  const rows = await query<PlanRow[]>('SELECT * FROM plans WHERE id = :id LIMIT 1', { id });
  return rows[0] ?? null;
}

export async function createPlan(data: {
  name: string;
  description: string | null;
  price: number;
  currency: string;
  duration_months: number;
  is_active: boolean;
  is_featured: boolean;
  show_price: boolean;
  sort_order: number;
}): Promise<number> {
  const result = await query<ResultSetHeader>(
    `INSERT INTO plans
      (name, description, price, currency, duration_months, is_active, is_featured, show_price, sort_order)
     VALUES
      (:name, :description, :price, :currency, :duration_months, :is_active, :is_featured, :show_price, :sort_order)`,
    {
      name: data.name,
      description: data.description,
      price: data.price,
      currency: data.currency,
      duration_months: data.duration_months,
      is_active: data.is_active ? 1 : 0,
      is_featured: data.is_featured ? 1 : 0,
      show_price: data.show_price ? 1 : 0,
      sort_order: data.sort_order,
    },
  );
  return result.insertId;
}

export async function updatePlan(
  id: number,
  data: {
    name: string;
    description: string | null;
    price: number;
    currency: string;
    duration_months: number;
    is_active: boolean;
    is_featured: boolean;
    show_price: boolean;
    sort_order: number;
  },
): Promise<void> {
  await query(
    `UPDATE plans SET
      name = :name,
      description = :description,
      price = :price,
      currency = :currency,
      duration_months = :duration_months,
      is_active = :is_active,
      is_featured = :is_featured,
      show_price = :show_price,
      sort_order = :sort_order
     WHERE id = :id`,
    {
      id,
      name: data.name,
      description: data.description,
      price: data.price,
      currency: data.currency,
      duration_months: data.duration_months,
      is_active: data.is_active ? 1 : 0,
      is_featured: data.is_featured ? 1 : 0,
      show_price: data.show_price ? 1 : 0,
      sort_order: data.sort_order,
    },
  );
}

export async function deletePlan(id: number): Promise<void> {
  await query('DELETE FROM plans WHERE id = :id', { id });
}

export async function countActivePlans(): Promise<number> {
  const rows = await query<Array<{ total: number }>>(
    'SELECT COUNT(*) AS total FROM plans WHERE is_active = 1',
  );
  return rows[0]?.total ?? 0;
}

export async function replacePlanModules(planId: number, moduleIds: number[]): Promise<void> {
  await query('DELETE FROM plan_modules WHERE plan_id = :planId', { planId });
  for (const moduleId of moduleIds) {
    await query(
      'INSERT INTO plan_modules (plan_id, module_id) VALUES (:planId, :moduleId)',
      { planId, moduleId },
    );
  }
}

export async function getPlanModuleIds(planId: number): Promise<number[]> {
  const rows = await query<Array<{ module_id: number }>>(
    'SELECT module_id FROM plan_modules WHERE plan_id = :planId',
    { planId },
  );
  return rows.map((row) => row.module_id);
}
