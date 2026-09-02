import { AppError } from '../utils/AppError';
import {
  createPlan,
  deletePlan,
  findAllPlans,
  findPlanById,
  findPublicPlans,
  getPlanModuleIds,
  replacePlanModules,
  updatePlan,
} from '../models/Plan';
import { findModulesByPlanIds } from '../models/Module';
import { clean, cleanOptional, toBoolean, toIdList, toNumber } from '../utils/sanitize';
import { ModuleRow, PlanRow } from '../types';

function mapPlan(plan: PlanRow, modules: ModuleRow[], includeAdminFields = false) {
  const publicPlan = {
    id: plan.id,
    name: plan.name,
    description: plan.description,
    price: Number(plan.price),
    currency: plan.currency,
    duration_months: plan.duration_months,
    is_featured: Boolean(plan.is_featured),
    show_price: Boolean(plan.show_price),
    sort_order: plan.sort_order,
    modules: modules.map((module) => ({
      id: module.id,
      name: module.name,
      description: module.description,
      icon: module.icon,
    })),
  };

  if (!includeAdminFields) return publicPlan;

  return {
    ...publicPlan,
    is_active: Boolean(plan.is_active),
    created_at: plan.created_at,
    updated_at: plan.updated_at,
    module_ids: modules.map((module) => module.id),
  };
}

async function attachModules(plans: PlanRow[], includeAdminFields = false) {
  const relations = await findModulesByPlanIds(plans.map((plan) => plan.id));
  const grouped = new Map<number, ModuleRow[]>();

  for (const item of relations) {
    const list = grouped.get(item.plan_id) ?? [];
    list.push(item);
    grouped.set(item.plan_id, list);
  }

  return plans.map((plan) => mapPlan(plan, grouped.get(plan.id) ?? [], includeAdminFields));
}

export async function listPublicPlans() {
  const plans = await findPublicPlans();
  return attachModules(plans, false);
}

export async function listAdminPlans() {
  const plans = await findAllPlans();
  return attachModules(plans, true);
}

export async function getPlan(id: number, admin = false) {
  const plan = await findPlanById(id);
  if (!plan || (!admin && !plan.is_active)) {
    throw new AppError('Plan no encontrado', 404);
  }

  const [withModules] = await attachModules([plan], admin);
  return withModules;
}

interface PlanPayload {
  name: string;
  description?: string | null;
  price: number;
  currency?: string;
  duration_months: number;
  is_active?: boolean;
  is_featured?: boolean;
  show_price?: boolean;
  sort_order?: number;
  module_ids?: number[];
}

function parsePlanInput(payload: PlanPayload) {
  return {
    name: clean(payload.name),
    description: cleanOptional(payload.description),
    price: toNumber(payload.price, 0),
    currency: clean(payload.currency || 'PEN').toUpperCase(),
    duration_months: toNumber(payload.duration_months, 12),
    is_active: toBoolean(payload.is_active, true),
    is_featured: toBoolean(payload.is_featured, false),
    show_price: toBoolean(payload.show_price, true),
    sort_order: toNumber(payload.sort_order, 0),
    module_ids: toIdList(payload.module_ids),
  };
}

export async function createPlanWithModules(payload: PlanPayload) {
  const data = parsePlanInput(payload);
  const id = await createPlan(data);
  await replacePlanModules(id, data.module_ids);
  return getPlan(id, true);
}

export async function updatePlanWithModules(id: number, payload: PlanPayload) {
  const existing = await findPlanById(id);
  if (!existing) {
    throw new AppError('Plan no encontrado', 404);
  }

  const data = parsePlanInput(payload);
  await updatePlan(id, data);
  await replacePlanModules(id, data.module_ids);
  return getPlan(id, true);
}

export async function removePlan(id: number) {
  const existing = await findPlanById(id);
  if (!existing) {
    throw new AppError('Plan no encontrado', 404);
  }
  await deletePlan(id);
}

export async function getPlanModules(id: number) {
  return getPlanModuleIds(id);
}
