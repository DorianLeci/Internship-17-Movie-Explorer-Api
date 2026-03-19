import type { Favorite } from '@tstypes/Favorite';
import { api } from '.';

export const createFavorite = (movieId: number | undefined) => {
  return api.post<never, Favorite>('/favorites', { movieId });
};

export const removeFavorite = (movieId: number | undefined) => {
  return api.delete<never, void>(`/favorites/${movieId}`);
};
