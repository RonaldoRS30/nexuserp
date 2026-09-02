import { Router } from 'express';
import { login, me, updatePassword } from '../controllers/auth.controller';
import { authLimiter } from '../middlewares/rateLimiter';
import { requireAdmin } from '../middlewares/auth';
import { validate } from '../middlewares/validate';
import { changePasswordRules, loginRules } from '../validators/auth.validator';

const router = Router();

router.post('/login', authLimiter, loginRules, validate, login);
router.get('/me', requireAdmin, me);
router.put('/password', requireAdmin, changePasswordRules, validate, updatePassword);

export default router;
