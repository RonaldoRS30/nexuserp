import { FormEvent, useState } from 'react';
import { config } from '../../config';
import { updatePassword } from '../../services/auth';
import { ApiError } from '../../services/api';

export function SettingsPage() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setMessage('');
    setError('');
    try {
      await updatePassword(currentPassword, newPassword);
      setMessage('Contraseña actualizada.');
      setCurrentPassword('');
      setNewPassword('');
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'No se pudo actualizar la contraseña');
    }
  }

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-semibold">Configuración</h1>
      <p className="mt-1 text-sm text-ink-muted">
        Los datos de contacto públicos se configuran con variables de entorno. No se muestran números que no
        hayan sido definidos.
      </p>
      <dl className="mt-8 space-y-3 border border-line bg-white p-6 text-sm">
        <Row label="Empresa" value={config.companyName} />
        <Row label="Correo público" value={config.contactEmail || 'No configurado'} />
        <Row label="Teléfono público" value={config.contactPhone || 'No configurado'} />
        <Row label="WhatsApp" value={config.whatsappNumber || 'No configurado'} />
      </dl>
      <form onSubmit={onSubmit} className="mt-8 space-y-4 border border-line bg-white p-6">
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
        {message ? <p className="text-sm text-[#027a48]">{message}</p> : null}
        {error ? <p className="text-sm text-red-700">{error}</p> : null}
        <button type="submit" className="rounded-full bg-brand px-4 py-2.5 text-sm font-medium text-white transition-colors duration-ui hover:bg-brand-hover">
          Actualizar
        </button>
      </form>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <dt className="text-ink-muted">{label}</dt>
      <dd className="font-medium">{value}</dd>
    </div>
  );
}

const inputClass =
  'mt-1 w-full rounded-sm border border-line px-3 py-2.5 text-sm outline-none ring-brand/20 focus:ring-2';
