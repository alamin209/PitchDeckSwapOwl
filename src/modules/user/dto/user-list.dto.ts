import { ApiProperty } from '@nestjs/swagger';
import PaginationBaseDTO from '../../auth/dto/pagination-base.dto';
enum StatusType {
  Active = 1,
  InActive = 0,
}
export class UserListDto extends PaginationBaseDTO {
  @ApiProperty({
    enum: StatusType,
    description: 'Active/Inactive',
    default: '',
    required: false,
  })
  status: number;
}
