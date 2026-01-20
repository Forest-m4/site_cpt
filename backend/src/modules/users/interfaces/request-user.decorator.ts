import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { UserEntity } from '../entities/user.entity';

export const RequestUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): UserEntity => {
    const request = ctx.switchToHttp().getRequest<{ user?: UserEntity }>();
    if (!request.user) {
      throw new UnauthorizedException('User not found in request');
    }
    return request.user;
  },
);
