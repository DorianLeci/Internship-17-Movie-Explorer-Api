import type { AuthCredentials, AuthResponse } from '@tstypes/Auth';
import { api } from '.';

export const useLogin = ({ email, password }: AuthCredentials) => {
  return api.post<never, AuthResponse>('/auth/login', { email, password });
};
