import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';
import { ApiProperty } from '@nestjs/swagger';
import { UserRoleEnum } from '../../users/entities/user.entity';

export const RegisterSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .regex(
      /^(?=.*[A-Za-z])(?=.*\d)/,
      'Password must contain at least one letter and one number',
    ),
  role: z
    .enum([UserRoleEnum.READER, UserRoleEnum.AUTHOR])
    .default(UserRoleEnum.READER),
});

export class RegisterDto extends createZodDto(RegisterSchema) {
  @ApiProperty({ example: 'user@example.com', description: 'User email' })
  email: string;

  @ApiProperty({ example: 'Password1', description: 'User password' })
  password: string;

  @ApiProperty({
    enum: UserRoleEnum,
    description: 'User role',
    default: UserRoleEnum.READER,
  })
  role: UserRoleEnum;
}
