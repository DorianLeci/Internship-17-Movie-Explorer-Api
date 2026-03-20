import type { EditMovieDto } from '@tstypes/CreateMovieDto';
import type { UpdateMovie } from '@tstypes/MovieDetails';
import { api } from '.';

export const editMovie = (
  id: number,
  data: EditMovieDto,
): Promise<UpdateMovie> => {
  return api.post<never, UpdateMovie>(`/movies/${id}`, data);
};
