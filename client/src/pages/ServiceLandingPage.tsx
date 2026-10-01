import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import { SEO } from '../components/SEO';
import { SectionHeading } from '../components/SectionHeading';
import { HoverGrid } from '../components/aceternity/HoverGrid';
import { HoverBorderGradient } from '../components/aceternity/HoverBorderGradient';
import { CTA } from '../sections/CTA';
import { serviceLandingLinks, serviceLandings } from '../data/serviceLandings';

export function ServiceLandingPage({ path }: { path: string }) {
  const landing = serviceLandings[path];
  const related = serviceLandingLinks.filter((link) => link.to !== path);

  return (
    <>
      <SEO path={path} />

      <section className="border-b border-line bg-white py-16 md:py-20">
        <div className="page-wrap grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-brand">{landing.eyebrow}</p>
            <h1 className="mt-3 text-4xl font-semibold leading-tight text-ink md:text-5xl">{landing.heading}</h1>
            <p className="mt-5 text-lg leading-8 text-ink-muted">{landing.intro}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/contacto"
                className="inline-flex items-center justify-center rounded-full bg-brand px-5 py-3 text-sm font-semibold text-white transition-colors duration-ui hover:bg-brand-hover"
              >
                Solicitar una cotización
              </Link>
              <HoverBorderGradient to="/planes">Ver planes</HoverBorderGradient>
            </div>
          </div>
          <div className="overflow-hidden rounded-2xl border border-line">
            <div className="aspect-[16/10]">
              <img
                src={landing.image}
                alt={landing.imageAlt}
                fetchPriority="high"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="page-wrap">
          <SectionHeading eyebrow="Funcionalidades" title={landing.featuresTitle} />
          <HoverGrid className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {landing.features.map((feature) => (
              <article key={feature.title} className="h-full rounded-2xl border border-line bg-white p-6">
                <feature.icon className="h-5 w-5 text-brand" strokeWidth={1.6} />
                <h3 className="mt-4 text-lg font-semibold">{feature.title}</h3>
                <p className="mt-2 text-sm leading-6 text-ink-muted">{feature.text}</p>
              </article>
            ))}
          </HoverGrid>
        </div>
      </section>

      <section className="border-y border-line bg-surface-muted py-20">
        <div className="page-wrap grid gap-10 lg:grid-cols-2">
          <SectionHeading
            eyebrow="Para quién es"
            title={landing.audienceTitle}
            description="Implementamos el sistema con tus datos reales, capacitamos a tu equipo y te acompañamos después de la puesta en marcha."
          />
          <ul className="space-y-4">
            {landing.audience.map((item) => (
              <li key={item} className="flex gap-3 rounded-2xl border border-line bg-white p-5 text-sm leading-6">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-brand" strokeWidth={1.8} />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="page-wrap grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
          <SectionHeading eyebrow="Preguntas frecuentes" title="Lo que suelen preguntarnos" />
          <div className="divide-y divide-line border-y border-line">
            {landing.faqs.map((faq) => (
              <details key={faq.question} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold text-ink">
                  <h3>{faq.question}</h3>
                  <span className="text-xl leading-none text-brand transition-transform duration-ui group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-sm leading-7 text-ink-muted">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-surface-muted py-16">
        <div className="page-wrap">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-brand">También te puede interesar</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {related.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="group flex items-center justify-between gap-3 rounded-2xl border border-line bg-white p-5 transition-colors duration-ui hover:border-brand"
              >
                <span className="flex items-center gap-3 text-sm font-semibold text-ink">
                  <link.icon className="h-5 w-5 text-brand" strokeWidth={1.6} />
                  {link.label}
                </span>
                <ArrowRight className="h-4 w-4 text-ink-muted transition-transform duration-ui group-hover:translate-x-0.5 group-hover:text-brand" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
