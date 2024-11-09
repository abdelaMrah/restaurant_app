import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule ,} from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { PermissionsMiddleware } from './permissions/permissions.middleware';
import { PermissionsInterceptor } from './permissions/permissions.interceptor';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    // credentials:true,
    origin:"http://localhost:5173"
  });
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads', // Préfixe d'accès aux fichiers
  });
  app.useGlobalInterceptors(new PermissionsInterceptor(app.get(Reflector)));

  app.use(cookieParser());
  await app.listen(3000);
}
bootstrap();
