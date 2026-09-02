import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { deleteContact, fetchContact, updateContactStatus } from '../../services/contacts';
import { ContactRecord } from '../../types';
import { formatDate } from '../../utils/format';

export function ContactDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [contact, setContact] = useState<ContactRecord | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;
    fetchContact(Number(id))
      .then(setContact)
      .catch((err: Error) => setError(err.message));
  }, [id]);

  async function mark() {
    if (!contact) return;
    const updated = await updateContactStatus(
      contact.id,
      contact.status === 'attended' ? 'new' : 'attended',
    );
    setContact(updated);
  }

  async function remove() {
    if (!contact) return;
    if (!window.confirm('¿Eliminar esta consulta?')) return;
    await deleteContact(contact.id);
    navigate('/admin/consultas');
  }

  if (error) return <p className="text-sm text-red-700">{error}</p>;
  if (!contact) return <p className="text-sm text-ink-muted">Cargando consulta…</p>;

  return (
    <div className="max-w-2xl">
      <Link to="/admin/consultas" className="text-sm text-brand">
        ← Volver a consultas
      </Link>
      <h1 className="mt-4 text-2xl font-semibold">{contact.name}</h1>
      <p className="mt-1 text-sm text-ink-muted">{formatDate(contact.created_at)}</p>
      <dl className="mt-8 space-y-4 border border-line bg-white p-6 text-sm">
        <Item label="Empresa" value={contact.company || '—'} />
        <Item label="Correo" value={contact.email} />
        <Item label="Teléfono" value={contact.phone || '—'} />
        <Item label="Servicio" value={contact.service || '—'} />
        <Item label="Estado" value={contact.status === 'attended' ? 'Atendida' : 'Nueva'} />
        <div>
          <dt className="text-ink-muted">Mensaje</dt>
          <dd className="mt-2 whitespace-pre-wrap leading-6">{contact.message}</dd>
        </div>
      </dl>
      <div className="mt-6 flex gap-3">
        <button type="button" onClick={() => void mark()} className="rounded-full bg-brand px-4 py-2 text-sm text-white transition-colors duration-ui hover:bg-brand-hover">
          {contact.status === 'attended' ? 'Marcar como nueva' : 'Marcar como atendida'}
        </button>
        <button type="button" onClick={() => void remove()} className="text-sm text-red-700">
          Eliminar
        </button>
      </div>
    </div>
  );
}

function Item({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-ink-muted">{label}</dt>
      <dd className="mt-1 font-medium">{value}</dd>
    </div>
  );
}
