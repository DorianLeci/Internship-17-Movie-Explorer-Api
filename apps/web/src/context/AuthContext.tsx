import LocalStorage from '@api/helpers/LocalStorage';
import { useLogin } from '@api/login';
import { QueryKeys } from '@api/QueryKeys';
import { useRegister } from '@api/register';
import { useMe } from '@api/useMe';
import { useLocalStorage } from '@hooks/useLocalStorage';
import { AppPaths } from '@routes/paths';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { AccessToken, AuthCredentials, AuthResponse } from '@tstypes/Auth';
import { createContext, type ReactNode } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  user: AccessToken | undefined;
  isLoading: boolean;
  logout: () => void;
  isLoggedIn: boolean;
  register: ReturnType<typeof useMutation<AuthResponse, any, AuthCredentials>>;
  login: ReturnType<typeof useMutation<AuthResponse, any, AuthCredentials>>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

const LOGIN_TIMEOUT = 2500;

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { data: user, isLoading } = useMe();
  const [_, setValue] = useLocalStorage<string | null>({
    key: LocalStorage.accessTokenKey,
    initialValue: null,
  });

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const isLoggedIn = !!user;

  const logout = () => {
    setValue(null);
    localStorage.removeItem(LocalStorage.accessTokenKey);
    toast.success('Successfully logged out');

    queryClient.setQueryData([QueryKeys.ME], null);
  };

  const login = useMutation({
    mutationFn: (data: AuthCredentials) => useLogin(data),
    onSuccess: (data) => {
      setValue(data.token.accessToken);
      toast.success('Successfully logged in');
      queryClient.invalidateQueries({ queryKey: [QueryKeys.ME] });

      setTimeout(() => navigate(AppPaths.HOME), LOGIN_TIMEOUT);
    },
    onError: (error: any) => {
      toast.error(error || 'Login failed');
    },
  });

  const register = useMutation({
    mutationFn: (data: AuthCredentials) => useRegister(data),
    onSuccess: (data) => {
      setValue(data.token.accessToken);
      toast.success('Successfully registered');
      queryClient.invalidateQueries({ queryKey: [QueryKeys.ME] });
      setTimeout(() => navigate(AppPaths.HOME), LOGIN_TIMEOUT);
    },

    onError: (error: any) => {
      toast.error(error || 'Registration failed');
    },
  });

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        logout,
        isLoggedIn,
        login,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
