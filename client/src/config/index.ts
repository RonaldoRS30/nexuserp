export const config = {
  apiUrl: import.meta.env.VITE_API_URL || '/api',
  companyName: import.meta.env.VITE_COMPANY_NAME || 'NexusERP',
  slogan: 'INNOVACIÓN PARA CRECER',
  contactEmail: import.meta.env.VITE_CONTACT_EMAIL || '',
  contactPhone: import.meta.env.VITE_CONTACT_PHONE || '',
  whatsappNumber: (import.meta.env.VITE_WHATSAPP_NUMBER || '').replace(/\D/g, ''),
  siteUrl: import.meta.env.VITE_SITE_URL || 'http://localhost:5173',
  seo: {
    title: 'NexusERP | Sistemas de Facturación y Software a Medida',
    description:
      'Desarrollamos sistemas de facturación, plataformas web y soluciones de software a medida para empresas.',
  },
};

export const navLinks = [
  { label: 'Inicio', href: '/#inicio' },
  { label: 'Servicios', href: '/#servicios' },
  { label: 'Soluciones', href: '/#soluciones' },
  { label: 'Planes', href: '/#planes' },
  { label: 'Nosotros', href: '/#nosotros' },
  { label: 'Proceso', href: '/#proceso' },
  { label: 'Contacto', href: '/#contacto' },
];

export const serviceOptions = [
  'Sistemas de facturación',
  'Sistemas web a medida',
  'Software empresarial',
  'Automatización de procesos',
  'Integración de sistemas',
  'Soporte y mantenimiento',
  'Solución personalizada',
];
