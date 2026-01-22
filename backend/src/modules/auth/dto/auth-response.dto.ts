import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

export const UserSchema = z.object({
  id: z.number().describe('User id'),
  email: z.string().email().describe('User email'),
  role: z.enum(['reader', 'author']).describe('User role'),
});

export const AuthResponseSchema = z.object({
  accessToken: z.string().describe('JWT access token'),
  user: UserSchema,
});

export class AuthResponseDto extends createZodDto(AuthResponseSchema) {}
