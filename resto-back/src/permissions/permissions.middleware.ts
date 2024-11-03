import { Injectable, NestMiddleware,  } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { PERMISSIONS } from '../auth/decorators/Permissions';
import { Reflector } from '@nestjs/core';

@Injectable()
export class PermissionsMiddleware implements NestMiddleware {
  constructor(private readonly reflector: Reflector) {}

  use(req: Request, res: Response, next: NextFunction) {
    const handler = req.route ? req.route.stack[0].handle : null;
    // const h=this.reflector.get<string[]>(PERMISSIONS, handler)
    // const requiredPermissions=this.reflector.getAllAndOverride<Permissions[]>(PERMISSIONS,[context.getHandler(),context.getClass()])
     const permissions = handler
      ? this.reflector.get<string[]>(PERMISSIONS, handler)
      : null;

     if (permissions) {
      res.setHeader('X-Permissions', permissions.join(', '));
    }

    next();
  }
}
