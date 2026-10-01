// Plain data with no browser or Vite imports: vite.config.ts reads it at build time to write per-route HTML
export const BRAND = 'NexusERP';
export const COUNTRY_CODE = 'PE';
export const OG_IMAGE_PATH = '/og-image.png';

export interface PageSeo {
  title: string;
  description: string;
  noindex?: boolean;
  /** Short label for breadcrumbs and Service structured data */
  name?: string;
  serviceType?: string;
}

export const pageSeo: Record<string, PageSeo> = {
  '/': {
    title: `Sistema de Facturación Electrónica y ERP a Medida | ${BRAND}`,
    description:
      'Sistemas de facturación electrónica, inventario, punto de venta y software a medida para empresas en Perú. Implementación, capacitación y soporte.',
  },
  '/servicios': {
    title: `Desarrollo de Software a Medida para Empresas | ${BRAND}`,
    description:
      'Desarrollamos sistemas de facturación, ERP, plataformas web e integraciones a medida. Analizamos tu proceso antes de construir. Conoce nuestros servicios.',
    name: 'Servicios',
  },
  '/soluciones': {
    title: `Software de Ventas, Inventario y Punto de Venta | ${BRAND}`,
    description:
      'Módulos de ventas, punto de venta, inventario, almacén y logística que se adaptan a cómo trabaja tu empresa. Combínalos o los desarrollamos a medida.',
    name: 'Soluciones',
  },
  '/planes': {
    title: `Planes y Precios de Sistema ERP y Facturación | ${BRAND}`,
    description:
      'Compara los planes de NexusERP: módulos incluidos, alcance y soporte. Elige el plan para tu operación o solicita uno a medida.',
    name: 'Planes',
  },
  '/contacto': {
    title: `Cotiza tu Sistema de Facturación o ERP | ${BRAND}`,
    description:
      'Cuéntanos cómo opera tu empresa y te enviamos una cotización con alcance, módulos y tiempos para tu sistema de facturación, inventario o ERP.',
    name: 'Contacto',
  },
  '/facturacion-electronica': {
    title: `Sistema de Facturación Electrónica para Empresas | ${BRAND}`,
    description:
      'Emite facturas, boletas y notas electrónicas, controla series y revisa el estado de cada comprobante desde un solo sistema. Solicita una demostración.',
    name: 'Facturación electrónica',
    serviceType: 'Sistema de facturación electrónica',
  },
  '/sistema-de-inventario': {
    title: `Sistema de Inventario y Control de Almacén | ${BRAND}`,
    description:
      'Controla stock, entradas, salidas y transferencias entre almacenes con alertas de stock mínimo y kardex por producto. Software de inventario para empresas.',
    name: 'Sistema de inventario',
    serviceType: 'Software de inventario y almacén',
  },
  '/punto-de-venta': {
    title: `Sistema de Punto de Venta (POS) para Negocios | ${BRAND}`,
    description:
      'Vende rápido desde caja, emite comprobantes al instante y descuenta el stock automáticamente. Sistema POS para tiendas, minimarkets y distribuidoras.',
    name: 'Punto de venta',
    serviceType: 'Sistema de punto de venta',
  },
  '/software-a-medida': {
    title: `Software a Medida para Empresas en Perú | ${BRAND}`,
    description:
      'Desarrollamos sistemas web a medida sobre los procesos reales de tu empresa: análisis, diseño, desarrollo, puesta en marcha y soporte continuo.',
    name: 'Software a medida',
    serviceType: 'Desarrollo de software a medida',
  },
  '/privacidad': {
    title: `Política de Privacidad | ${BRAND}`,
    description: 'Cómo NexusERP recopila, usa y protege los datos personales enviados a través de este sitio web.',
    name: 'Política de privacidad',
  },
  '/terminos': {
    title: `Términos y Condiciones | ${BRAND}`,
    description: 'Términos y condiciones de uso del sitio web de NexusERP.',
    name: 'Términos y condiciones',
  },
  '/admin': {
    title: `Administración | ${BRAND}`,
    description: 'Acceso al panel de administración.',
    noindex: true,
  },
};

/** Old routes that now live on the home page; the server answers them with a 301 */
export const permanentRedirects: Record<string, string> = {
  '/nosotros': '/',
  '/proceso': '/',
};

export const notFoundSeo: PageSeo = {
  title: `Página no encontrada | ${BRAND}`,
  description: 'La página que buscas no existe o fue movida.',
  noindex: true,
};

export function normalizePath(path: string) {
  const clean = path.split(/[?#]/)[0].replace(/\/+$/, '');
  return clean === '' ? '/' : clean;
}

export function getPageSeo(path: string): PageSeo | undefined {
  return pageSeo[normalizePath(path)];
}

interface OrganizationInfo {
  siteUrl: string;
  email?: string;
  phone?: string;
}

export function buildJsonLd(path: string, org: OrganizationInfo) {
  const page = getPageSeo(path);
  if (!page || page.noindex) return [];
  const url = `${org.siteUrl}${path === '/' ? '/' : path}`;
  const organizationId = `${org.siteUrl}/#organization`;

  const organization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': organizationId,
    name: BRAND,
    url: `${org.siteUrl}/`,
    logo: `${org.siteUrl}/logo-nexuserp.jpg`,
    description: pageSeo['/'].description,
    areaServed: COUNTRY_CODE,
    ...(org.email ? { email: org.email } : {}),
    ...(org.phone ? { telephone: org.phone } : {}),
    ...(org.email || org.phone
      ? {
          contactPoint: {
            '@type': 'ContactPoint',
            contactType: 'sales',
            availableLanguage: 'Spanish',
            ...(org.email ? { email: org.email } : {}),
            ...(org.phone ? { telephone: org.phone } : {}),
          },
        }
      : {}),
  };

  if (path === '/') {
    return [
      organization,
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: BRAND,
        url: `${org.siteUrl}/`,
        inLanguage: 'es',
        publisher: { '@id': organizationId },
      },
    ];
  }

  const items: object[] = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: `${org.siteUrl}/` },
        { '@type': 'ListItem', position: 2, name: page.name ?? page.title, item: url },
      ],
    },
  ];

  if (page.serviceType) {
    items.push({
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: page.name,
      serviceType: page.serviceType,
      description: page.description,
      url,
      areaServed: { '@type': 'Country', name: 'Perú' },
      provider: organization,
    });
  }

  return items;
}
