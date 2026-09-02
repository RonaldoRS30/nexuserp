import { AppError } from '../utils/AppError';
import { hashPassword, verifyPassword } from '../utils/password';
import { signAdminToken } from '../utils/jwt';
import { findActiveAdminById, findAdminByEmail, updateAdminPassword } from '../models/Admin';
import { clean } from '../utils/sanitize';

export async function loginAdmin(email: string, password: string) {
  const admin = await findAdminByEmail(clean(email).toLowerCase());
  if (!admin || !admin.is_active) {
    throw new AppError('Correo o contraseña incorrectos', 401);
  }

  const valid = await verifyPassword(password, admin.password);
  if (!valid) {
    throw new AppError('Correo o contraseña incorrectos', 401);
  }

  const token = signAdminToken({ id: admin.id, email: admin.email });

  return {
    token,
    admin: {
      id: admin.id,
      name: admin.name,
      email: admin.email,
    },
  };
}

export async function getAdminProfile(id: number) {
  const admin = await findActiveAdminById(id);
  if (!admin) {
    throw new AppError('No autorizado', 401);
  }

  return {
    id: admin.id,
    name: admin.name,
    email: admin.email,
  };
}

export async function changeAdminPassword(id: number, currentPassword: string, newPassword: string) {
  const admin = await findActiveAdminById(id);
  if (!admin) {
    throw new AppError('No autorizado', 401);
  }

  const valid = await verifyPassword(currentPassword, admin.password);
  if (!valid) {
    throw new AppError('La contraseña actual no es correcta', 400);
  }

  const hashed = await hashPassword(newPassword);
  await updateAdminPassword(id, hashed);
}
