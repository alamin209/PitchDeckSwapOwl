import { Controller, Get, HttpStatus, Query, UseGuards } from '@nestjs/common';
import { UserService } from '../services/user.service';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PayloadResponseDTO } from '../../../common/dto/payload-response.dto';
import { AuthGuard } from '../../../common/guard/auth.guard';
import { PaginationDto } from '../../../common/dto/pagination.dto';
import { Pagination } from '../../../common/decorators/pagination.decorator';
import { UserListDto } from '../dto/user-list.dto';

@ApiTags('user')
@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/')
  @ApiResponse({ description: 'Successfully fetched.', status: HttpStatus.OK })
  @ApiForbiddenResponse({ description: 'Invalid credentials' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error.' })
  @ApiBearerAuth('JWT')
  @UseGuards(AuthGuard)
  async user(
    @Query() filter: UserListDto,
    @Pagination() pagination: PaginationDto,
  ) {
    const users = await this.userService.userList(filter, pagination);
    return new PayloadResponseDTO({
      statusCode: HttpStatus.OK,
      data: users[0],
      metadata: {
        page: pagination.page,
        totalCount: users[1],
        limit: pagination.limit,
      },
    });
  }
}
