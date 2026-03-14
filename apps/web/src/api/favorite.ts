import type { Favorite } from '@tstypes/Favorite';
import { api } from '.';

export const createFavorite = (id: number | undefined) => {
  return api.post<never, Favorite>('/favorites', { movieId: id });
};

export const removeFavorite = (id: number | undefined) => {
  return api.delete<never, void>(`/favorites/${id}`);
};
