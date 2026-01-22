import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
import { UserRoleEnum } from '../../users/entities/user.entity';

export const RegisterSchema = z.object({
  email: z.string().email().describe('User email'),

  password: z
    .string()
    .min(6)
    .regex(/^(?=.*[A-Za-z])(?=.*\d)/)
    .describe('Password with at least one letter and one number'),

  role: z.enum(UserRoleEnum).default(UserRoleEnum.READER).describe('User role'),
});

export class RegisterDto extends createZodDto(RegisterSchema) {}
