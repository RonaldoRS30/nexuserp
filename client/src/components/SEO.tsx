import { useEffect } from 'react';
import { config } from '../config';
import { BRAND, OG_IMAGE_PATH, getPageSeo, notFoundSeo } from '../seo/pages';

interface SEOProps {
  title?: string;
  description?: string;
  path?: string;
  notFound?: boolean;
}

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let element = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attr, key);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

export function SEO({ title, description, path = '/', notFound = false }: SEOProps) {
  useEffect(() => {
    const page = notFound ? notFoundSeo : getPageSeo(path);
    const pageTitle = page?.title ?? (title ? `${title} | ${BRAND}` : config.seo.title);
    const pageDescription = description ?? page?.description ?? config.seo.description;
    const url = `${config.siteUrl}${path}`;

    document.title = pageTitle;
    upsertMeta('name', 'description', pageDescription);
    upsertMeta('name', 'robots', page?.noindex ? 'noindex, nofollow' : 'index, follow');
    upsertMeta('property', 'og:type', 'website');
    upsertMeta('property', 'og:site_name', BRAND);
    upsertMeta('property', 'og:locale', 'es_PE');
    upsertMeta('property', 'og:title', pageTitle);
    upsertMeta('property', 'og:description', pageDescription);
    upsertMeta('property', 'og:url', url);
    upsertMeta('property', 'og:image', `${config.siteUrl}${OG_IMAGE_PATH}`);
    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', pageTitle);
    upsertMeta('name', 'twitter:description', pageDescription);
    upsertMeta('name', 'twitter:image', `${config.siteUrl}${OG_IMAGE_PATH}`);

    let canonical = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = url;
  }, [title, description, path, notFound]);

  return null;
}
