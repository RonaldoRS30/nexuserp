import { SEO } from '../components/SEO';

export function PrivacyPage() {
  return (
    <article className="page-wrap py-16">
      <SEO title="Política de privacidad" path="/privacidad" />
      <p className="text-xs uppercase tracking-[0.18em] text-brand">Legal</p>
      <h1 className="mt-3 text-3xl font-semibold">Política de privacidad</h1>
      <div className="mt-8 space-y-5 text-sm leading-7 text-ink-muted">
        <p>
          NexusERP trata los datos enviados a través del formulario de contacto con la única finalidad de
          responder solicitudes de información y cotización.
        </p>
        <p>
          Los datos recopilados pueden incluir nombre, empresa, correo, teléfono, servicio de interés y el
          mensaje enviado. No se venden ni se ceden a terceros con fines comerciales.
        </p>
        <p>
          El acceso a estas consultas está restringido al personal administrativo de NexusERP. Puede solicitar
          la actualización o eliminación de su información escribiendo al correo publicado en este sitio.
        </p>
        <p>Esta política puede actualizarse cuando cambien las prácticas de tratamiento de datos.</p>
      </div>
    </article>
  );
}
