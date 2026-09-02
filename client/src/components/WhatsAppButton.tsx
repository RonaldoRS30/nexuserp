import { MessageCircle } from 'lucide-react';
import { useSiteSettings, whatsappDigits } from '../hooks/useSiteSettings';

export function WhatsAppButton() {
  const { settings } = useSiteSettings();
  const number = whatsappDigits(settings.whatsapp_number);
  if (!number) return null;

  const href = `https://wa.me/${number}?text=${encodeURIComponent(
    'Hola, quisiera solicitar información sobre las soluciones de NexusERP.',
  )}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-5 right-5 z-40 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#128C7E] text-white shadow-panel transition-transform duration-ui hover:scale-[1.04]"
      aria-label="Escribir por WhatsApp"
    >
      <MessageCircle className="h-5 w-5" />
    </a>
  );
}
