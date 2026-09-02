import { SEO } from '../components/SEO';
import { Plans } from '../sections/Plans';
import { CTA } from '../sections/CTA';

export function PublicPlansPage() {
  return (
    <>
      <SEO title="Planes" path="/planes" />
      <Plans />
      <CTA />
    </>
  );
}
