import { apiRequest } from './api';
import { CatalogModule } from '../types';

export function fetchPublicModules() {
  return apiRequest<CatalogModule[]>('/modules');
}

export function fetchAdminModules() {
  return apiRequest<CatalogModule[]>('/admin/modules');
}

export function createModule(payload: Record<string, unknown>) {
  return apiRequest<CatalogModule>('/admin/modules', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export function updateModule(id: number, payload: Record<string, unknown>) {
  return apiRequest<CatalogModule>(`/admin/modules/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
}

export function deleteModule(id: number) {
  return apiRequest<void>(`/admin/modules/${id}`, { method: 'DELETE' });
}
