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

export class CreateMovieDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'Title cannot be empty' })
  title: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'Description cannot be empty' })
  description: string;

  @ApiProperty({ description: 'Runtime in minutes', default: 1 })
  @IsNumber()
  @Min(1)
  runtime: number;

  @ApiProperty({ default: 1 })
  @IsNumber()
  @Min(1)
  @Max(10)
  rating: number;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  @Max(10)
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
