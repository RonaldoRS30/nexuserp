import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import {
  createModuleRecord,
  getModule,
  listAdminModules,
  listPublicModules,
  removeModule,
  updateModuleRecord,
} from '../services/module.service';

export const getPublicModules = asyncHandler(async (_req: Request, res: Response) => {
  const modules = await listPublicModules();
  res.json({ success: true, data: modules });
});

export const getAdminModules = asyncHandler(async (_req: Request, res: Response) => {
  const modules = await listAdminModules();
  res.json({ success: true, data: modules });
});

export const getAdminModuleById = asyncHandler(async (req: Request, res: Response) => {
  const module = await getModule(Number(req.params.id), true);
  res.json({ success: true, data: module });
});

export const createModuleHandler = asyncHandler(async (req: Request, res: Response) => {
  const module = await createModuleRecord(req.body);
  res.status(201).json({ success: true, data: module });
});

export const updateModuleHandler = asyncHandler(async (req: Request, res: Response) => {
  const module = await updateModuleRecord(Number(req.params.id), req.body);
  res.json({ success: true, data: module });
});

export const deleteModuleHandler = asyncHandler(async (req: Request, res: Response) => {
  await removeModule(Number(req.params.id));
  res.json({ success: true, message: 'Módulo eliminado' });
});
