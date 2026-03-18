import { ApiProperty } from '@nestjs/swagger';
import { AccessToken } from '../entities/access_token.entity';

export class LoginResponseDto {
  @ApiProperty({ type: AccessToken })
  token: AccessToken;
}
