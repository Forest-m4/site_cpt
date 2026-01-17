import {
  Injectable,
  UnauthorizedException,
  ExecutionContext,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService, UserEntity } from '../users.service';
import { JwtPayload } from '../../auth/interfaces/jwt-payload.interface';

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

    const request = context.switchToHttp().getRequest<{ user?: any }>();
    const payload = request.user as JwtPayload;

    if (!payload?.sub) {
      throw new UnauthorizedException('Missing user payload');
    }

    const user: UserEntity = await this.usersService.findById(payload.sub);
    request.user = user;

    return true;
  }
}
