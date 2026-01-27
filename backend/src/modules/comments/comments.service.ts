import { Injectable, NotFoundException } from '@nestjs/common';
import type { CommentEntity } from './entities/comment.entity';
import type { UserEntity } from '../users/entities/user.entity';

export type CreateCommentData = {
  content: string;
  postId: number;
};

@Injectable()
export class CommentsService {
  private readonly comments: CommentEntity[] = [];
  private idCounter = 1;

  async create(
    data: CreateCommentData,
    user: UserEntity,
  ): Promise<CommentEntity> {
    const comment: CommentEntity = {
      id: this.idCounter++,
      content: data.content,
      authorId: user.id,
      postId: data.postId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.comments.push(comment);
    return comment;
  }

  async findByPost(postId: number): Promise<CommentEntity[]> {
    const postComments = this.comments.filter((c) => c.postId === postId);
    if (!postComments.length)
      throw new NotFoundException('Comments not found for this post');
    return postComments;
  }
}
