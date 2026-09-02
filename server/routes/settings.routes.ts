import { Router } from 'express';
import { getSettingsHandler, updateSettingsHandler } from '../controllers/settings.controller';
import { requireAdmin } from '../middlewares/auth';
import { validate } from '../middlewares/validate';
import { settingsRules } from '../validators/settings.validator';

export const publicSettingsRouter = Router();
publicSettingsRouter.get('/', getSettingsHandler);

export const adminSettingsRouter = Router();
adminSettingsRouter.use(requireAdmin);
adminSettingsRouter.get('/', getSettingsHandler);
adminSettingsRouter.put('/', settingsRules, validate, updateSettingsHandler);
