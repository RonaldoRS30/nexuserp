import { body } from 'express-validator';

export const planRules = [
  body('name').trim().isLength({ min: 2, max: 120 }).withMessage('El nombre del plan es obligatorio'),
  body('description').optional({ nullable: true }).isString(),
  body('price').isFloat({ min: 0 }).withMessage('Ingrese un precio válido'),
  body('currency').optional().isLength({ min: 3, max: 8 }).withMessage('Moneda inválida'),
  body('duration_months').isInt({ min: 1, max: 120 }).withMessage('La duración debe ser de 1 a 120 meses'),
  body('is_active').optional().isBoolean(),
  body('is_featured').optional().isBoolean(),
  body('show_price').optional().isBoolean(),
  body('sort_order').optional().isInt({ min: 0 }),
  body('module_ids').optional().isArray().withMessage('Los módulos deben enviarse como lista'),
];
