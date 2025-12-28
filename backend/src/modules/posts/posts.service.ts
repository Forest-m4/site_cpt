import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { posts } from '../../lib/infrastructure/db/schema';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PaginationDto } from './dto/pagination.dto';

@Injectable()
export class PostsService {
  constructor(@Inject('DB') private readonly db: any) {}

  async create(dto: CreatePostDto) {
    const [post] = await this.db.insert(posts).values(dto).returning();

    return post;
  }

  async findAll({ take, skip }: PaginationDto) {
    return this.db.select().from(posts).limit(take).offset(skip);
  }

  async findOne(id: number) {
    const post = await this.db.query.posts.findFirst({
      where: eq(posts.id, id),
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    return post;
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

    return post;
  }

  async remove(id: number) {
    const [post] = await this.db
      .delete(posts)
      .where(eq(posts.id, id))
      .returning();

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    return post;
  }
}
