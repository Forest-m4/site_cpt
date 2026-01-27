import {
  Injectable,
  UnauthorizedException,
  ExecutionContext,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService, UserEntity } from '../users.service';
import { RequestWithUser } from './request-with-user.interface';

@Injectable()
export class JwtUserGuard extends AuthGuard('jwt') {
  constructor(private readonly usersService: UsersService) {
    super();
  }

  public override async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const result = (await super.canActivate(context)) as boolean;
    if (!result) return false;

    const request = context.switchToHttp().getRequest<RequestWithUser>();

    const jwtUser = request.user as { id: number };

    if (!jwtUser?.id) {
      throw new UnauthorizedException('Missing user');
    }

    const user: UserEntity = await this.usersService.findById(jwtUser.id);
    request.user = user;

    return true;
  }
}
