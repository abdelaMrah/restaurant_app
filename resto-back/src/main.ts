import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { PermissionsMiddleware } from './permissions/permissions.middleware';
import { PermissionsInterceptor } from './permissions/permissions.interceptor';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    // credentials:true,
    origin:"http://localhost:5173"
  });
  app.useGlobalInterceptors(new PermissionsInterceptor(app.get(Reflector)));

  app.use(cookieParser());
  await app.listen(3000);
}
bootstrap();
