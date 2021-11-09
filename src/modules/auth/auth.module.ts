import { Module } from '@nestjs/common';
import { AdminAuthService } from './services/auth.service';
import { AdminAuthController } from './controllers/auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../../common/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [AdminAuthController],
  providers: [AdminAuthService],
})
export class AuthModule {}
