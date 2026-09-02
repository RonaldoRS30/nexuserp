import { SEO } from '../components/SEO';
import { Contact } from '../sections/Contact';

export function ContactoPage() {
  return (
    <>
      <SEO title="Contacto" path="/contacto" />
      <Contact />
    </>
  );
}
