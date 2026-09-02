import { AppError } from '../utils/AppError';
import {
  createContact,
  deleteContact,
  findAllContacts,
  findContactById,
  updateContactStatus,
} from '../models/Contact';
import { clean, cleanOptional } from '../utils/sanitize';
import { ContactStatus } from '../types';

export async function submitContact(payload: {
  name: string;
  company?: string | null;
  email: string;
  phone?: string | null;
  service?: string | null;
  message: string;
}) {
  const id = await createContact({
    name: clean(payload.name),
    company: cleanOptional(payload.company),
    email: clean(payload.email).toLowerCase(),
    phone: cleanOptional(payload.phone),
    service: cleanOptional(payload.service),
    message: clean(payload.message),
  });

  return { id };
}

export async function listContacts() {
  return findAllContacts();
}

export async function getContact(id: number) {
  const contact = await findContactById(id);
  if (!contact) {
    throw new AppError('Consulta no encontrada', 404);
  }
  return contact;
}

export async function markContact(id: number, status: ContactStatus) {
  const contact = await findContactById(id);
  if (!contact) {
    throw new AppError('Consulta no encontrada', 404);
  }
  await updateContactStatus(id, status);
  return getContact(id);
}

export async function removeContact(id: number) {
  const contact = await findContactById(id);
  if (!contact) {
    throw new AppError('Consulta no encontrada', 404);
  }
  await deleteContact(id);
}
