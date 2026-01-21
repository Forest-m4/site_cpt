import { ApiProperty } from '@nestjs/swagger';
import { UserSwaggerDto } from '../../users/dto/user.dto';

export class AuthResponseSwaggerDto {
  @ApiProperty({
    description: 'JWT access token',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  accessToken: string;

  @ApiProperty({ description: 'Authenticated user', type: UserSwaggerDto })
  user: UserSwaggerDto;
}
