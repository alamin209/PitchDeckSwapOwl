import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { IErrorPayload } from '../interfaces/payload-msg.interface';
import { ValidationException } from '../exceptions/validationException';
import { CustomInternalServerException } from '../exceptions/customInternalServerException';
import { ParamValidationException } from '../exceptions/paramValidationException';

/**
 * HttpExceptionFilter user for All error payload responce format
 *
 * @example add to app.module
 * @class HttpExceptionFilter
 * @since 1.0.0
 * @version 1.0.0
 */
@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  /**
   * `catch` override method
   *
   * @since 1.0.0
   * @version 1.0.0
   * @override
   * @param  {HttpException} exception
   * @param  {ArgumentsHost} host
   */
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    let errors = [];
    const status = 0 + (exception ? exception.getStatus() : 500);
    let errMsg = '';
    const systemError = [];
    if (exception instanceof ParamValidationException) {
      exception.getResponse()['errors'].forEach((ele) => {
        systemError.push({
          message: `${ele}`,
        });
      });
    } else if (exception instanceof ValidationException) {
      errors = exception.getResponse()?.['errors'] ?? [];
    } else if (exception instanceof CustomInternalServerException) {
      errMsg = 'Failed. Please try again!';
      systemError.push({
        message: `${errMsg}`,
      });
    } else {
      errMsg = exception.message || 'Internal error';
      systemError.push({
        message: `${errMsg}`,
      });
    }

    const payload: IErrorPayload = {
      nonce: Date.now(),
      message: `error`,
      status: status,
      error: {
        fields: {
          count: errors.length,
          errors: errors,
        },
        systems: {
          count: systemError.length,
          errors: systemError,
        },
      },
    };
    response.status(status).json(payload);
  }
}
