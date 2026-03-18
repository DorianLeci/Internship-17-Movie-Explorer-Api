import { Body, Controller, Post } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(@Body() { email, password }: RegisterUserDto) {
    return this.usersService.register(email, password);
  }
}
