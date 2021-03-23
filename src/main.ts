import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const isProd = configService.get<string>('NODE_ENV') === 'production';

  if (!isProd) {
    const docConfig = new DocumentBuilder()
      .setTitle('Nest Chat')
      .setDescription('Nest project for learning purpose')
      .setVersion('1.0')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, docConfig);
    SwaggerModule.setup('api-docs', app, document);
  }

  await app.listen(configService.get<number>('PORT'));
}
bootstrap();
