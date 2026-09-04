import { Request } from 'express';

export interface AdminTokenPayload {
  id: number;
  email: string;
}

export interface AuthenticatedRequest extends Request {
  admin?: AdminTokenPayload;
}

export type ContactStatus = 'new' | 'attended';

export interface PlanRow {
  id: number;
  name: string;
  description: string | null;
  price: number;
  currency: string;
  duration_months: number;
  is_active: number;
  is_featured: number;
  show_price: number;
  sort_order: number;
  created_at: Date;
  updated_at: Date;
}

export interface ModuleRow {
  id: number;
  name: string;
  description: string | null;
  icon: string;
  is_active: number;
  sort_order: number;
  created_at: Date;
  updated_at: Date;
}

export interface ContactRow {
  id: number;
  name: string;
  company: string | null;
  email: string;
  phone: string | null;
  service: string | null;
  message: string;
  status: ContactStatus;
  created_at: Date;
}

export interface SiteSettingsRow {
  id: number;
  company_name: string;
  contact_email: string | null;
  contact_phone: string | null;
  whatsapp_number: string | null;
  facebook_url: string | null;
  instagram_url: string | null;
  updated_at: Date;
}

export interface AdminRow {
  id: number;
  name: string;
  email: string;
  password: string;
  is_active: number;
  created_at: Date;
  updated_at: Date;
}
