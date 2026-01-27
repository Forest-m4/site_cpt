import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  ParseIntPipe,
  Req,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { ZodValidationPipe } from 'nestjs-zod';
import { CommentsService } from './comments.service';
import {
  CreateCommentDto,
  CreateCommentSchema,
} from './dto/create-comment.dto';
import { JwtUserGuard } from '../users/interfaces/jwt-user.guard';
import type { CommentEntity } from './entities/comment.entity';

@ApiTags('comments')
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create comment for a post' })
  @UseGuards(JwtUserGuard)
  @ApiOkResponse({ type: CreateCommentDto })
  @Post(':postId')
  async createComment(
    @Param('postId', ParseIntPipe) postId: number,
    @Body(new ZodValidationPipe(CreateCommentSchema)) body: CreateCommentDto,
    @Req() req,
  ): Promise<CommentEntity> {
    return this.commentsService.create(
      {
        ...body,
        postId,
      },
      req.user,
    );
  }

  @ApiOkResponse({ type: [CreateCommentDto] })
  @Get('post/:postId')
  async getComments(
    @Param('postId', ParseIntPipe) postId: number,
  ): Promise<CommentEntity[]> {
    return this.commentsService.findByPost(postId);
  }
}
