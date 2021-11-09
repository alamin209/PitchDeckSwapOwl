import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken';
import { USER_JWT_SECRET } from '../configs/config';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();

    try {
      const authorizationHeader = req.headers['authorization'];
      let token;
      if (authorizationHeader) {
        token = authorizationHeader.split(' ')[1];
      }
      if (token) {
        req['_user'] = jwt.verify(token, USER_JWT_SECRET);
        return true;
      } else {
        throw new UnauthorizedException('No token provided');
      }
    } catch (e) {
      throw new UnauthorizedException(
        'Authentication failed. Please Try again! Now',
      );
    }
  }
}
