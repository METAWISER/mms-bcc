import { NestFactory, Reflector } from '@nestjs/core';
import {
  ClassSerializerInterceptor,
  Logger,
  ValidationPipe,
} from '@nestjs/common';
import { AppModule } from './app.module';
import { AppConfigService } from './config/app/app-config.service';
import { GraphqlExceptionFilter } from './filters/graphql-exeption.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  const appConfigService: AppConfigService = app.get(AppConfigService);
  const logger = new Logger();

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.useGlobalFilters(new GraphqlExceptionFilter());
  app.setGlobalPrefix('api');
  await app.listen(appConfigService.port, appConfigService.url);
  logger.log(`API running on port ${appConfigService.port}`);
}
bootstrap();
