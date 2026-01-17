import {
  Controller,
  Get,
  Param,
  UseGuards,
  NotFoundException,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import * as usersService from './users.service';
import { JwtUserGuard } from './interfaces/jwt-user.guard';
import { RequestUser } from './interfaces/request-user.decorator';
import { UserDto } from './dto/user.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: usersService.UsersService) {}

  @ApiBearerAuth()
  @ApiOkResponse({ type: UserDto })
  @UseGuards(JwtUserGuard)
  @Get('me')
  getMe(@RequestUser() user: usersService.UserEntity) {
    return user;
  }

  @ApiOkResponse({ type: UserDto })
  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    const user = await this.usersService.findById(id);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }
}
