import 'dotenv/config';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import swagger from './swagger/swagger';
import { DataTransformGlobalPipe } from './common/pipes/dataTransformGlobalPipe';

async function bootstrap() {
  const port = process.env.PORT;
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new DataTransformGlobalPipe());
  app.setGlobalPrefix('api');
  app.enableCors();
  await swagger(app);
  await app.listen(port);
  Logger.log(
    `Server is Running(🔥) on http://localhost:${port}/api/`,
    'SWAP-API',
  );
}
bootstrap();
