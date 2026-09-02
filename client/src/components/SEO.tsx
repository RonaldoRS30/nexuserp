import { useEffect } from 'react';
import { config } from '../config';

interface SEOProps {
  title?: string;
  description?: string;
  path?: string;
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

export function SEO({ title, description, path = '/' }: SEOProps) {
  useEffect(() => {
    const pageTitle = title ? `${title} | NexusERP` : config.seo.title;
    const pageDescription = description ?? config.seo.description;
    const url = `${config.siteUrl}${path}`;

    document.title = pageTitle;
    upsertMeta('name', 'description', pageDescription);
    upsertMeta('property', 'og:type', 'website');
    upsertMeta('property', 'og:title', pageTitle);
    upsertMeta('property', 'og:description', pageDescription);
    upsertMeta('property', 'og:url', url);
    upsertMeta('property', 'og:image', `${config.siteUrl}/logo-nexuserp.jpg`);
    upsertMeta('name', 'twitter:card', 'summary');
    upsertMeta('name', 'twitter:title', pageTitle);
    upsertMeta('name', 'twitter:description', pageDescription);

    let canonical = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = url;
  }, [title, description, path]);

  return null;
}
