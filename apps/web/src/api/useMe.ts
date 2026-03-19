import { useQuery } from '@tanstack/react-query';
import { api } from '.';
import LocalStorage from './helpers/LocalStorage';
import { QueryKeys } from './QueryKeys';

export const fetchMe = async () => {
  return api.get('/auth/me');
};

export const useMe = () => {
  const token = LocalStorage.getAccessToken();

  return useQuery({
    queryKey: [QueryKeys.ME],
    queryFn: fetchMe,
    enabled: !!token,
    retry: false,
  });
};
