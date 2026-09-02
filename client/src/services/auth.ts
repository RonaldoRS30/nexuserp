import { apiRequest, clearToken, setToken } from './api';
import { AdminUser } from '../types';

export async function login(email: string, password: string) {
  const data = await apiRequest<{ token: string; admin: AdminUser }>('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
  setToken(data.token);
  return data.admin;
}

export async function fetchMe() {
  return apiRequest<AdminUser>('/auth/me');
}

export async function updatePassword(currentPassword: string, newPassword: string) {
  return apiRequest<void>('/auth/password', {
    method: 'PUT',
    body: JSON.stringify({ currentPassword, newPassword }),
  });
}

export function logout() {
  clearToken();
}
