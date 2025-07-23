import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { httpsCertificate } from './config/https-certificate';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const options = httpsCertificate();
  const app = await NestFactory.create(
    AppModule,
    options ? { httpsOptions: options } : {},
  );
  const logger = new Logger('bootstrap');
  app.enableCors();
  app.setGlobalPrefix('api');
  const port = process.env.PORT || 3000;
  await app.listen(port);
  logger.log(`Servidor corriendo en el puerto: ${port}`);
}
bootstrap();
