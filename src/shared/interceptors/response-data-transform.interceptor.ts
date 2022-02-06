import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  data: T;
}

@Injectable()
export class ResponseDataTransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    const [, response] = context.getArgs();

    const { url, method } = response.req.res.req;
    const { statusCode } = response.req.res;

    return next.handle().pipe(
      map((data) => {
        return {
          statusCode,
          method,
          url,
          error: null,
          data: data ? data : [],
        };
      }),
    );
  }
}
