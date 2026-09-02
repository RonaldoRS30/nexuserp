import { SEO } from '../components/SEO';

export function TermsPage() {
  return (
    <article className="mx-auto max-w-3xl px-5 py-16 lg:px-8">
      <SEO title="Términos y condiciones" path="/terminos" />
      <p className="text-xs uppercase tracking-[0.18em] text-brand">Legal</p>
      <h1 className="mt-3 text-3xl font-semibold">Términos y condiciones</h1>
      <div className="mt-8 space-y-5 text-sm leading-7 text-ink-muted">
        <p>
          El contenido de este sitio describe servicios y planes comerciales de NexusERP. Los precios, módulos
          y condiciones publicadas pueden actualizarse y se confirman en la cotización correspondiente.
        </p>
        <p>
          La solicitud de cotización no constituye un contrato. El alcance, plazos y contraprestación se
          formalizan por escrito antes de iniciar un proyecto o la implementación de un plan.
        </p>
        <p>
          El software, la marca y los materiales publicados en este sitio son propiedad de NexusERP, salvo que
          se indique lo contrario.
        </p>
        <p>
          El uso del panel administrativo está reservado al personal autorizado. Cualquier acceso indebido está
          prohibido.
        </p>
      </div>
    </article>
  );
}
