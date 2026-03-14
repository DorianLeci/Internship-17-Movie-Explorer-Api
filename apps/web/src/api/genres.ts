import { useQuery } from '@tanstack/react-query';
import type { Genre } from '@tstypes/Genre';
import { api } from '.';
import { QueryKeys } from './QueryKeys';

export const getGenres = () => {
  return api.get<never, Genre[]>(`/genres`);
};

export const useGenres = () => {
  return useQuery({
    queryKey: [QueryKeys.ALL_GENRES],
    queryFn: () => getGenres(),
  });
};
