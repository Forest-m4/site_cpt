import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

export const LoginSchema = z.object({
  email: z.string().email().describe('User email'),

  password: z.string().min(1).describe('User password'),
});

export class LoginDto extends createZodDto(LoginSchema) {}
