import { Request } from 'express';
import { UserEntity } from '../users.service';

export interface RequestWithUser extends Request {
  user?: UserEntity;
}
