import { z } from 'zod';

export const UserSchema = z.object({
  id: z.number(),
  email: z.string().email(),
  role: z.enum(['reader', 'author']),
});

export type UserDtoZod = z.infer<typeof UserSchema>;

export const AuthResponseSchema = z.object({
  accessToken: z.string(),
  user: UserSchema,
});

export type AuthResponseDto = z.infer<typeof AuthResponseSchema>;
