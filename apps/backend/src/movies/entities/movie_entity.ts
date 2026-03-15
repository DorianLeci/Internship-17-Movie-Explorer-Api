import { ApiProperty } from '@nestjs/swagger';
import { Favorite } from 'generated/prisma/browser';

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
  trailerKey: string;

  @ApiProperty()
  releaseDate: Date;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  favorite: Favorite | null;
}
