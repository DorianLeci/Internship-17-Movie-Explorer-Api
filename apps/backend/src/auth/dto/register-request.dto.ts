import { ApiProperty } from '@nestjs/swagger';
import { IsStrongPassword } from '@validators/IsStrongPassword';
import { IsEmail } from 'class-validator';

export class RegisterRequestDto {
  @ApiProperty({ description: 'User email, must be unique' })
  @IsEmail()
  email: string;

  @ApiProperty({
    description:
      'User password, minimum 8 characters. Must have one at least one character and one number',
    minLength: 8,
  })
  @IsStrongPassword()
  password: string;
}
