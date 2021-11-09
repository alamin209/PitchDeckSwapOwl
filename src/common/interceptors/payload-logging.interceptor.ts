import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

/**
 * LoggingInterceptor Use for log every request
 * @class
 * @version 1.0.0
 * @since 1.0.0
 * @global
 */
@Injectable()
export class PayloadLoggingInterceptor implements NestInterceptor {
  /**
   * @since 1.0.0
   * @name logger
   * @private
   * @constant
   */

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const className = context.getClass().name;
    const methodName = context.getHandler().name;
    const now = Date.now();

    return next.handle().pipe(
      // tap((s) => { }),
      map((payload) => {
        context.switchToHttp().getResponse()['statusCode'] = payload.statusCode;
        const statusCode = payload.statusCode || 200;
        const responseObject = {
          nonce: new Date().getTime(),
          status: statusCode,
          payload: payload.data,
        };
        if (payload.metadata) {
          responseObject['metadata'] = payload.metadata;
        }
        return responseObject;
      }),
      catchError((err) => {
        err['processTime'] = `${Date.now() - now}`;
        err['context'] = `${className}/${methodName}`;
        return throwError(err);
      }),
    );
  }
}
