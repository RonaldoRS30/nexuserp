import { config } from '../config';
import { ApiResponse } from '../types';

const TOKEN_KEY = 'nexuserp_admin_token';

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken(): void {
  localStorage.removeItem(TOKEN_KEY);
}

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

export async function apiRequest<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getToken();
  const headers = new Headers(options.headers);
  headers.set('Content-Type', 'application/json');
  if (token) headers.set('Authorization', `Bearer ${token}`);

  const response = await fetch(`${config.apiUrl}${path}`, {
    ...options,
    headers,
  });

  const payload = (await response.json().catch(() => ({}))) as ApiResponse<T> & { message?: string };

  if (response.status === 401 && path !== '/auth/login') {
    clearToken();
    if (window.location.pathname.startsWith('/admin') && window.location.pathname !== '/admin') {
      window.location.assign('/admin');
    }
  }

  if (!response.ok) {
    throw new ApiError(payload.message || 'No se pudo completar la solicitud', response.status);
  }

  return (payload.data ?? payload) as T;
}
