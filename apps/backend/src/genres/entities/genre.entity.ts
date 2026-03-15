import { BaseEntity } from '@base/base.entity';
import { ApiProperty } from '@nestjs/swagger';
import { GenreEnum } from '../../../generated/prisma/enums';

export class GenreEntity extends BaseEntity {
  @ApiProperty()
  id: number;

  @ApiProperty({ enum: GenreEnum })
  name: GenreEnum;
}
