import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UsePipes,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { ZodValidationPipe } from 'nestjs-zod';

import * as createPostDto from '../modules/posts/dto/create-post.dto';
import * as updatePostDto from '../modules/posts/dto/update-post.dto';
import * as paginationDto from '../modules/posts/dto/pagination.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createPostDto.createPostSchema))
  create(@Body() dto: createPostDto.CreatePostDto) {
    return this.postsService.create(dto);
  }

  @Get()
  @UsePipes(new ZodValidationPipe(paginationDto.paginationSchema))
  findAll(@Query() query: paginationDto.PaginationDto) {
    return this.postsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(Number(id));
  }

  @Patch(':id')
  @UsePipes(new ZodValidationPipe(updatePostDto.updatePostSchema))
  update(@Param('id') id: string, @Body() dto: updatePostDto.UpdatePostDto) {
    return this.postsService.update(Number(id), dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(Number(id));
  }
}
