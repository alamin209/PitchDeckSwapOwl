import { ForbiddenException, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { AuthDto } from '../dto/auth.dto';
import { SignupDto } from '../dto/signup.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../../../common/schemas/user.schema';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { CustomException } from '../../../common/exceptions/customException';
import { ValidationException } from '../../../common/exceptions/validationException';
import { USER_JWT_SECRET } from '../../../common/configs/config';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  async auth(auth: AuthDto): Promise<boolean> {
    try {
      //find user with email
      const user = await this.userModel.findOne({ email: auth.email });

      //if not found throw an error
      if (!user) throw new ForbiddenException('Invalid Credentials');

      //if inactive then throw an error
      if (user.status === 0) {
        throw new ForbiddenException(
          'You are inactive, please contact with admin',
        );
      }

      //check password is valid
      const match = await bcrypt.compare(auth.password, user.password);

      //if not match then throw an error
      if (!match) throw new ForbiddenException('Invalid Credentials');

      //generate jwt token
      return jwt.sign({ id: user._id }, USER_JWT_SECRET);
    } catch (error) {
      throw new CustomException(error);
    }
  }

  async signUp(signupDto: SignupDto): Promise<void> {
    try {
      //find existing email
      const findUser = await this.userModel.findOne({ email: signupDto.email });
      //existing check
      if (findUser) {
        //throw existing exception
        throw new ValidationException([
          {
            field: 'name',
            message: 'Email already exists.',
          },
        ]);
      }

      //salt generate
      const salt = bcrypt.genSaltSync(10);

      //password hashing
      const password = bcrypt.hashSync(signupDto.password, salt);

      //modal create
      const user = new this.userModel({
        name: signupDto.name,
        nickName: signupDto.nickName,
        email: signupDto.email,
        password,
        address: signupDto.address,
        regDate: new Date(),
      });

      //save user data
      await user.save();
    } catch (error) {
      throw new CustomException(error);
    }
  }
}
