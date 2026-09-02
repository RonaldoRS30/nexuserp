import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { getSiteSettings, saveSiteSettings } from '../services/settings.service';

export const getSettingsHandler = asyncHandler(async (_req: Request, res: Response) => {
  const settings = await getSiteSettings();
  res.json({ success: true, data: settings });
});

export const updateSettingsHandler = asyncHandler(async (req: Request, res: Response) => {
  const settings = await saveSiteSettings(req.body);
  res.json({ success: true, data: settings });
});
