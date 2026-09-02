import { AppError } from '../utils/AppError';
import {
  createModule,
  deleteModule,
  findActiveModules,
  findAllModules,
  findModuleById,
  updateModule,
} from '../models/Module';
import { clean, cleanOptional, toBoolean, toNumber } from '../utils/sanitize';
import { ModuleRow } from '../types';

function mapModule(module: ModuleRow, admin = false) {
  const base = {
    id: module.id,
    name: module.name,
    description: module.description,
    icon: module.icon,
    sort_order: module.sort_order,
  };

  if (!admin) return base;

  return {
    ...base,
    is_active: Boolean(module.is_active),
    created_at: module.created_at,
    updated_at: module.updated_at,
  };
}

export async function listPublicModules() {
  const modules = await findActiveModules();
  return modules.map((module) => mapModule(module, false));
}

export async function listAdminModules() {
  const modules = await findAllModules();
  return modules.map((module) => mapModule(module, true));
}

export async function getModule(id: number, admin = false) {
  const module = await findModuleById(id);
  if (!module || (!admin && !module.is_active)) {
    throw new AppError('Módulo no encontrado', 404);
  }
  return mapModule(module, admin);
}

interface ModulePayload {
  name: string;
  description?: string | null;
  icon?: string;
  is_active?: boolean;
  sort_order?: number;
}

function parseModuleInput(payload: ModulePayload) {
  return {
    name: clean(payload.name),
    description: cleanOptional(payload.description),
    icon: clean(payload.icon || 'layers'),
    is_active: toBoolean(payload.is_active, true),
    sort_order: toNumber(payload.sort_order, 0),
  };
}

export async function createModuleRecord(payload: ModulePayload) {
  const data = parseModuleInput(payload);
  const id = await createModule(data);
  return getModule(id, true);
}

export async function updateModuleRecord(id: number, payload: ModulePayload) {
  const existing = await findModuleById(id);
  if (!existing) {
    throw new AppError('Módulo no encontrado', 404);
  }
  const data = parseModuleInput(payload);
  await updateModule(id, data);
  return getModule(id, true);
}

export async function removeModule(id: number) {
  const existing = await findModuleById(id);
  if (!existing) {
    throw new AppError('Módulo no encontrado', 404);
  }
  await deleteModule(id);
}
