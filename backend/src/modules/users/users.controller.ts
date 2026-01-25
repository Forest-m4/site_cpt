import {
  Controller,
  Get,
  Param,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { JwtUserGuard } from './interfaces/jwt-user.guard';
import { RequestUser } from './decorators/request-user.decorator';
import { UserDto, UserSchema } from './dto/user.dto';
import type { UserEntity } from './entities/user.entity';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiBearerAuth()
  @ApiOkResponse({ type: UserDto })
  @UseGuards(JwtUserGuard)
  @Get('me')
  getMe(@RequestUser() user: UserEntity) {
    return UserSchema.parse(user);
  }

  @ApiOkResponse({ type: UserDto })
  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    const user = await this.usersService.findById(id);
    return UserSchema.parse(user);
  }
}
