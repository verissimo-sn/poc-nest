import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ErrorsInterceptor } from './shared/interceptors/errors.interceptor';
import { ResponseDataTransformInterceptor } from './shared/interceptors/response-data-transform.interceptor';

async function server() {
  const app = await NestFactory.create(AppModule);

  const interceptors = [new ResponseDataTransformInterceptor()];

  app.useGlobalInterceptors(...interceptors);

  await app.listen(3000);
}
server();
