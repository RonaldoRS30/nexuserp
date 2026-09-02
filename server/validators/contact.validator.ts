import { body } from 'express-validator';

export const contactRules = [
  body('name').trim().isLength({ min: 2, max: 120 }).withMessage('Ingrese su nombre'),
  body('company').optional({ nullable: true, checkFalsy: true }).isLength({ max: 160 }),
  body('email').isEmail().withMessage('Ingrese un correo válido').normalizeEmail(),
  body('phone').optional({ nullable: true, checkFalsy: true }).isLength({ max: 40 }),
  body('service').optional({ nullable: true, checkFalsy: true }).isLength({ max: 120 }),
  body('message').trim().isLength({ min: 10, max: 4000 }).withMessage('El mensaje debe tener al menos 10 caracteres'),
];
