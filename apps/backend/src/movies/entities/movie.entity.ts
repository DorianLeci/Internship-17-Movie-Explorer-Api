import { BaseEntity } from '@base/base.entity';
import { ApiProperty } from '@nestjs/swagger';

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
  posterUrl: string | null;

  @ApiProperty()
  trailerKey: string | null;

  @ApiProperty()
  releaseDate: Date;

  @ApiProperty()
  isFavorite: boolean | undefined;
}
