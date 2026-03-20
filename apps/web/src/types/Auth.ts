import type { Roles } from 'enums /Roles';

export interface AuthCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: { accessToken: string };
}

export interface AccessToken {
  sub: number;
  email: string;
  role: Roles;
}
