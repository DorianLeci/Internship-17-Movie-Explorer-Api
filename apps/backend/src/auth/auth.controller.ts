import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { seconds, Throttle, ThrottlerGuard } from '@nestjs/throttler';
import { AuthService } from './auth.service';
import { LoginRequestDto } from './dto/login-request.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { RegisterRequestDto } from './dto/register-request.dto';
import { RegisterResponseDto } from './dto/register-response.dto';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(ThrottlerGuard, AuthGuard('local'))
  @Throttle({
    default: {
      limit: 5,
      ttl: seconds(60),
      blockDuration: seconds(900),
    },
  })
  @Post('login')
  @HttpCode(200)
  @ApiBody({ type: LoginRequestDto })
  @ApiOkResponse({ description: 'User successfully authenticated' })
  @ApiUnauthorizedResponse({ description: 'Email or password does not exist' })
  @ApiResponse({ status: 429, description: 'Email or password does not exist' })
  async login(@Request() req): Promise<LoginResponseDto> {
    const access_token = await this.authService.login(req.user);
    return { token: access_token };
  }

  @Post('register')
  @ApiCreatedResponse({
    description: 'User successfully registered',
    type: RegisterResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Validation failed (e.g., invalid email or weak password)',
  })
  @ApiConflictResponse({ description: 'Email already exists' })
  async register(
    @Body() registerBody: RegisterRequestDto,
  ): Promise<RegisterResponseDto> {
    const access_token = await this.authService.register(registerBody);
    return { token: access_token };
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  @ApiBearerAuth('access-token')
  @ApiUnauthorizedResponse({ description: 'Access token expired' })
  me(@Req() req) {
    return req.user;
  }
}
