import { CanActivate,Injectable,ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Roles } from "../entities/role.enum";
import { Request } from "express";
import { User } from "@prisma/client";
import { PermissionService } from "src/user/permission/permission.service";
import { Permissions } from "../entities/permissions.enum";
import { PERMISSIONS } from "../decorators/Permissions";
@Injectable()
 export class PermissionGuard implements CanActivate{
    constructor(
      private reflector:Reflector,
      private readonly permissionService:PermissionService,
     ) {
     }
     async canActivate(context: ExecutionContext){
      const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic',[context.getHandler(),context.getClass()]);
      //  const requireRoles=this.reflector.getAllAndOverride<Roles[]>('roles',[context.getHandler(),context.getClass()]);
      const requiredPermissions=this.reflector.getAllAndOverride<Permissions[]>(PERMISSIONS,[context.getHandler(),context.getClass()])
        if(isPublic) return true
        const request:Request = context.switchToHttp().getRequest();
        
        const user =request['user'] as User
        
        const permissions = await this.permissionService.getPermissionByRoleId(user?.roleId);
 
      if(requiredPermissions){
       
        return  requiredPermissions.some((permission)=>{
          
           return permissions.some((userPermission)=>userPermission.permission.name.includes(permission))
        })
     }
     
        return true
     }
    
}