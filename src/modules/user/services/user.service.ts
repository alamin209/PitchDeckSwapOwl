import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { SignupDto } from '../dto/signup.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../../../common/schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { CustomException } from '../../../common/exceptions/customException';
import { ValidationException } from '../../../common/exceptions/validationException';
import { UserListDto } from '../dto/user-list.dto';
import { PaginationDto } from '../../../common/dto/pagination.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async userList(
    filter: UserListDto,
    pagination: PaginationDto,
  ): Promise<[UserDocument[], number]> {
    try {
      const whereCondition = {};

      //status filter
      if (filter.status) {
        whereCondition['status'] = filter.status;
      }

      //find users
      const findUsers = await this.userModel.find(
        {
          ...whereCondition,
        },
        {
          password: 0,
        },
        {
          skip: pagination.skip,
          limit: pagination.limit,
        },
      );

      //count user
      const countUser = await this.userModel.count({
        ...whereCondition,
      });

      //return user & count
      return [findUsers, countUser];
    } catch (error) {
      throw new CustomException(error);
    }
  }
}
