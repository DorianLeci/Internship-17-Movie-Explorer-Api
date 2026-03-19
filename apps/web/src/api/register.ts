import type { AuthCredentials, AuthResponse } from '@tstypes/Auth';
import { api } from '.';

export const useRegister = ({ email, password }: AuthCredentials) => {
  console.log('Email: ', email);
  console.log('Password:', password);
  return api.post<never, AuthResponse>('/auth/register', { email, password });
};
