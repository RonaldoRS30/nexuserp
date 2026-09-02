import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import {
  createPlanWithModules,
  getPlan,
  listAdminPlans,
  listPublicPlans,
  removePlan,
  updatePlanWithModules,
} from '../services/plan.service';

export const getPublicPlans = asyncHandler(async (_req: Request, res: Response) => {
  const plans = await listPublicPlans();
  res.json({ success: true, data: plans });
});

export const getPublicPlanById = asyncHandler(async (req: Request, res: Response) => {
  const plan = await getPlan(Number(req.params.id), false);
  res.json({ success: true, data: plan });
});

export const getAdminPlans = asyncHandler(async (_req: Request, res: Response) => {
  const plans = await listAdminPlans();
  res.json({ success: true, data: plans });
});

export const getAdminPlanById = asyncHandler(async (req: Request, res: Response) => {
  const plan = await getPlan(Number(req.params.id), true);
  res.json({ success: true, data: plan });
});

export const createPlanHandler = asyncHandler(async (req: Request, res: Response) => {
  const plan = await createPlanWithModules(req.body);
  res.status(201).json({ success: true, data: plan });
});

export const updatePlanHandler = asyncHandler(async (req: Request, res: Response) => {
  const plan = await updatePlanWithModules(Number(req.params.id), req.body);
  res.json({ success: true, data: plan });
});

export const deletePlanHandler = asyncHandler(async (req: Request, res: Response) => {
  await removePlan(Number(req.params.id));
  res.json({ success: true, message: 'Plan eliminado' });
});
