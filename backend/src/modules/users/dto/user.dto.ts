import { z } from 'zod';
import { UserRoleEnum } from '../entities/user.entity';
import { createZodDto } from 'nestjs-zod/dto';

export const UserSchema = z.object({
  id: z.number(),
  email: z.string().email(),
  role: z.nativeEnum(UserRoleEnum),
});

export class UserDto extends createZodDto(UserSchema) {}
