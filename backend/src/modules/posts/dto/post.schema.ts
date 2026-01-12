import { z } from 'zod';

export const PostSchema = z.object({
  id: z.number(),
  title: z.string(),
  content: z.string(),
  createdAt: z.string(),
  updatedAt: z.string().nullable(),
});
