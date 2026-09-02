import { NextFunction, Response } from 'express';
import { AuthenticatedRequest } from '../types';
import { AppError } from '../utils/AppError';
import { verifyAdminToken } from '../utils/jwt';
import { findActiveAdminById } from '../models/Admin';

export async function requireAdmin(req: AuthenticatedRequest, _res: Response, next: NextFunction) {
  try {
    const header = req.headers.authorization;
    if (!header?.startsWith('Bearer ')) {
      throw new AppError('No autorizado', 401);
    }

    const token = header.slice(7);
    const payload = verifyAdminToken(token);
    const admin = await findActiveAdminById(payload.id);

    if (!admin) {
      throw new AppError('No autorizado', 401);
    }

    req.admin = { id: admin.id, email: admin.email };
    next();
  } catch (error) {
    next(error instanceof AppError ? error : new AppError('Sesión inválida o expirada', 401));
  }
}
