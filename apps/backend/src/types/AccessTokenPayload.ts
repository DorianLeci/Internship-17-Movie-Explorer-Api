import { Role } from 'generated/prisma/client';

export interface AccessTokenPayload {
  sub: number;
  email: string;
  role: Role;
  iat?: number;
  exp?: number;
}
