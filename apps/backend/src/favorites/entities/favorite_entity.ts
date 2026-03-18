import { MovieEntity } from '@movies/entities/movie.entity';
import { ApiProperty } from '@nestjs/swagger';

export class FavoriteEntity {
  @ApiProperty()
  id: number;

  @ApiProperty()
  movieId: number;

  @ApiProperty()
  movie: MovieEntity;

  @ApiProperty()
  createdAt: Date;
}
