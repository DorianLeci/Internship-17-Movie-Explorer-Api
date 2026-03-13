import { useQuery } from '@tanstack/react-query';
import type { Genre } from '@tstypes/Genre';
import { api } from '.';

export const getGenres = () => {
  return api.get<never, Genre[]>(`/genres`);
};

export const useGenres = () => {
  return useQuery({
    queryKey: ['allGenres'],
    queryFn: () => getGenres(),
  });
};
