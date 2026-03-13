import { ApiProperty } from '@nestjs/swagger';
import { GenreEnum } from '../../../generated/prisma/enums';

export class GenreEntity {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: GenreEnum;
}
