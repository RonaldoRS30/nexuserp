import { SEO } from '../components/SEO';
import { Solutions } from '../sections/Solutions';
import { Modules } from '../sections/Modules';
import { CustomSystems } from '../sections/CustomSystems';
import { CTA } from '../sections/CTA';

export function SolucionesPage() {
  return (
    <>
      <SEO title="Soluciones" path="/soluciones" />
      <Solutions />
      <Modules />
      <CustomSystems />
      <CTA />
    </>
  );
}
