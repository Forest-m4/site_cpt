import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UserRole } from '../entities/user.entity';

export class CreateUserDto {
  @ApiProperty({ example: 'user@mail.com' })
  email: string;

  @ApiProperty({ example: 'password123' })
  password: string;

  @ApiPropertyOptional({ enum: UserRole, example: UserRole.READER })
  role?: UserRole;
}
