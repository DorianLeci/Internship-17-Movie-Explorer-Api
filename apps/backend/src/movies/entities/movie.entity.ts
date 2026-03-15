import { BaseEntity } from '@base/base.entity';
import { ApiProperty } from '@nestjs/swagger';
import { FavoriteEntity } from 'src/favorites/entities/favorite_entity';

export class MovieEntity extends BaseEntity {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  runtime: number;

  @ApiProperty()
  rating: number;

  @ApiProperty()
  popularity: number;

  @ApiProperty()
  posterUrl: string;

  @ApiProperty()
  trailerKey: string;

  @ApiProperty()
  releaseDate: Date;

  @ApiProperty({ type: () => [FavoriteEntity] })
  favorite: FavoriteEntity | null;
}
