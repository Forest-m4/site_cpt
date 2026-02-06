import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { eq, sql } from 'drizzle-orm';
import type { NodePgDatabase } from 'drizzle-orm/node-postgres';
import type * as schema from '../../lib/infrastructure/db/schema';
import { posts, likes } from '../../lib/infrastructure/db/schema';

import type { CreatePostDto } from './dto/create-post.dto';
import type { UpdatePostDto } from './dto/update-post.dto';
import type { PaginationDto } from './dto/pagination.dto';
import { safeUpdate } from '../../lib/infrastructure/db/db.utils';

type PostWithLikes = {
  id: number;
  title: string;
  content: string;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
  likesCount: number;
};

@Injectable()
export class PostsService {
  constructor(
    @Inject('DB')
    private readonly db: NodePgDatabase<typeof schema>,
  ) {}

  async create(dto: CreatePostDto, userId: number): Promise<PostWithLikes> {
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

  async findAll({ take, skip }: PaginationDto): Promise<PostWithLikes[]> {
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
      .orderBy(posts.createdAt)
      .limit(take)
      .offset(skip);

    return postsWithLikes.map((post) => ({
      ...post,
      likesCount: Number(post.likesCount) || 0,
    }));
  }

  async findOne(id: number): Promise<PostWithLikes> {
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

  async update(id: number, dto: UpdatePostDto): Promise<PostWithLikes> {
    const updateData = safeUpdate({
      title: dto.title,
      content: dto.content,
    });

    if (Object.keys(updateData).length === 0) {
      return this.findOne(id);
    }

    const [updatedPost] = await this.db
      .update(posts)
      .set(updateData)
      .where(eq(posts.id, id))
      .returning({
        id: posts.id,
        title: posts.title,
        content: posts.content,
        userId: posts.userId,
        createdAt: posts.createdAt,
        updatedAt: posts.updatedAt,
      });

    if (!updatedPost) {
      throw new NotFoundException('Post not found');
    }

    const [likesResult] = await this.db
      .select({ count: sql<number>`count(*)` })
      .from(likes)
      .where(eq(likes.postId, id));

    return {
      ...updatedPost,
      likesCount: Number(likesResult?.count) || 0,
    };
  }

  async remove(id: number): Promise<PostWithLikes> {
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
