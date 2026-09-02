import { Router } from 'express';
import {
  createPlanHandler,
  deletePlanHandler,
  getAdminPlanById,
  getAdminPlans,
  getPublicPlanById,
  getPublicPlans,
  updatePlanHandler,
} from '../controllers/plan.controller';
import { requireAdmin } from '../middlewares/auth';
import { validate } from '../middlewares/validate';
import { planRules } from '../validators/plan.validator';

export const publicPlanRouter = Router();
publicPlanRouter.get('/', getPublicPlans);
publicPlanRouter.get('/:id', getPublicPlanById);
publicPlanRouter.post('/', requireAdmin, planRules, validate, createPlanHandler);
publicPlanRouter.put('/:id', requireAdmin, planRules, validate, updatePlanHandler);
publicPlanRouter.delete('/:id', requireAdmin, deletePlanHandler);

export const adminPlanRouter = Router();
adminPlanRouter.use(requireAdmin);
adminPlanRouter.get('/', getAdminPlans);
adminPlanRouter.get('/:id', getAdminPlanById);
adminPlanRouter.post('/', planRules, validate, createPlanHandler);
adminPlanRouter.put('/:id', planRules, validate, updatePlanHandler);
adminPlanRouter.delete('/:id', deletePlanHandler);
