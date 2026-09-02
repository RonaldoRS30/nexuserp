import { ResultSetHeader } from 'mysql2';
import { query } from '../config/database';
import { ContactRow, ContactStatus } from '../types';

export async function createContact(data: {
  name: string;
  company: string | null;
  email: string;
  phone: string | null;
  service: string | null;
  message: string;
}): Promise<number> {
  const result = await query<ResultSetHeader>(
    `INSERT INTO contacts (name, company, email, phone, service, message, status)
     VALUES (:name, :company, :email, :phone, :service, :message, 'new')`,
    data,
  );
  return result.insertId;
}

export async function findAllContacts(): Promise<ContactRow[]> {
  return query<ContactRow[]>('SELECT * FROM contacts ORDER BY created_at DESC');
}

export async function findContactById(id: number): Promise<ContactRow | null> {
  const rows = await query<ContactRow[]>('SELECT * FROM contacts WHERE id = :id LIMIT 1', { id });
  return rows[0] ?? null;
}

export async function updateContactStatus(id: number, status: ContactStatus): Promise<void> {
  await query('UPDATE contacts SET status = :status WHERE id = :id', { id, status });
}

export async function deleteContact(id: number): Promise<void> {
  await query('DELETE FROM contacts WHERE id = :id', { id });
}

export async function countContacts(): Promise<number> {
  const rows = await query<Array<{ total: number }>>('SELECT COUNT(*) AS total FROM contacts');
  return rows[0]?.total ?? 0;
}
