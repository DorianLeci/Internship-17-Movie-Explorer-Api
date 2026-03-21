import { ApiProperty } from '@nestjs/swagger';
import { IsNotPastDate } from '@validators/IsNotPastDate';
import {
  ArrayNotEmpty,
  IsArray,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  Max,
  Min,
} from 'class-validator';
import MOVIE_LIMITS from 'src/constants/movie';

export class CreateMovieDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'Title cannot be empty' })
  title: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'Description cannot be empty' })
  description: string;

  @ApiProperty({
    description: 'Runtime in minutes',
    default: MOVIE_LIMITS.RUNTIME.DEFAULT_VALUE,
  })
  @IsNumber()
  @Min(MOVIE_LIMITS.RUNTIME.MIN)
  @Max(MOVIE_LIMITS.RUNTIME.MAX)
  runtime: number;

  @ApiProperty({ default: MOVIE_LIMITS.RATING.DEFAULT_VALUE })
  @IsNumber()
  @Min(MOVIE_LIMITS.RATING.MIN)
  @Max(MOVIE_LIMITS.RATING.MAX)
  rating: number;

  @ApiProperty({ default: MOVIE_LIMITS.POPULARITY.DEFAULT_VALUE })
  @IsNumber()
  @Min(MOVIE_LIMITS.POPULARITY.MIN)
  @Max(MOVIE_LIMITS.POPULARITY.MAX)
  popularity: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsUrl(
    { require_protocol: true },
    { message: 'Poster URL must be a valid URL' },
  )
  posterUrl?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsUrl(
    { require_protocol: true },
    { message: 'Trailer URL must be a valid URL' },
  )
  trailerKey?: string;

  @ApiProperty()
  @IsDateString()
  @IsNotPastDate()
  releaseDate: string;

  @ApiProperty({
    type: [Number],
    description: 'List of genre IDs',
    default: [1, 2],
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsNumber({}, { each: true, message: ' Each genre must ba a number' })
  genres: number[];
}
