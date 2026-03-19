import LocalStorage from '@api/helpers/LocalStorage';
import { useLogin } from '@api/login';
import { QueryKeys } from '@api/QueryKeys';
import { useRegister } from '@api/register';
import { AppPaths } from '@routes/paths';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { AuthCredentials } from '@tstypes/Auth';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from './useLocalStorage';

const LOGIN_TIMEOUT = 2500;

const useAuth = () => {
  const [_, setValue] = useLocalStorage<string | null>({
    key: LocalStorage.accessTokenKey,
    initialValue: null,
  });

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const loginMutation = useMutation({
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

  const registerMutation = useMutation({
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

  return { loginMutation, registerMutation };
};

export default useAuth;
