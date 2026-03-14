import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class CreateFavoriteDto {
  @ApiProperty({
    description: 'Movie id which is being added to the favorites',
  })
  @IsInt()
  movieId: number;
}
