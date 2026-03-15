import { BaseEntity } from '@base/base.entity';
import { ApiProperty } from '@nestjs/swagger';

export class ReviewEntity extends BaseEntity {
  @ApiProperty()
  id: number;

  @ApiProperty()
  author: string;

  @ApiProperty()
  content: string;
}
