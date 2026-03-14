import { ApiProperty } from '@nestjs/swagger';
import { Genre, Review, TopCast, TopCrew } from 'generated/prisma/browser';
import { MovieEntity } from './movie_entity';

export class MovieDetailsEntity extends MovieEntity {
  @ApiProperty()
  topCast: TopCast[];

  @ApiProperty()
  topCrew: TopCrew[];

  @ApiProperty()
  reviews: Review[];

  @ApiProperty()
  genres: Genre[];
}
