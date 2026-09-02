import { body } from 'express-validator';

export const settingsRules = [
  body('company_name').trim().isLength({ min: 2, max: 160 }).withMessage('Ingrese el nombre de la empresa'),
  body('contact_email')
    .optional({ nullable: true, checkFalsy: true })
    .isEmail()
    .withMessage('Ingrese un correo válido')
    .normalizeEmail(),
  body('contact_phone').optional({ nullable: true, checkFalsy: true }).isLength({ max: 40 }),
  body('whatsapp_number').optional({ nullable: true, checkFalsy: true }).isLength({ max: 40 }),
];
