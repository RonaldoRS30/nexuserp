import { body } from 'express-validator';

export const moduleRules = [
  body('name').trim().isLength({ min: 2, max: 120 }).withMessage('El nombre del módulo es obligatorio'),
  body('description').optional({ nullable: true }).isString(),
  body('icon').optional().isLength({ min: 2, max: 80 }).withMessage('Icono inválido'),
  body('is_active').optional().isBoolean(),
  body('sort_order').optional().isInt({ min: 0 }),
];
