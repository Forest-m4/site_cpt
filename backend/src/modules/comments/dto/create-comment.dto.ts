import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

export const CreateCommentSchema = z.object({
  content: z.string().min(1).describe('Comment content'),
});

export class CreateCommentDto extends createZodDto(CreateCommentSchema) {}
