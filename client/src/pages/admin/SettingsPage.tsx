import { FormEvent, useEffect, useState } from 'react';
import { updatePassword } from '../../services/auth';
import { fetchPublicSettings, updateSiteSettings } from '../../services/settings';
import { replaceSiteSettingsCache } from '../../hooks/useSiteSettings';
import { ApiError } from '../../services/api';

const emptyContact = {
  company_name: '',
  contact_email: '',
  contact_phone: '',
  whatsapp_number: '',
};

export function SettingsPage() {
  const [contact, setContact] = useState(emptyContact);
  const [contactMessage, setContactMessage] = useState('');
  const [contactError, setContactError] = useState('');
  const [savingContact, setSavingContact] = useState(false);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');
  const [passwordError, setPasswordError] = useState('');

  useEffect(() => {
    fetchPublicSettings()
      .then((data) => {
        setContact({
          company_name: data.company_name ?? '',
          contact_email: data.contact_email ?? '',
          contact_phone: data.contact_phone ?? '',
          whatsapp_number: data.whatsapp_number ?? '',
        });
      })
      .catch((err: Error) => setContactError(err.message));
  }, []);

  async function onSaveContact(event: FormEvent) {
    event.preventDefault();
    setContactMessage('');
    setContactError('');
    setSavingContact(true);
    try {
      const saved = await updateSiteSettings({
        company_name: contact.company_name.trim(),
        contact_email: contact.contact_email.trim() || null,
        contact_phone: contact.contact_phone.trim() || null,
        whatsapp_number: contact.whatsapp_number.trim() || null,
      });
      replaceSiteSettingsCache(saved);
      setContactMessage('Datos de contacto actualizados. Ya aparecen en el sitio público.');
    } catch (err) {
      setContactError(err instanceof ApiError ? err.message : 'No se pudieron guardar los datos');
    } finally {
      setSavingContact(false);
    }
  }

  async function onChangePassword(event: FormEvent) {
    event.preventDefault();
    setPasswordMessage('');
    setPasswordError('');
    try {
      await updatePassword(currentPassword, newPassword);
      setPasswordMessage('Contraseña actualizada.');
      setCurrentPassword('');
      setNewPassword('');
    } catch (err) {
      setPasswordError(err instanceof ApiError ? err.message : 'No se pudo actualizar la contraseña');
    }
  }

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-semibold">Configuración</h1>
      <p className="mt-1 text-sm text-ink-muted">
        Estos datos se muestran en el formulario de contacto, el pie de página y el botón de WhatsApp.
        Si un campo queda vacío, no se publica.
      </p>

      <form onSubmit={onSaveContact} className="mt-8 space-y-4 border border-line bg-white p-6">
        <h2 className="font-display text-lg font-semibold">Datos de contacto públicos</h2>
        <label className="block text-sm font-medium">
          Empresa
          <input
            value={contact.company_name}
            onChange={(e) => setContact({ ...contact, company_name: e.target.value })}
            className={inputClass}
            required
          />
        </label>
        <label className="block text-sm font-medium">
          Correo público
          <input
            type="email"
            value={contact.contact_email}
            onChange={(e) => setContact({ ...contact, contact_email: e.target.value })}
            className={inputClass}
            placeholder="contacto@nexuserp.com"
          />
        </label>
        <label className="block text-sm font-medium">
          Teléfono público
          <input
            value={contact.contact_phone}
            onChange={(e) => setContact({ ...contact, contact_phone: e.target.value })}
            className={inputClass}
            placeholder="Ej. +51 999 000 000"
          />
        </label>
        <label className="block text-sm font-medium">
          WhatsApp
          <input
            value={contact.whatsapp_number}
            onChange={(e) => setContact({ ...contact, whatsapp_number: e.target.value })}
            className={inputClass}
            placeholder="Código de país + número, ej. 51999000000"
          />
        </label>
        {contactMessage ? <p className="text-sm text-[#027a48]">{contactMessage}</p> : null}
        {contactError ? <p className="text-sm text-red-700">{contactError}</p> : null}
        <button
          type="submit"
          disabled={savingContact}
          className="rounded-full bg-brand px-4 py-2.5 text-sm font-medium text-white transition-colors duration-ui hover:bg-brand-hover disabled:opacity-60"
        >
          {savingContact ? 'Guardando…' : 'Guardar datos'}
        </button>
      </form>

      <form onSubmit={onChangePassword} className="mt-8 space-y-4 border border-line bg-white p-6">
        <h2 className="font-display text-lg font-semibold">Cambiar contraseña</h2>
        <label className="block text-sm font-medium">
          Contraseña actual
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className={inputClass}
            required
          />
        </label>
        <label className="block text-sm font-medium">
          Nueva contraseña
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className={inputClass}
            minLength={8}
            required
          />
        </label>
        {passwordMessage ? <p className="text-sm text-[#027a48]">{passwordMessage}</p> : null}
        {passwordError ? <p className="text-sm text-red-700">{passwordError}</p> : null}
        <button
          type="submit"
          className="rounded-full bg-brand px-4 py-2.5 text-sm font-medium text-white transition-colors duration-ui hover:bg-brand-hover"
        >
          Actualizar
        </button>
      </form>
    </div>
  );
}

const inputClass =
  'mt-1 w-full rounded-sm border border-line px-3 py-2.5 text-sm outline-none ring-brand/20 focus:ring-2';
