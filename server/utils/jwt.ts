import jwt, { SignOptions } from 'jsonwebtoken';
import { env } from '../config/env';
import { AdminTokenPayload } from '../types';

export function signAdminToken(payload: AdminTokenPayload): string {
  const options: SignOptions = { expiresIn: env.jwt.expiresIn as SignOptions['expiresIn'] };
  return jwt.sign(payload, env.jwt.secret, options);
}

export function verifyAdminToken(token: string): AdminTokenPayload {
  return jwt.verify(token, env.jwt.secret) as AdminTokenPayload;
}
