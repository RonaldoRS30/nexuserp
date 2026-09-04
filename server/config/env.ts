import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });
dotenv.config({ path: path.resolve(__dirname, '../.env') });

function required(name: string, fallback?: string): string {
  const value = process.env[name] ?? fallback;
  if (value === undefined || value === '') {
    throw new Error(`Falta la variable de entorno ${name}`);
  }
  return value;
}

export const env = {
  port: Number(process.env.PORT ?? 4000),
  nodeEnv: process.env.NODE_ENV ?? 'development',
  frontendUrl: process.env.FRONTEND_URL ?? 'http://localhost:5173',
  db: {
    host: process.env.DB_HOST ?? '127.0.0.1',
    port: Number(process.env.DB_PORT ?? 3306),
    user: process.env.DB_USER ?? 'root',
    password: process.env.DB_PASSWORD ?? '',
    name: process.env.DB_NAME ?? 'nexuserp',
  },
  jwt: {
    secret: required('JWT_SECRET', 'dev-only-change-me'),
    expiresIn: process.env.JWT_EXPIRES_IN ?? '8h',
  },
  admin: {
    name: process.env.ADMIN_NAME ?? 'Administrador',
    email: process.env.ADMIN_EMAIL ?? 'admin@nexuserp.com',
    password: required('ADMIN_PASSWORD', 'NexusERP2026!'),
  },
  site: {
    companyName: process.env.VITE_COMPANY_NAME || process.env.COMPANY_NAME || 'NexusERP',
    contactEmail: process.env.VITE_CONTACT_EMAIL || process.env.CONTACT_EMAIL || '',
    contactPhone: process.env.VITE_CONTACT_PHONE || process.env.CONTACT_PHONE || '',
    whatsappNumber: process.env.VITE_WHATSAPP_NUMBER || process.env.WHATSAPP_NUMBER || '',
  },
  isProd: (process.env.NODE_ENV ?? 'development') === 'production',
  shareMode: process.env.SHARE_MODE === '1' || process.env.SHARE_MODE === 'true',
};
