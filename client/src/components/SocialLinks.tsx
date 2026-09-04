import { useSiteSettings } from '../hooks/useSiteSettings';
import { classNames } from '../utils/format';

interface SocialLinksProps {
  variant?: 'dark' | 'light';
  className?: string;
}

export function SocialLinks({ variant = 'dark', className }: SocialLinksProps) {
  const { settings } = useSiteSettings();
  const facebook = settings.facebook_url?.trim() || null;
  const instagram = settings.instagram_url?.trim() || null;

  if (!facebook && !instagram) return null;

  const tone =
    variant === 'dark'
      ? 'border-white/15 text-white hover:border-white hover:bg-white/10'
      : 'border-line text-ink hover:border-brand hover:text-brand';

  return (
    <div className={classNames('flex items-center gap-3', className)}>
      {facebook ? (
        <a
          href={facebook}
          target="_blank"
          rel="noreferrer"
          className={classNames(
            'inline-flex h-10 w-10 items-center justify-center rounded-full border transition-colors duration-ui',
            tone,
          )}
          aria-label="Facebook de NexusERP"
        >
          <FacebookIcon />
        </a>
      ) : null}
      {instagram ? (
        <a
          href={instagram}
          target="_blank"
          rel="noreferrer"
          className={classNames(
            'inline-flex h-10 w-10 items-center justify-center rounded-full border transition-colors duration-ui',
            tone,
          )}
          aria-label="Instagram de NexusERP"
        >
          <InstagramIcon />
        </a>
      ) : null}
    </div>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path
        fill="currentColor"
        d="M14.5 8.5V6.8c0-.7.5-1.1 1.2-1.1h1.3V3h-2.3C12.2 3 11 4.4 11 6.6v1.9H9v2.8h2V21h3.2v-9.7h2.2l.3-2.8h-2.2z"
      />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path
        fill="currentColor"
        d="M8.5 3h7A5.5 5.5 0 0 1 21 8.5v7A5.5 5.5 0 0 1 15.5 21h-7A5.5 5.5 0 0 1 3 15.5v-7A5.5 5.5 0 0 1 8.5 3zm0 1.8A3.7 3.7 0 0 0 4.8 8.5v7a3.7 3.7 0 0 0 3.7 3.7h7a3.7 3.7 0 0 0 3.7-3.7v-7a3.7 3.7 0 0 0-3.7-3.7h-7zm8.3 1.4a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2zM12 7.4A4.6 4.6 0 1 1 7.4 12 4.6 4.6 0 0 1 12 7.4zm0 1.8A2.8 2.8 0 1 0 14.8 12 2.8 2.8 0 0 0 12 9.2z"
      />
    </svg>
  );
}
