import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { HttpExceptionFilter } from './common/filter/http-exception.filter';
import { PayloadLoggingInterceptor } from './common/interceptors/payload-logging.interceptor';
import { AuthModule } from './modules/auth/auth.module';
export const ModuleList = [AuthModule];
@Module({
  imports: [MongooseModule.forRoot(process.env.MONGO_URL), ...ModuleList],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: PayloadLoggingInterceptor,
    },
  ],
})
export class AppModule {}
