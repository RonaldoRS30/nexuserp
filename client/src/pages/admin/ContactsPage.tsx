import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { deleteContact, fetchContacts, updateContactStatus } from '../../services/contacts';
import { ContactRecord } from '../../types';
import { formatDate } from '../../utils/format';

export function ContactsPage() {
  const [contacts, setContacts] = useState<ContactRecord[]>([]);
  const [error, setError] = useState('');

  async function load() {
    setContacts(await fetchContacts());
  }

  useEffect(() => {
    void load().catch((err: Error) => setError(err.message));
  }, []);

  async function mark(contact: ContactRecord) {
    await updateContactStatus(contact.id, contact.status === 'attended' ? 'new' : 'attended');
    await load();
  }

  async function remove(contact: ContactRecord) {
    if (!window.confirm(`¿Eliminar la consulta de ${contact.name}?`)) return;
    await deleteContact(contact.id);
    await load();
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold">Consultas</h1>
      <p className="mt-1 text-sm text-ink-muted">Solicitudes enviadas desde el formulario público.</p>
      {error ? <p className="mt-4 text-sm text-red-700">{error}</p> : null}
      <div className="mt-6 overflow-x-auto border border-line bg-white">
        <table className="w-full min-w-[800px] text-left text-sm">
          <thead className="bg-surface-muted text-ink-muted">
            <tr>
              <th className="px-4 py-3 font-medium">Fecha</th>
              <th className="px-4 py-3 font-medium">Nombre</th>
              <th className="px-4 py-3 font-medium">Empresa</th>
              <th className="px-4 py-3 font-medium">Servicio</th>
              <th className="px-4 py-3 font-medium">Estado</th>
              <th className="px-4 py-3 font-medium" />
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <tr key={contact.id} className="border-t border-line">
                <td className="px-4 py-3 text-ink-muted">{formatDate(contact.created_at)}</td>
                <td className="px-4 py-3 font-medium">{contact.name}</td>
                <td className="px-4 py-3">{contact.company || '—'}</td>
                <td className="px-4 py-3">{contact.service || '—'}</td>
                <td className="px-4 py-3">{contact.status === 'attended' ? 'Atendida' : 'Nueva'}</td>
                <td className="px-4 py-3 text-right">
                  <div className="flex justify-end gap-3">
                    <Link to={`/admin/consultas/${contact.id}`} className="text-brand">
                      Ver
                    </Link>
                    <button type="button" className="text-brand" onClick={() => void mark(contact)}>
                      {contact.status === 'attended' ? 'Reabrir' : 'Atendida'}
                    </button>
                    <button type="button" className="text-red-700" onClick={() => void remove(contact)}>
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {contacts.length === 0 ? <p className="px-4 py-8 text-sm text-ink-muted">No hay consultas.</p> : null}
      </div>
    </div>
  );
}
