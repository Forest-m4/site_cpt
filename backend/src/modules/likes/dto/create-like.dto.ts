import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const LikeSchema = z.object({
  postId: z.number().int().positive(),
});

export class LikeDto extends createZodDto(LikeSchema) {}

export type LikeData = z.infer<typeof LikeSchema>;
