import { useEffect, useState } from 'react';
import { config } from '../config';
import { fetchPublicSettings } from '../services/settings';
import { SiteSettings } from '../types';

const fallback: SiteSettings = {
  company_name: config.companyName,
  contact_email: config.contactEmail || null,
  contact_phone: config.contactPhone || null,
  whatsapp_number: config.whatsappNumber || null,
};

let cached: SiteSettings | null = null;
let inflight: Promise<SiteSettings> | null = null;

function loadSettings() {
  if (cached) return Promise.resolve(cached);
  if (!inflight) {
    inflight = fetchPublicSettings()
      .then((settings) => {
        cached = settings;
        return settings;
      })
      .finally(() => {
        inflight = null;
      });
  }
  return inflight;
}

export function prefetchSiteSettings() {
  void loadSettings();
}

export function replaceSiteSettingsCache(settings: SiteSettings) {
  cached = settings;
}

export function whatsappDigits(value: string | null | undefined): string {
  return (value || '').replace(/\D/g, '');
}

export function useSiteSettings() {
  const [settings, setSettings] = useState<SiteSettings>(cached ?? fallback);
  const [loading, setLoading] = useState(!cached);

  useEffect(() => {
    let active = true;
    loadSettings()
      .then((data) => {
        if (active) setSettings(data);
      })
      .catch(() => {
        if (active) setSettings(fallback);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  return { settings, loading };
}
