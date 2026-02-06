import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import type { NodePgDatabase } from 'drizzle-orm/node-postgres';

import type * as schema from '../../lib/infrastructure/db/schema';
import { comments, posts } from '../../lib/infrastructure/db/schema';

import type { CreateCommentData } from './dto/create-comment.dto';
import type { UserEntity } from '../users/entities/user.entity';

export type CommentEntity = typeof comments.$inferSelect;

@Injectable()
export class CommentsService {
  constructor(
    @Inject('DB')
    private readonly db: NodePgDatabase<typeof schema>,
  ) {}

  async create(
    data: CreateCommentData,
    user: UserEntity,
  ): Promise<CommentEntity> {
    const post = await this.db.query.posts.findFirst({
      where: eq(posts.id, data.postId),
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    const [comment] = await this.db
      .insert(comments)
      .values({
        content: data.content,
        authorId: user.id,
        postId: data.postId,
      })
      .returning();

    return comment;
  }

  async findByPost(postId: number): Promise<CommentEntity[]> {
    return this.db
      .select()
      .from(comments)
      .where(eq(comments.postId, postId))
      .orderBy(comments.createdAt);
  }
}
