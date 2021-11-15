import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class AuthDto {
  @ApiProperty({
    type: String,
    description: 'Email Address',
    default: 'email@gmail.com',
  })
  @MaxLength(200)
  @MinLength(10)
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    type: String,
    description: 'User Password',
    default: '123456',
  })
  @MaxLength(200)
  @MinLength(6)
  @IsString()
  @IsNotEmpty()
  password: string;
}
