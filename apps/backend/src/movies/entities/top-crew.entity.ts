import { BaseEntity } from '@base/base.entity';
import { ApiProperty } from '@nestjs/swagger';
import { CrewRole } from 'generated/prisma/enums';

export class TopCrewEntity extends BaseEntity {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty({ enum: CrewRole })
  role: CrewRole;
}
