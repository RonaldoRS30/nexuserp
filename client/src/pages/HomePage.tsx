import { Hero } from '../sections/Hero';
import { HomePaths } from '../sections/HomePaths';
import { WhyNexus } from '../sections/WhyNexus';
import { Process } from '../sections/Process';
import { CTA } from '../sections/CTA';
import { SEO } from '../components/SEO';

export function HomePage() {
  return (
    <>
      <SEO path="/" />
      <Hero />
      <HomePaths />
      <WhyNexus />
      <Process />
      <CTA />
    </>
  );
}
