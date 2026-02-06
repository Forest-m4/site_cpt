import {
  Controller,
  Post,
  UseGuards,
  Param,
  ParseIntPipe,
  Get,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiOkResponse,
} from '@nestjs/swagger';

import { LikesService } from './likes.service';
import { JwtUserGuard } from '../users/interfaces/jwt-user.guard';
import { RequestUser } from '../users/decorators/request-user.decorator';
import type { UserEntity } from '../users/entities/user.entity';

@ApiTags('likes')
@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Toggle like for a post' })
  @UseGuards(JwtUserGuard)
  @ApiOkResponse({
    description: 'Returns liked status',
    schema: { example: { liked: true } },
  })
  @Post(':postId')
  async toggleLike(
    @Param('postId', ParseIntPipe) postId: number,
    @RequestUser() user: UserEntity,
  ): Promise<{ liked: boolean }> {
    return this.likesService.toggle({ postId }, user);
  }

  @ApiOperation({ summary: 'Get likes count for a post' })
  @ApiOkResponse({
    schema: { example: { count: 5 } },
  })
  @Get(':postId/count')
  async getLikesCount(
    @Param('postId', ParseIntPipe) postId: number,
  ): Promise<{ count: number }> {
    const count = await this.likesService.count(postId);
    return { count };
  }
}
