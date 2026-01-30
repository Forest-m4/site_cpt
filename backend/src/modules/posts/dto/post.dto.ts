import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const PostSchema = z.object({
  id: z.number(),
  title: z.string().min(1).max(255),
  content: z.string().min(1),
  userId: z.number(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime().nullable(),
  likesCount: z.number().default(0),
});

export const CreatePostSchema = PostSchema.pick({
  title: true,
  content: true,
});

export const UpdatePostSchema = PostSchema.pick({
  title: true,
  content: true,
}).partial();

export class PostDto extends createZodDto(PostSchema) {}
export class CreatePostDto extends createZodDto(CreatePostSchema) {}
export class UpdatePostDto extends createZodDto(UpdatePostSchema) {}
