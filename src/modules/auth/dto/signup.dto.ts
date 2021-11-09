import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class SignupDto {
  @ApiProperty({ type: String, description: 'Name' })
  @MaxLength(200)
  @MinLength(3)
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ type: String, description: 'Nick Name' })
  @MaxLength(200)
  @MinLength(2)
  @IsString()
  @IsNotEmpty()
  nickName: string;

  @ApiProperty({ type: String, description: 'Email Address' })
  @MaxLength(200)
  @MinLength(10)
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ type: String, description: 'Password' })
  @MaxLength(200)
  @MinLength(6)
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ type: String, description: 'Address' })
  @IsString()
  address: string;

  @ApiProperty({ type: String, description: 'Phone Number' })
  @IsString()
  phoneNumber: string;
}
