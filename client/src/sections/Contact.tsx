import { FormEvent, useState, type ReactNode } from 'react';
import { submitContact } from '../services/contacts';
import { serviceOptions, config } from '../config';
import { ApiError } from '../services/api';

const empty = {
  name: '',
  company: '',
  email: '',
  phone: '',
  service: '',
  message: '',
};

export function Contact() {
  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  function validate() {
    const next: Record<string, string> = {};
    if (form.name.trim().length < 2) next.name = 'Ingrese su nombre';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'Ingrese un correo válido';
    if (form.message.trim().length < 10) next.message = 'El mensaje debe tener al menos 10 caracteres';
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (!validate()) return;
    setStatus('loading');
    try {
      await submitContact(form);
      setStatus('success');
      setMessage('Consulta enviada. Revisaremos la información y nos pondremos en contacto.');
      setForm(empty);
    } catch (error) {
      setStatus('error');
      setMessage(error instanceof ApiError ? error.message : 'No se pudo enviar la consulta.');
    }
  }

  return (
    <section id="contacto" className="bg-white py-20">
      <div className="page-wrap grid gap-12 lg:grid-cols-2">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-brand">Contacto</p>
          <h2 className="mt-3 text-3xl font-semibold md:text-4xl">Solicitar cotización</h2>
          <p className="mt-4 text-base leading-7 text-ink-muted">
            Indique el servicio o el plan de interés. Con esa información preparamos una respuesta concreta.
          </p>
          <dl className="mt-8 space-y-4 text-sm">
            {config.contactEmail ? (
              <div>
                <dt className="text-ink-muted">Correo</dt>
                <dd className="mt-1 font-medium">{config.contactEmail}</dd>
              </div>
            ) : null}
            {config.contactPhone ? (
              <div>
                <dt className="text-ink-muted">Teléfono</dt>
                <dd className="mt-1 font-medium">{config.contactPhone}</dd>
              </div>
            ) : null}
            {config.whatsappNumber ? (
              <div>
                <dt className="text-ink-muted">WhatsApp</dt>
                <dd className="mt-1">
                  <a
                    className="font-medium text-brand hover:underline"
                    href={`https://wa.me/${config.whatsappNumber}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Escribir por WhatsApp
                  </a>
                </dd>
              </div>
            ) : null}
          </dl>
        </div>
        <form onSubmit={onSubmit} className="border border-line bg-surface-muted p-6 md:p-8" noValidate>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Nombre" error={errors.name}>
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className={fieldClass}
                autoComplete="name"
              />
            </Field>
            <Field label="Empresa">
              <input
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
                className={fieldClass}
                autoComplete="organization"
              />
            </Field>
            <Field label="Correo" error={errors.email}>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className={fieldClass}
                autoComplete="email"
              />
            </Field>
            <Field label="Teléfono">
              <input
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className={fieldClass}
                autoComplete="tel"
              />
            </Field>
          </div>
          <div className="mt-4">
            <Field label="Servicio">
              <select
                value={form.service}
                onChange={(e) => setForm({ ...form, service: e.target.value })}
                className={fieldClass}
              >
                <option value="">Seleccione una opción</option>
                {serviceOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </Field>
          </div>
          <div className="mt-4">
            <Field label="Mensaje" error={errors.message}>
              <textarea
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className={`${fieldClass} min-h-32`}
                rows={5}
              />
            </Field>
          </div>
          {status !== 'idle' && message ? (
            <p className={`mt-4 text-sm ${status === 'success' ? 'text-[#027a48]' : 'text-red-700'}`}>{message}</p>
          ) : null}
          <button
            type="submit"
            disabled={status === 'loading'}
            className="mt-6 w-full rounded-full bg-brand px-5 py-3 text-sm font-semibold text-white transition-colors duration-ui hover:bg-brand-hover disabled:opacity-60 sm:w-auto"
          >
            {status === 'loading' ? 'Enviando…' : 'Solicitar cotización'}
          </button>
        </form>
      </div>
    </section>
  );
}

const fieldClass =
  'mt-1 w-full rounded-lg border border-line bg-white px-3 py-2.5 text-sm outline-none ring-brand/20 transition-[box-shadow] duration-ui focus:ring-2';

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <label className="block text-sm font-medium">
      {label}
      {children}
      {error ? <span className="mt-1 block text-xs font-normal text-red-700">{error}</span> : null}
    </label>
  );
}
