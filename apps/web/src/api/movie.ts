import { useQuery } from '@tanstack/react-query';
import type { MovieDetails } from '@tstypes/MovieDetails';
import { api } from '.';
import { QueryKeys } from './QueryKeys';

export const getMovie = (id: number | undefined) => {
  return api.get<never, MovieDetails>(`/movies/${id}`);
};

export const useMovieById = (id: number | undefined) => {
  return useQuery({
    queryKey: [QueryKeys.MOVIE, id],
    queryFn: () => getMovie(id),
  });
};
