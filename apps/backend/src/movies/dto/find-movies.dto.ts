import { Genres, SortField, SortOrder } from '@movie-explorer/types';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class FindMoviesDto {
  @ApiProperty({ required: false, enum: SortField })
  @IsOptional()
  @IsEnum(SortField)
  sortBy?: SortField;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiProperty({ required: false, enum: Genres })
  @IsOptional()
  @IsEnum(Genres)
  genre?: Genres;

  @ApiProperty({ required: false, enum: SortOrder })
  @IsOptional()
  @IsEnum(SortOrder)
  sortOrder: SortOrder;
}
