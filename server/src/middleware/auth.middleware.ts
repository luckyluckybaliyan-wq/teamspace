import { NextFunction, Request, Response } from 'express';
import { ApiError } from '../utils/ApiError';
import { verifyToken } from '../utils/token';

export function protect(req: Request, _res: Response, next: NextFunction): void {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    throw new ApiError(401, 'Not authenticated');
  }
  try {
    const { id } = verifyToken(header.split(' ')[1]);
    req.userId = id;
  } catch {
    throw new ApiError(401, 'Invalid or expired token');
  }
  next();
}
