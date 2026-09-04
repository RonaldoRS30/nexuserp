export interface PlanModule {
  id: number;
  name: string;
  description: string | null;
  icon: string;
}

export interface Plan {
  id: number;
  name: string;
  description: string | null;
  price: number;
  currency: string;
  duration_months: number;
  is_featured: boolean;
  show_price: boolean;
  sort_order: number;
  is_active?: boolean;
  module_ids?: number[];
  modules: PlanModule[];
  created_at?: string;
  updated_at?: string;
}

export interface CatalogModule {
  id: number;
  name: string;
  description: string | null;
  icon: string;
  sort_order: number;
  is_active?: boolean;
}

export interface ContactPayload {
  name: string;
  company: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

export interface ContactRecord extends ContactPayload {
  id: number;
  status: 'new' | 'attended';
  created_at: string;
}

export interface AdminUser {
  id: number;
  name: string;
  email: string;
}

export interface SiteSettings {
  company_name: string;
  contact_email: string | null;
  contact_phone: string | null;
  whatsapp_number: string | null;
  facebook_url: string | null;
  instagram_url: string | null;
}

export interface DashboardStats {
  activePlans: number;
  activeModules: number;
  contacts: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}
