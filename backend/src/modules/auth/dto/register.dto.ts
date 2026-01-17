import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const RegisterSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .regex(
      /^(?=.*[A-Za-z])(?=.*\d)/,
      'Password must contain at least one letter and one number',
    ),
  name: z.string().min(2, 'Name must be at least 2 characters').optional(),
  role: z.enum(['USER', 'ADMIN']).optional().default('USER'),
});

export class RegisterDto extends createZodDto(RegisterSchema) {}
