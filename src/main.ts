import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpErrorFilter } from './shared/filters/errors.filter';
import { ResponseDataTransformInterceptor } from './shared/interceptors/response-data-transform.interceptor';

async function server() {
  const app = await NestFactory.create(AppModule);

  const interceptors = [new ResponseDataTransformInterceptor()];
  const filters = [new HttpErrorFilter()];

  app.useGlobalFilters(...filters);
  app.useGlobalInterceptors(...interceptors);

  await app.listen(3000);
}
server();
