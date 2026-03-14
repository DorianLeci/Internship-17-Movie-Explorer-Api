import { ApiProperty } from '@nestjs/swagger';

export class FavoriteEntity {
  @ApiProperty()
  id: number;

  @ApiProperty()
  movieId: number;

  @ApiProperty()
  createdAt: Date;
}
