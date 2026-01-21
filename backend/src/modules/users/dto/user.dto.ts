import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

export const UserSchema = z.object({
  id: z.number(),
  email: z.string().email(),
  role: z.enum(['reader', 'author']),
});

export class UserDto extends createZodDto(UserSchema) {}

export class UserSwaggerDto {
  id: number;
  email: string;
  role: 'reader' | 'author';
}
