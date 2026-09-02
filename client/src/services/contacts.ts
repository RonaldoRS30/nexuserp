import { apiRequest } from './api';
import { ContactPayload, ContactRecord, DashboardStats } from '../types';

export function submitContact(payload: ContactPayload) {
  return apiRequest<{ id: number }>('/contacts', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export function fetchContacts() {
  return apiRequest<ContactRecord[]>('/admin/contacts');
}

export function fetchContact(id: number) {
  return apiRequest<ContactRecord>(`/admin/contacts/${id}`);
}

export function updateContactStatus(id: number, status: 'new' | 'attended') {
  return apiRequest<ContactRecord>(`/admin/contacts/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ status }),
  });
}

export function deleteContact(id: number) {
  return apiRequest<void>(`/admin/contacts/${id}`, { method: 'DELETE' });
}

export function fetchDashboardStats() {
  return apiRequest<DashboardStats>('/admin/dashboard/stats');
}
