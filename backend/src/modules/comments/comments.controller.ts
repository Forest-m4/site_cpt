import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { ZodValidationPipe } from 'nestjs-zod';

import { CommentsService, type CommentEntity } from './comments.service';
import {
  CreateCommentDto,
  CreateCommentSchema,
  CreateCommentData,
} from './dto/create-comment.dto';

import { JwtUserGuard } from '../users/interfaces/jwt-user.guard';
import { RequestUser } from '../users/decorators/request-user.decorator';
import type { UserEntity } from '../users/entities/user.entity';

@ApiTags('comments')
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create comment for a post' })
  @ApiOkResponse({ type: CreateCommentDto })
  @UseGuards(JwtUserGuard)
  @Post(':postId')
  async createComment(
    @Param('postId', ParseIntPipe) postId: number,
    @Body(new ZodValidationPipe(CreateCommentSchema)) body: CreateCommentDto,
    @RequestUser() user: UserEntity,
  ): Promise<CommentEntity> {
    const data: CreateCommentData = {
      ...body,
      postId,
    };

    return this.commentsService.create(data, user);
  }

  @ApiOkResponse({ type: [CreateCommentDto] })
  @Get('post/:postId')
  async getComments(
    @Param('postId', ParseIntPipe) postId: number,
  ): Promise<CommentEntity[]> {
    return this.commentsService.findByPost(postId);
  }
}
