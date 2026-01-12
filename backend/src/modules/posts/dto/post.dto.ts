import { createZodDto } from 'nestjs-zod';
import { PostSchema } from './post.schema';

export class PostDto extends createZodDto(PostSchema) {}
