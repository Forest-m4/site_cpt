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
import { RequestUser } from './interfaces/request-user.decorator';
import { UserDto } from './dto/user.dto';
import * as userEntity from './entities/user.entity';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiBearerAuth()
  @ApiOkResponse({ type: UserDto })
  @UseGuards(JwtUserGuard)
  @Get('me')
  getMe(@RequestUser() user: userEntity.UserEntity) {
    return this.toDto(user);
  }

  @ApiOkResponse({ type: UserDto })
  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    const user = await this.usersService.findById(id);

    let role: userEntity.UserRoleEnum;
    if (user.role === 'reader') role = userEntity.UserRoleEnum.READER;
    else if (user.role === 'author') role = userEntity.UserRoleEnum.AUTHOR;
    else role = userEntity.UserRoleEnum.READER;
    return {
      id: user.id,
      email: user.email,
      role,
    } as UserDto;
  }
  private toDto(user: userEntity.UserEntity): UserDto {
    const role = user.role;
    return {
      id: user.id,
      email: user.email,
      role: role,
    };
  }
}
