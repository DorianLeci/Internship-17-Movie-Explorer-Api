import { UpdateMovieDto } from './update-movie.dto';

export class UpdateMovieResponse {
  id: number;
  updatedFields: UpdateMovieDto;
}
