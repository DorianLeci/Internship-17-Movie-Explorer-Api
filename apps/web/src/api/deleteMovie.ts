import { api } from '.';

export const deleteMovie = (id: number): Promise<void> => {
  return api.delete<never, void>(`/movies/${id}`);
};
