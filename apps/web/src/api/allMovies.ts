import { useQuery } from '@tanstack/react-query';
import type { Movie } from '@tstypes/Movie';
import type { MovieFilter } from '@tstypes/MovieFilter';
import { api } from '.';
import { QueryKeys } from './QueryKeys';

export const getAllMovies = (filter: MovieFilter) => {
  const params = new URLSearchParams();

  if (filter.search) params.set('search', filter.search);
  if (filter.genre) params.set('genre', filter.genre);
  if (filter.sortBy) params.set('sortBy', filter.sortBy);
  if (filter.sortOrder) params.set('sortOrder', filter.sortOrder);

  return api.get<never, Movie[]>(`/movies?${params}`);
};

export const useAllMovies = (filter: MovieFilter) => {
  return useQuery({
    queryKey: [
      QueryKeys.ALL_MOVIES,
      filter.genre,
      filter.search,
      filter.sortBy,
      filter.sortOrder,
    ],
    queryFn: () => getAllMovies(filter),
  });
};
