import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule, ModuleList } from '../app.module';
import { AuthModule } from '../modules/auth/auth.module';

export default async function swagger(app) {
  const config = new DocumentBuilder()
    .setTitle('Swap Application')
    .setDescription('The Swap API description')
    .setVersion('1.0')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'JWT',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    include: ModuleList,
  });
  SwaggerModule.setup('api-doc/', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });
}
