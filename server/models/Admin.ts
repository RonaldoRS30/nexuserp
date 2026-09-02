import { query } from '../config/database';
import { AdminRow } from '../types';

export async function findAdminByEmail(email: string): Promise<AdminRow | null> {
  const rows = await query<AdminRow[]>(
    'SELECT * FROM admins WHERE email = :email LIMIT 1',
    { email },
  );
  return rows[0] ?? null;
}

export async function findActiveAdminById(id: number): Promise<AdminRow | null> {
  const rows = await query<AdminRow[]>(
    'SELECT * FROM admins WHERE id = :id AND is_active = 1 LIMIT 1',
    { id },
  );
  return rows[0] ?? null;
}

export async function updateAdminPassword(id: number, passwordHash: string): Promise<void> {
  await query('UPDATE admins SET password = :password WHERE id = :id', {
    password: passwordHash,
    id,
  });
}

export async function createAdmin(data: {
  name: string;
  email: string;
  password: string;
}): Promise<void> {
  await query(
    'INSERT INTO admins (name, email, password, is_active) VALUES (:name, :email, :password, 1)',
    data,
  );
}

export async function countAdmins(): Promise<number> {
  const rows = await query<Array<{ total: number }>>('SELECT COUNT(*) AS total FROM admins');
  return rows[0]?.total ?? 0;
}
