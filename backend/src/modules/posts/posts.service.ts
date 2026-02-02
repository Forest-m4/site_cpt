import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { eq, sql } from 'drizzle-orm';
import type { NodePgDatabase } from 'drizzle-orm/node-postgres';
import type * as schema from '../../lib/infrastructure/db/schema';
import { posts, likes } from '../../lib/infrastructure/db/schema';

import type { CreatePostDto } from './dto/create-post.dto';
import type { UpdatePostDto } from './dto/update-post.dto';
import type { PaginationDto } from './dto/pagination.dto';

@Injectable()
export class PostsService {
  constructor(
    @Inject('DB')
    private readonly db: NodePgDatabase<typeof schema>,
  ) {}

  async create(dto: CreatePostDto, userId: number) {
    const [post] = await this.db
      .insert(posts)
      .values({
        title: dto.title,
        content: dto.content,
        userId,
      })
      .returning();

    return {
      ...post,
      likesCount: 0,
    };
  }

  async findAll({ take, skip }: PaginationDto) {
    const postsWithLikes = await this.db
      .select({
        id: posts.id,
        title: posts.title,
        content: posts.content,
        userId: posts.userId,
        createdAt: posts.createdAt,
        updatedAt: posts.updatedAt,
        likesCount: sql<number>`count(${likes.id})`.as('likesCount'),
      })
      .from(posts)
      .leftJoin(likes, eq(posts.id, likes.postId))
      .groupBy(posts.id)
      .limit(take)
      .offset(skip);

    return postsWithLikes.map((post) => ({
      ...post,
      likesCount: Number(post.likesCount) || 0,
    }));
  }

  async findOne(id: number) {
    const [postWithLikes] = await this.db
      .select({
        id: posts.id,
        title: posts.title,
        content: posts.content,
        userId: posts.userId,
        createdAt: posts.createdAt,
        updatedAt: posts.updatedAt,
        likesCount: sql<number>`count(${likes.id})`.as('likesCount'),
      })
      .from(posts)
      .leftJoin(likes, eq(posts.id, likes.postId))
      .where(eq(posts.id, id))
      .groupBy(posts.id);

    if (!postWithLikes) {
      throw new NotFoundException('Post not found');
    }

    return {
      ...postWithLikes,
      likesCount: Number(postWithLikes.likesCount) || 0,
    };
  }

  async update(id: number, dto: UpdatePostDto) {
    const [postWithLikes] = await this.db
      .select({
        id: posts.id,
        title: posts.title,
        content: posts.content,
        userId: posts.userId,
        createdAt: posts.createdAt,
        updatedAt: posts.updatedAt,
        likesCount: sql<number>`count(${likes.id})`.as('likesCount'),
      })
      .from(posts)
      .leftJoin(likes, eq(posts.id, likes.postId))
      .where(eq(posts.id, id))
      .groupBy(posts.id);

    if (!postWithLikes) {
      throw new NotFoundException('Post not found');
    }

    const updateData: any = { updatedAt: new Date() };
    if (dto.title !== undefined) updateData.title = dto.title;
    if (dto.content !== undefined) updateData.content = dto.content;

    if (Object.keys(updateData).length > 1) {
      await this.db.update(posts).set(updateData).where(eq(posts.id, id));
    }

    return {
      ...postWithLikes,
      ...dto,
      likesCount: Number(postWithLikes.likesCount) || 0,
      updatedAt: new Date(),
    };
  }

  async remove(id: number) {
    const [postWithLikes] = await this.db
      .select({
        id: posts.id,
        title: posts.title,
        content: posts.content,
        userId: posts.userId,
        createdAt: posts.createdAt,
        updatedAt: posts.updatedAt,
        likesCount: sql<number>`count(${likes.id})`.as('likesCount'),
      })
      .from(posts)
      .leftJoin(likes, eq(posts.id, likes.postId))
      .where(eq(posts.id, id))
      .groupBy(posts.id);

    if (!postWithLikes) {
      throw new NotFoundException('Post not found');
    }

    await this.db.delete(posts).where(eq(posts.id, id));

    return {
      ...postWithLikes,
      likesCount: Number(postWithLikes.likesCount) || 0,
    };
  }
}
