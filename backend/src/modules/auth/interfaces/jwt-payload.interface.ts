import { UserRoleEnum } from '../../users/entities/user.entity';

export interface JwtPayload {
  sub: number;
  email: string;
  role: UserRoleEnum;
}
