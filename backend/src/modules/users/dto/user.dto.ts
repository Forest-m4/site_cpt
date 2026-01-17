import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'user@mail.com' })
  email: string;

  @ApiProperty({ example: 'reader' })
  role: 'reader' | 'author';
}
