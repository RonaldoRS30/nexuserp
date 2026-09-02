import { NextFunction, Request, Response } from 'express';
import { AppError } from '../utils/AppError';
import { env } from '../config/env';

export function notFound(_req: Request, res: Response) {
  res.status(404).json({ success: false, message: 'Recurso no encontrado' });
}

export function errorHandler(err: Error, _req: Request, res: Response, _next: NextFunction) {
  const status = err instanceof AppError ? err.statusCode : 500;
  const message =
    err instanceof AppError || !env.isProd
      ? err.message
      : 'Ocurrió un error interno. Inténtelo de nuevo más tarde.';

  if (!(err instanceof AppError)) {
    console.error(err);
  }

  res.status(status).json({
    success: false,
    message,
  });
}
