import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

interface JwtRequest {
  user: {
    sub: number;
    role: string;
  };
}

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getMe(@Req() req: JwtRequest) {
    const user = this.usersService.findById(req.user.sub);
    return {
      id: user.id,
      email: user.email,
      role: user.role,
    };
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    const user = this.usersService.findById(Number(id));
    return {
      id: user.id,
      email: user.email,
      role: user.role,
    };
  }
}
