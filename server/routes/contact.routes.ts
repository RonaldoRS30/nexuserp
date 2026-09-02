import { Router } from 'express';
import {
  createContactHandler,
  deleteContactHandler,
  getContactHandler,
  getContactsHandler,
  updateContactHandler,
} from '../controllers/contact.controller';
import { contactLimiter } from '../middlewares/rateLimiter';
import { requireAdmin } from '../middlewares/auth';
import { validate } from '../middlewares/validate';
import { contactRules } from '../validators/contact.validator';

export const publicContactRouter = Router();
publicContactRouter.post('/', contactLimiter, contactRules, validate, createContactHandler);
publicContactRouter.get('/', requireAdmin, getContactsHandler);
publicContactRouter.get('/:id', requireAdmin, getContactHandler);
publicContactRouter.put('/:id', requireAdmin, updateContactHandler);
publicContactRouter.delete('/:id', requireAdmin, deleteContactHandler);

export const adminContactRouter = Router();
adminContactRouter.use(requireAdmin);
adminContactRouter.get('/', getContactsHandler);
adminContactRouter.get('/:id', getContactHandler);
adminContactRouter.put('/:id', updateContactHandler);
adminContactRouter.delete('/:id', deleteContactHandler);
