import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { PostsService } from './posts.service';
import type { CreatePostDto } from './dto/create-post.dto';
import type { UpdatePostDto } from './dto/update-post.dto';
import type { PaginationDto } from './dto/pagination.dto';
import { RequestUser } from '../users/decorators/request-user.decorator';
import type { UserEntity } from '../users/entities/user.entity';
import { JwtUserGuard } from '../users/interfaces/jwt-user.guard';

@ApiTags('posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtUserGuard)
  @ApiOkResponse({ description: 'Create a new post' })
  create(@Body() dto: CreatePostDto, @RequestUser() user: UserEntity) {
    return this.postsService.create(dto, user.id);
  }

  @Get()
  @ApiOkResponse({ description: 'Get all posts' })
  findAll(@Query() query: PaginationDto) {
    return this.postsService.findAll(query);
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Get post by ID' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.findOne(id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(JwtUserGuard)
  @ApiOkResponse({ description: 'Update post by ID' })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdatePostDto) {
    return this.postsService.update(id, dto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtUserGuard)
  @ApiOkResponse({ description: 'Delete post by ID' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.remove(id);
  }
}
