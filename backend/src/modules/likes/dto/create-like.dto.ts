import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

export const CreateLikeSchema = z.object({
  postId: z.number().describe('ID of the post to like'),
});

export class CreateLikeDto extends createZodDto(CreateLikeSchema) {}
