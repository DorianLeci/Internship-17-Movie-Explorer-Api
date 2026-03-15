import { ApiProperty } from '@nestjs/swagger';

export class BaseEntity {
  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
