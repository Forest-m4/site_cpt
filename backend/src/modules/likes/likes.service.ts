import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { eq, and, sql } from 'drizzle-orm';
import type { NodePgDatabase } from 'drizzle-orm/node-postgres';

import type * as schema from '../../lib/infrastructure/db/schema';
import { likes, posts } from '../../lib/infrastructure/db/schema';

import type { LikeData } from './dto/create-like.dto';
import type { UserEntity } from '../users/entities/user.entity';

export type LikeEntity = typeof likes.$inferSelect;

@Injectable()
export class LikesService {
  constructor(
    @Inject('DB')
    private readonly db: NodePgDatabase<typeof schema>,
  ) {}

  async toggle(data: LikeData, user: UserEntity): Promise<{ liked: boolean }> {
    const post = await this.db.query.posts.findFirst({
      where: eq(posts.id, data.postId),
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    const existingLike = await this.db.query.likes.findFirst({
      where: and(eq(likes.postId, data.postId), eq(likes.userId, user.id)),
    });

    if (existingLike) {
      await this.db
        .delete(likes)
        .where(and(eq(likes.postId, data.postId), eq(likes.userId, user.id)));
      return { liked: false };
    } else {
      await this.db.insert(likes).values({
        postId: data.postId,
        userId: user.id,
      });
      return { liked: true };
    }
  }

  async count(postId: number): Promise<number> {
    const result = await this.db
      .select({ count: sql<number>`count(*)` })
      .from(likes)
      .where(eq(likes.postId, postId));

    return result[0]?.count ?? 0;
  }

  async hasLiked(postId: number, userId: number): Promise<boolean> {
    const result = await this.db
      .select()
      .from(likes)
      .where(and(eq(likes.postId, postId), eq(likes.userId, userId)))
      .limit(1);

    return result.length > 0;
  }
}
