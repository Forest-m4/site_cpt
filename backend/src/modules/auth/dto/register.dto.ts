import { z } from 'zod';
import { UserRoleEnum } from '../../users/entities/user.entity';
import { createZodDto } from 'nestjs-zod';

const RegisterSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .regex(
      /^(?=.*[A-Za-z])(?=.*\d)/,
      'Password must contain at least one letter and one number',
    ),
  role: z.nativeEnum(UserRoleEnum).optional().default(UserRoleEnum.READER),
});

export class RegisterDto extends createZodDto(RegisterSchema) {}
