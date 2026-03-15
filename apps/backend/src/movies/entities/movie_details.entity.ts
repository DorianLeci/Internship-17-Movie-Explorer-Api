import { ApiProperty } from '@nestjs/swagger';
import { GenreEntity } from 'src/genres/entities/genre.entity';
import { MovieEntity } from './movie.entity';
import { ReviewEntity } from './review.entity';
import { TopCastEntity } from './top-cast.entity';
import { TopCrewEntity } from './top-crew.entity';

export class MovieDetailsEntity extends MovieEntity {
  @ApiProperty({ type: () => [TopCastEntity] })
  topCast: TopCastEntity[];

  @ApiProperty({ type: () => [TopCrewEntity] })
  topCrew: TopCrewEntity[];

  @ApiProperty({ type: () => [ReviewEntity] })
  reviews: ReviewEntity[];

  @ApiProperty({ type: () => [GenreEntity] })
  genres: GenreEntity[];
}
