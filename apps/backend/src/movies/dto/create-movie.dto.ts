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

export class CreateMovieDto {
  @IsString()
  @IsNotEmpty({ message: 'Title cannot be empty' })
  title: string;

  @IsString()
  @IsNotEmpty({ message: 'Description cannot be empty' })
  description: string;

  @IsNumber()
  @Min(1)
  runtime: number;

  @IsNumber()
  @Min(1)
  @Max(10)
  rating: number;

  @IsNumber()
  @Min(0)
  @Max(10)
  popularity: number;

  @IsOptional()
  @IsUrl(
    { require_protocol: true },
    { message: 'Poster URL must be a valid URL' },
  )
  posterUrl?: string;

  @IsOptional()
  @IsUrl(
    { require_protocol: true },
    { message: 'Trailer URL must be a valid URL' },
  )
  trailerKey?: string;

  @IsDateString()
  @IsNotPastDate()
  releaseDate: string;

  @IsArray()
  @ArrayNotEmpty()
  genres: number[];
}
