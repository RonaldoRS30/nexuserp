import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, URL } from 'node:url';
import { defineConfig, loadEnv, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import {
  BRAND,
  OG_IMAGE_PATH,
  buildJsonLd,
  notFoundSeo,
  pageSeo,
  permanentRedirects,
  type PageSeo,
} from './src/seo/pages';

function escapeAttr(value: string) {
  return value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// Crawlers and link previews (WhatsApp, Facebook) read the initial HTML without running JS,
// so every public route gets its own head baked in at build time
function seoPages(env: Record<string, string>): Plugin {
  const siteUrl = (env.VITE_SITE_URL || 'http://localhost:5173').replace(/\/+$/, '');
  const org = { siteUrl, email: env.VITE_CONTACT_EMAIL || undefined, phone: env.VITE_CONTACT_PHONE || undefined };
  let outDir = 'dist';
  let template = '';

  const render = (routePath: string, page: PageSeo) => {
    const url = `${siteUrl}${routePath}`;
    const image = `${siteUrl}${OG_IMAGE_PATH}`;
    const jsonLd = page.noindex ? [] : buildJsonLd(routePath, org);
    const tags = [
      `<meta name="description" content="${escapeAttr(page.description)}" />`,
      `<meta name="robots" content="${page.noindex ? 'noindex, nofollow' : 'index, follow'}" />`,
      `<link rel="canonical" href="${escapeAttr(url)}" />`,
      `<meta property="og:type" content="website" />`,
      `<meta property="og:site_name" content="${BRAND}" />`,
      `<meta property="og:locale" content="es_PE" />`,
      `<meta property="og:title" content="${escapeAttr(page.title)}" />`,
      `<meta property="og:description" content="${escapeAttr(page.description)}" />`,
      `<meta property="og:url" content="${escapeAttr(url)}" />`,
      `<meta property="og:image" content="${escapeAttr(image)}" />`,
      `<meta property="og:image:width" content="1200" />`,
      `<meta property="og:image:height" content="630" />`,
      `<meta name="twitter:card" content="summary_large_image" />`,
      `<meta name="twitter:title" content="${escapeAttr(page.title)}" />`,
      `<meta name="twitter:description" content="${escapeAttr(page.description)}" />`,
      `<meta name="twitter:image" content="${escapeAttr(image)}" />`,
      ...jsonLd.map(
        (item) => `<script type="application/ld+json">${JSON.stringify(item).replace(/</g, '\\u003c')}</script>`,
      ),
    ];

    return template
      .replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeAttr(page.title)}</title>`)
      .replace(/<meta\s+name="description"[\s\S]*?\/>\s*/, '')
      .replace('</head>', `    ${tags.join('\n    ')}\n  </head>`);
  };

  return {
    name: 'nexus-seo-pages',
    apply: 'build',
    configResolved(resolved) {
      outDir = path.resolve(resolved.root, resolved.build.outDir);
    },
    transformIndexHtml: {
      order: 'post',
      handler(html) {
        template = html;
        return render('/', pageSeo['/']);
      },
    },
    closeBundle() {
      if (!template) return;
      const pages: Record<string, string> = {};
      for (const [routePath, page] of Object.entries(pageSeo)) {
        if (routePath !== '/') pages[routePath] = render(routePath, page);
      }
      const payload = { pages, notFound: render('/404', notFoundSeo), redirects: permanentRedirects };
      fs.writeFileSync(path.join(outDir, 'seo-pages.json'), JSON.stringify(payload));

      const lastmod = new Date().toISOString().slice(0, 10);
      const priority = (routePath: string, page: PageSeo) => {
        if (routePath === '/') return '1.0';
        if (page.serviceType) return '0.9';
        if (routePath === '/contacto') return '0.6';
        if (routePath === '/privacidad' || routePath === '/terminos') return '0.3';
        return '0.8';
      };
      const urls = Object.entries(pageSeo)
        .filter(([, page]) => !page.noindex)
        .map(
          ([routePath, page]) =>
            `  <url>\n    <loc>${siteUrl}${routePath}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <priority>${priority(routePath, page)}</priority>\n  </url>`,
        );
      fs.writeFileSync(
        path.join(outDir, 'sitemap.xml'),
        `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`,
      );
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, path.resolve(fileURLToPath(new URL('.', import.meta.url)), '..'), 'VITE_');

  return {
    plugins: [react(), seoPages(env)],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    envDir: '..',
    server: {
      port: 5173,
      proxy: {
        '/api': {
          target: 'http://localhost:4000',
          changeOrigin: true,
        },
      },
    },
  };
});
