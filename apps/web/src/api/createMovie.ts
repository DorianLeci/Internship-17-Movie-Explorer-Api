import type { CreateMovieDto } from '@tstypes/CreateMovieDto';
import type { Movie } from '@tstypes/Movie';
import { api } from '.';

export const createMovie = (data: CreateMovieDto): Promise<Movie> => {
  return api.post<never, Movie>('/movies', data);
};
