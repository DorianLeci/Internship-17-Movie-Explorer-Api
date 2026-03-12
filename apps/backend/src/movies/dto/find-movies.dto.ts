import SortField from '@enums/SortField';
import SortOrder from '@enums/SortOrder';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { GenreEnum } from '../../../generated/prisma/enums';

export class FindMoviesDto {
  @ApiProperty({ required: false, enum: SortField })
  @IsOptional()
  @IsEnum(SortField)
  sortBy?: SortField;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiProperty({ required: false, enum: GenreEnum })
  @IsOptional()
  @IsEnum(GenreEnum)
  genre?: GenreEnum;

  @ApiProperty({ required: false, enum: SortOrder })
  @IsOptional()
  @IsEnum(SortOrder)
  sortOrder: SortOrder;
}
