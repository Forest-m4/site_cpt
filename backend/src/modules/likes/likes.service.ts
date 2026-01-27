import { Injectable } from '@nestjs/common';
import type { LikeEntity } from './entities/like.entity';
import type { UserEntity } from '../users/entities/user.entity';
import type { CreateLikeDto } from './dto/create-like.dto';

@Injectable()
export class LikesService {
  private readonly likes: LikeEntity[] = [];
  private idCounter = 1;

  async toggle(
    dto: CreateLikeDto,
    user: UserEntity,
  ): Promise<{ liked: boolean }> {
    const existingIndex = this.likes.findIndex(
      (l) => l.postId === dto.postId && l.userId === user.id,
    );

    if (existingIndex >= 0) {
      this.likes.splice(existingIndex, 1);
      return { liked: false };
    }

    const like: LikeEntity = {
      id: this.idCounter++,
      userId: user.id,
      postId: dto.postId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.likes.push(like);

    return { liked: true };
  }

  async count(postId: number): Promise<number> {
    return this.likes.filter((l) => l.postId === postId).length;
  }
}
