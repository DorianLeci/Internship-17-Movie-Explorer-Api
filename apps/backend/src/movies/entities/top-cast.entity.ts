import { BaseEntity } from '@base/base.entity';
import { ApiProperty } from '@nestjs/swagger';

export class TopCastEntity extends BaseEntity {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  character: string;
}
