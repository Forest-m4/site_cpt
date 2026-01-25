import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
import { UserRoleEnum } from '../entities/user.entity';

export const UserSchema = z.object({
  id: z.number(),
  email: z.string().email(),
  role: z.enum(UserRoleEnum).describe('User role'),
});

export const UserDtoSchema = z.object({
  accessToken: z.string().describe('JWT access token'),
  user: UserSchema,
});

export class UserDto extends createZodDto(UserDtoSchema) {}
