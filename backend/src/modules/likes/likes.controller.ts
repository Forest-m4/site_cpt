import {
  Controller,
  Post,
  UseGuards,
  Param,
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
}
