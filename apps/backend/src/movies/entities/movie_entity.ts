import { ApiProperty } from '@nestjs/swagger';

export class MovieEntity {
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
  trailerUrl: string;

  @ApiProperty()
  releaseDate: Date;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
