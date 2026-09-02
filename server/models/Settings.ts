import { query } from '../config/database';
import { env } from '../config/env';
import { SiteSettingsRow } from '../types';

export async function ensureSettingsTable(): Promise<void> {
  await query(`
    CREATE TABLE IF NOT EXISTS site_settings (
      id TINYINT UNSIGNED PRIMARY KEY DEFAULT 1,
      company_name VARCHAR(160) NOT NULL DEFAULT 'NexusERP',
      contact_email VARCHAR(180) NULL,
      contact_phone VARCHAR(40) NULL,
      whatsapp_number VARCHAR(40) NULL,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB
  `);

  const rows = await query<Array<{ total: number }>>('SELECT COUNT(*) AS total FROM site_settings');
  if (!rows[0]?.total) {
    await query(
      `INSERT INTO site_settings (id, company_name, contact_email, contact_phone, whatsapp_number)
       VALUES (1, :company_name, :contact_email, :contact_phone, :whatsapp_number)`,
      {
        company_name: env.site.companyName,
        contact_email: env.site.contactEmail || null,
        contact_phone: env.site.contactPhone || null,
        whatsapp_number: env.site.whatsappNumber || null,
      },
    );
  }
}

export async function findSiteSettings(): Promise<SiteSettingsRow | null> {
  const rows = await query<SiteSettingsRow[]>('SELECT * FROM site_settings WHERE id = 1 LIMIT 1');
  return rows[0] ?? null;
}

export async function updateSiteSettings(data: {
  company_name: string;
  contact_email: string | null;
  contact_phone: string | null;
  whatsapp_number: string | null;
}): Promise<void> {
  await query(
    `UPDATE site_settings
     SET company_name = :company_name,
         contact_email = :contact_email,
         contact_phone = :contact_phone,
         whatsapp_number = :whatsapp_number
     WHERE id = 1`,
    data,
  );
}
