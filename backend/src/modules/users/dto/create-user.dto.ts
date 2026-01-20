import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';
import { UserRoleEnum } from '../entities/user.entity';

export const CreateUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  role: z.nativeEnum(UserRoleEnum).optional().default(UserRoleEnum.READER),
});

export class CreateUserDto extends createZodDto(CreateUserSchema) {}
