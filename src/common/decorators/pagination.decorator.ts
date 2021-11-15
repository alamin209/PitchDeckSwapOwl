import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Pagination = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const { page = 1, limit = 10 } = request.query;
    let pageNo = parseInt(String(page)) || 1;
    if (pageNo < 1) pageNo = 1;
    const limitData = parseInt(String(limit)) || 10;
    const skip = (pageNo - 1) * limitData;
    return {
      page: pageNo,
      limit: limitData,
      skip: skip,
    };
  },
);
