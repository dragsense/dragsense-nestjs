import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Dragsense')
    .setDescription('The dragsense API')
    .setVersion('1.0')
    .addTag('dragsense')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, documentFactory);

  app.useGlobalPipes(new ValidationPipe());

  app.use(cookieParser());

  app.enableCors({
    origin: 'http://localhost:4200',
    credentials: true, 
  });

  app.setGlobalPrefix('v1/api');

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
