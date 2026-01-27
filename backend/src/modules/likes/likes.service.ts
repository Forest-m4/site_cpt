import { Injectable, Inject } from '@nestjs/common';
import { eq, and } from 'drizzle-orm';
import type { NodePgDatabase } from 'drizzle-orm/node-postgres';
import type * as schema from '../../lib/infrastructure/db/schema.js';
import { likes } from '../../lib/infrastructure/db/schema';

import type { CreateLikeDto } from './dto/create-like.dto';
import type { UserEntity } from '../users/users.service';

@Injectable()
export class LikesService {
  constructor(
    @Inject('DB')
    private readonly db: NodePgDatabase<typeof schema>,
  ) {}

  async toggle(dto: CreateLikeDto, user: UserEntity) {
    const existing = await this.db
      .select()
      .from(likes)
      .where(and(eq(likes.postId, dto.postId), eq(likes.userId, user.id)))
      .limit(1);

    if (existing[0]) {
      await this.db
        .delete(likes)
        .where(and(eq(likes.postId, dto.postId), eq(likes.userId, user.id)));
      return { liked: false };
    }

    await this.db.insert(likes).values({
      postId: dto.postId,
      userId: user.id,
    });

    return { liked: true };
  }

  async count(postId: number) {
    const result = await this.db
      .select()
      .from(likes)
      .where(eq(likes.postId, postId));

    return result.length;
  }

  async hasLiked(postId: number, userId: number) {
    const result = await this.db
      .select()
      .from(likes)
      .where(and(eq(likes.postId, postId), eq(likes.userId, userId)))
      .limit(1);

    return result.length > 0;
  }
}
