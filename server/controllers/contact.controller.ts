import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { getContact, listContacts, markContact, removeContact, submitContact } from '../services/contact.service';
import { ContactStatus } from '../types';

export const createContactHandler = asyncHandler(async (req: Request, res: Response) => {
  const result = await submitContact(req.body);
  res.status(201).json({
    success: true,
    message: 'Consulta enviada. Nos pondremos en contacto con usted.',
    data: result,
  });
});

export const getContactsHandler = asyncHandler(async (_req: Request, res: Response) => {
  const contacts = await listContacts();
  res.json({ success: true, data: contacts });
});

export const getContactHandler = asyncHandler(async (req: Request, res: Response) => {
  const contact = await getContact(Number(req.params.id));
  res.json({ success: true, data: contact });
});

export const updateContactHandler = asyncHandler(async (req: Request, res: Response) => {
  const status = (req.body.status === 'attended' ? 'attended' : 'new') as ContactStatus;
  const contact = await markContact(Number(req.params.id), status);
  res.json({ success: true, data: contact });
});

export const deleteContactHandler = asyncHandler(async (req: Request, res: Response) => {
  await removeContact(Number(req.params.id));
  res.json({ success: true, message: 'Consulta eliminada' });
});
