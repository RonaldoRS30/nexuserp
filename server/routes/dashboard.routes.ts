import { Router } from 'express';
import { getStats } from '../controllers/dashboard.controller';
import { requireAdmin } from '../middlewares/auth';

const router = Router();
router.use(requireAdmin);
router.get('/stats', getStats);

export default router;
