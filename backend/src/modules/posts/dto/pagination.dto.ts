import { z } from 'zod';

export const paginationSchema = z.object({
  take: z.coerce.number().int().min(1).max(20),
  skip: z.coerce.number().int().min(0),
});

export type PaginationDto = z.infer<typeof paginationSchema>;
