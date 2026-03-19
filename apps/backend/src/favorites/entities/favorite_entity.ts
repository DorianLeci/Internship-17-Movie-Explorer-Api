import { MovieEntity } from '@movies/entities/movie.entity';
import { ApiProperty } from '@nestjs/swagger';

export class FavoriteEntity {
  @ApiProperty()
  id: number;

  @ApiProperty({ required: false })
  movie?: MovieEntity;

  @ApiProperty()
  createdAt: Date;
}
