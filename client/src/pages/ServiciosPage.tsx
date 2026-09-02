import { SEO } from '../components/SEO';
import { Services } from '../sections/Services';
import { CTA } from '../sections/CTA';

export function ServiciosPage() {
  return (
    <>
      <SEO title="Servicios" path="/servicios" />
      <Services />
      <CTA />
    </>
  );
}
