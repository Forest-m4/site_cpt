import { Body, Controller, Post } from '@nestjs/common';
import { ZodValidationPipe } from 'nestjs-zod';
import * as loginDto from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(
    @Body(new ZodValidationPipe(loginDto.LoginSchema))
    dto: loginDto.LoginDto,
  ) {
    return this.authService.login(dto);
  }

  @Post('register')
  register(
    @Body(new ZodValidationPipe(RegisterDto.schema))
    dto: RegisterDto,
  ) {
    return this.authService.register(dto);
  }
}
