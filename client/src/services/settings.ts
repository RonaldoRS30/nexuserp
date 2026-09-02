import { apiRequest } from './api';
import { SiteSettings } from '../types';

export function fetchPublicSettings() {
  return apiRequest<SiteSettings>('/settings');
}

export function updateSiteSettings(payload: SiteSettings) {
  return apiRequest<SiteSettings>('/admin/settings', {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
}
