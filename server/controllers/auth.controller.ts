import { Request, Response } from 'express';
import { AuthenticatedRequest } from '../types';
import { asyncHandler } from '../utils/asyncHandler';
import { changeAdminPassword, getAdminProfile, loginAdmin } from '../services/auth.service';

export const login = asyncHandler(async (req: Request, res: Response) => {
  const result = await loginAdmin(req.body.email, req.body.password);
  res.json({ success: true, data: result });
});

export const me = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  if (!req.admin) {
    res.status(401).json({ success: false, message: 'No autorizado' });
    return;
  }
  const admin = await getAdminProfile(req.admin.id);
  res.json({ success: true, data: admin });
});

export const updatePassword = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  if (!req.admin) {
    res.status(401).json({ success: false, message: 'No autorizado' });
    return;
  }
  await changeAdminPassword(req.admin.id, req.body.currentPassword, req.body.newPassword);
  res.json({ success: true, message: 'Contraseña actualizada' });
});
