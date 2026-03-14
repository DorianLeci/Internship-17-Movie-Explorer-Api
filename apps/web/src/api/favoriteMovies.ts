import { useQuery } from '@tanstack/react-query';
import type { Movie } from '@tstypes/Movie';
import { api } from '.';

export const getFavoriteMovies = () => {
  return api.get<never, Movie[]>(`/movies/favorites`);
};

export const useFavoriteMovies = () => {
  return useQuery({
    queryKey: ['favoriteMovies'],
    queryFn: () => getFavoriteMovies(),
  });
};
