import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor
} from '@nestjs/common';
import { Observable, timer, throwError } from 'rxjs';
import { delay, catchError, switchMap } from 'rxjs/operators';

@Injectable()
export class DelayInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError(error => {
        return timer((Math.random() + 1) * 1000).pipe(
          switchMap(() => throwError(error))
        );
      }),
      delay((Math.random() + 1) * 1000)
    );
  }
}
