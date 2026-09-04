import { AppError } from '../utils/AppError';
import { clean, cleanOptional } from '../utils/sanitize';
import { findSiteSettings, updateSiteSettings } from '../models/Settings';

const SOCIAL_HOSTS: Record<'facebook' | 'instagram', string[]> = {
  facebook: ['facebook.com', 'fb.com', 'm.facebook.com'],
  instagram: ['instagram.com', 'instagr.am'],
};

function normalizeSocialUrl(value: unknown, network: 'facebook' | 'instagram'): string | null {
  const raw = cleanOptional(value);
  if (!raw) return null;

  const withProtocol = /^https?:\/\//i.test(raw) ? raw : `https://${raw.replace(/^\/+/, '')}`;

  try {
    const url = new URL(withProtocol);
    const host = url.hostname.replace(/^www\./, '').toLowerCase();
    if (!SOCIAL_HOSTS[network].includes(host)) {
      throw new AppError(
        network === 'facebook'
          ? 'El enlace de Facebook debe ser una URL de facebook.com'
          : 'El enlace de Instagram debe ser una URL de instagram.com',
        422,
      );
    }
    url.protocol = 'https:';
    return url.toString();
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError('Ingrese un enlace válido', 422);
  }
}

export function mapSettings(row: {
  company_name: string;
  contact_email: string | null;
  contact_phone: string | null;
  whatsapp_number: string | null;
  facebook_url?: string | null;
  instagram_url?: string | null;
}) {
  return {
    company_name: row.company_name,
    contact_email: row.contact_email,
    contact_phone: row.contact_phone,
    whatsapp_number: row.whatsapp_number,
    facebook_url: row.facebook_url ?? null,
    instagram_url: row.instagram_url ?? null,
  };
}

export async function getSiteSettings() {
  const row = await findSiteSettings();
  if (!row) {
    throw new AppError('La configuración del sitio no está disponible', 500);
  }
  return mapSettings(row);
}

export async function saveSiteSettings(payload: {
  company_name: string;
  contact_email?: string | null;
  contact_phone?: string | null;
  whatsapp_number?: string | null;
  facebook_url?: string | null;
  instagram_url?: string | null;
}) {
  const companyName = clean(payload.company_name);
  if (companyName.length < 2) {
    throw new AppError('Ingrese el nombre de la empresa', 422);
  }

  const email = cleanOptional(payload.contact_email);
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new AppError('Ingrese un correo válido', 422);
  }

  await updateSiteSettings({
    company_name: companyName,
    contact_email: email,
    contact_phone: cleanOptional(payload.contact_phone),
    whatsapp_number: cleanOptional(payload.whatsapp_number),
    facebook_url: normalizeSocialUrl(payload.facebook_url, 'facebook'),
    instagram_url: normalizeSocialUrl(payload.instagram_url, 'instagram'),
  });

  return getSiteSettings();
}
