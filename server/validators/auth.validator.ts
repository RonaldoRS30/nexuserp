import { body } from 'express-validator';

export const loginRules = [
  body('email').isEmail().withMessage('Ingrese un correo válido').normalizeEmail(),
  body('password').isLength({ min: 8 }).withMessage('La contraseña es obligatoria'),
];

export const changePasswordRules = [
  body('currentPassword').isLength({ min: 8 }).withMessage('Ingrese la contraseña actual'),
  body('newPassword')
    .isLength({ min: 8 })
    .withMessage('La nueva contraseña debe tener al menos 8 caracteres'),
];
