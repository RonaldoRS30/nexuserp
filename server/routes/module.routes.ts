import { Router } from 'express';
import {
  createModuleHandler,
  deleteModuleHandler,
  getAdminModuleById,
  getAdminModules,
  getPublicModules,
  updateModuleHandler,
} from '../controllers/module.controller';
import { requireAdmin } from '../middlewares/auth';
import { validate } from '../middlewares/validate';
import { moduleRules } from '../validators/module.validator';

export const publicModuleRouter = Router();
publicModuleRouter.get('/', getPublicModules);
publicModuleRouter.post('/', requireAdmin, moduleRules, validate, createModuleHandler);
publicModuleRouter.put('/:id', requireAdmin, moduleRules, validate, updateModuleHandler);
publicModuleRouter.delete('/:id', requireAdmin, deleteModuleHandler);

export const adminModuleRouter = Router();
adminModuleRouter.use(requireAdmin);
adminModuleRouter.get('/', getAdminModules);
adminModuleRouter.get('/:id', getAdminModuleById);
adminModuleRouter.post('/', moduleRules, validate, createModuleHandler);
adminModuleRouter.put('/:id', moduleRules, validate, updateModuleHandler);
adminModuleRouter.delete('/:id', deleteModuleHandler);
