import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  const config = new DocumentBuilder()
    .setTitle('Lmatadesign Resto API')
    .setDescription('API para restaurante Lmatadesign Resto')
    .setVersion('1.0')
    .addTag('lmatadesign-resto-api')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  try {
    await app.listen(process.env.PORT ?? 3000);
  } catch (error) {
    console.log(error);
  }
}

void bootstrap();
