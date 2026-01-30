import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { eq, sql } from 'drizzle-orm';
import type { NodePgDatabase } from 'drizzle-orm/node-postgres';
import type * as schema from '../../lib/infrastructure/db/schema.js';
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

    return this.enrichPostWithLikesCount(post);
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
    const [post] = await this.db
      .update(posts)
      .set({
        ...dto,
        updatedAt: new Date(),
      })
      .where(eq(posts.id, id))
      .returning();

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    return this.enrichPostWithLikesCount(post);
  }

  async remove(id: number) {
    const [post] = await this.db
      .delete(posts)
      .where(eq(posts.id, id))
      .returning();

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    return this.enrichPostWithLikesCount(post);
  }

  private async enrichPostWithLikesCount(post: typeof posts.$inferSelect) {
    const [result] = await this.db
      .select({ count: sql<number>`count(*)` })
      .from(likes)
      .where(eq(likes.postId, post.id));

    return {
      ...post,
      likesCount: Number(result?.count) || 0,
    };
  }
}
