import { Router } from 'express';
import authRoutes from './auth.routes';
import dashboardRoutes from './dashboard.routes';
import { adminContactRouter, publicContactRouter } from './contact.routes';
import { adminModuleRouter, publicModuleRouter } from './module.routes';
import { adminPlanRouter, publicPlanRouter } from './plan.routes';

const router = Router();

router.get('/health', (_req, res) => {
  res.json({ success: true, service: 'NexusERP API' });
});

router.use('/auth', authRoutes);
router.use('/plans', publicPlanRouter);
router.use('/modules', publicModuleRouter);
router.use('/contacts', publicContactRouter);

router.use('/admin/plans', adminPlanRouter);
router.use('/admin/modules', adminModuleRouter);
router.use('/admin/contacts', adminContactRouter);
router.use('/admin/dashboard', dashboardRoutes);

export default router;
