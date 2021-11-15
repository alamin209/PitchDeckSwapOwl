import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { AuthDto } from '../dto/auth.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PayloadResponseDTO } from '../../../common/dto/payload-response.dto';
import { DtoValidationPipe } from '../../../common/pipes/dtoValidation.pipe';
import { SignupDto } from '../dto/signup.dto';
import { AuthGuard } from '../../../common/guard/auth.guard';

@ApiTags('auth')
@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/')
  @ApiResponse({ description: 'Successfully loggedin.', status: HttpStatus.OK })
  @ApiBadRequestResponse({ description: 'Validation error' })
  @ApiForbiddenResponse({ description: 'Invalid credentials / inactive' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error.' })
  @ApiBody({ type: AuthDto })
  async auth(@Body(new DtoValidationPipe()) authData: AuthDto) {
    const auth = await this.authService.auth(authData);
    return new PayloadResponseDTO({
      statusCode: HttpStatus.OK,
      message: 'Successfully logged in',
      data: { token: auth },
    });
  }

  @Post('/signup')
  @ApiResponse({ description: 'Signup succeeded.', status: HttpStatus.OK })
  @ApiBadRequestResponse({ description: 'Validation error' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error.' })
  async signup(@Body(new DtoValidationPipe()) signupData: SignupDto) {
    await this.authService.signUp(signupData);
    return new PayloadResponseDTO({
      statusCode: HttpStatus.OK,
      message: 'Signup succeeded',
      data: {},
    });
  }

  @Get('/example')
  @ApiBearerAuth('JWT')
  @UseGuards(AuthGuard)
  async example() {
    return new PayloadResponseDTO({
      statusCode: HttpStatus.OK,
      data: {},
    });
  }
}
