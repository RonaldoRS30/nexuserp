import { Hero } from '../sections/Hero';
import { Services } from '../sections/Services';
import { Solutions } from '../sections/Solutions';
import { Plans } from '../sections/Plans';
import { Modules } from '../sections/Modules';
import { CustomSystems } from '../sections/CustomSystems';
import { WhyNexus } from '../sections/WhyNexus';
import { Process } from '../sections/Process';
import { CTA } from '../sections/CTA';
import { Contact } from '../sections/Contact';
import { SEO } from '../components/SEO';

export function HomePage() {
  return (
    <>
      <SEO path="/" />
      <Hero />
      <Services />
      <Solutions />
      <Plans />
      <Modules />
      <CustomSystems />
      <WhyNexus />
      <Process />
      <CTA />
      <Contact />
    </>
  );
}
