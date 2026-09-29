import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Observable, tap } from 'rxjs';

@Injectable()
export class TraceabilityInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
        const request = context.switchToHttp().getRequest();
        const response = context.switchToHttp().getResponse();

        const correlationId = request.headers['x-correlation-id'] || randomUUID();

        request.correlationId=correlationId;

        response.setHeader('x-correlation-id',correlationId);

        const startTime=Date.now()

        return next.handle().pipe(
            tap(()=>{
                const duration=Date.now()-startTime;

                const method=request.method;
                const url= request.originalUrl || request.url;
                const statusCode= response.statusCode;

                console.log(
                `[TRACE] [${method} ${url}] [${statusCode} OK] [Duration: ${duration}ms] [Correlation: ${correlationId}]`
                )
            })
        )
    }

}
