import { AppError } from '../utils/AppError';
import { clean, cleanOptional } from '../utils/sanitize';
import { findSiteSettings, updateSiteSettings } from '../models/Settings';

export function mapSettings(row: {
  company_name: string;
  contact_email: string | null;
  contact_phone: string | null;
  whatsapp_number: string | null;
}) {
  return {
    company_name: row.company_name,
    contact_email: row.contact_email,
    contact_phone: row.contact_phone,
    whatsapp_number: row.whatsapp_number,
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
  });

  return getSiteSettings();
}
