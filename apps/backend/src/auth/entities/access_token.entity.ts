import { ApiProperty } from '@nestjs/swagger';

export class AccessToken {
  @ApiProperty({ description: 'Base64 encoded JSON Web Token' })
  access_token: string;
}
