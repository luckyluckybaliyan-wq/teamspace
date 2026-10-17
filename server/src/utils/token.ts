import jwt, { SignOptions } from 'jsonwebtoken';
import { env } from '../config/env';

export function signToken(userId: string): string {
  const options: SignOptions = { expiresIn: env.jwtExpiresIn as SignOptions['expiresIn'] };
  return jwt.sign({ id: userId }, env.jwtSecret, options);
}

export function verifyToken(token: string): { id: string } {
  return jwt.verify(token, env.jwtSecret) as { id: string };
}
