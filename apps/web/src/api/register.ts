import type { AuthCredentials, AuthResponse } from '@tstypes/Auth';
import { api } from '.';

export const useRegister = ({ email, password }: AuthCredentials) => {
  return api.post<never, AuthResponse>('/auth/register', { email, password });
};
