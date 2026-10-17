import { NextFunction, Request, Response } from 'express';
import { ApiError } from '../utils/ApiError';

export function notFound(_req: Request, _res: Response, next: NextFunction): void {
  next(new ApiError(404, 'Route not found'));
}

export function errorHandler(err: Error, _req: Request, res: Response, _next: NextFunction): void {
  const status = err instanceof ApiError ? err.statusCode : 500;
  if (status === 500) console.error(err);
  res.status(status).json({ message: err.message || 'Server error' });
}
