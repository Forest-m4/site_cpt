import {
  Controller,
  Post,
  Get,
  Param,
  UseGuards,
  ParseIntPipe,
  Req,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiOkResponse,
} from '@nestjs/swagger';
import { LikesService } from './likes.service';
import { JwtUserGuard } from '../users/interfaces/jwt-user.guard';

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
    @Req() req,
  ): Promise<{ liked: boolean }> {
    return this.likesService.toggle({ postId }, req.user);
  }

  @ApiOkResponse({
    description: 'Number of likes',
    schema: { example: { count: 5 } },
  })
  @Get('post/:postId/count')
  async countLikes(
    @Param('postId', ParseIntPipe) postId: number,
  ): Promise<{ count: number }> {
    const count = await this.likesService.count(postId);
    return { count };
  }
}
