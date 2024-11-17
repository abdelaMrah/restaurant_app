import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { tap } from 'rxjs/operators';
import { PERMISSIONS} from '../auth/decorators/Permissions';
import { Response } from 'express';

@Injectable()
export class PermissionsInterceptor implements NestInterceptor {
  constructor(private readonly reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const handler = context.getHandler(); 
    const permissions=this.reflector.getAllAndOverride<Permissions[]>(PERMISSIONS,[context.getHandler(),context.getClass()])

    // const permissions = this.reflector.get<PermissionStatus[]>(PERMISSIONS, handler); 

    const response:Response =context.switchToHttp().getResponse()
    if (permissions) {
        response.setHeader('x-Permissions', permissions.join(', '));
    }

    return next.handle()
  }
}
