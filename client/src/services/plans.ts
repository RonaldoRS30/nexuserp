import { apiRequest } from './api';
import { Plan } from '../types';

export function fetchPublicPlans() {
  return apiRequest<Plan[]>('/plans');
}

export function fetchAdminPlans() {
  return apiRequest<Plan[]>('/admin/plans');
}

export function fetchAdminPlan(id: number) {
  return apiRequest<Plan>(`/admin/plans/${id}`);
}

export function createPlan(payload: Record<string, unknown>) {
  return apiRequest<Plan>('/admin/plans', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export function updatePlan(id: number, payload: Record<string, unknown>) {
  return apiRequest<Plan>(`/admin/plans/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
}

export function deletePlan(id: number) {
  return apiRequest<void>(`/admin/plans/${id}`, { method: 'DELETE' });
}
