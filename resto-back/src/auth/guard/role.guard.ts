import { CanActivate,Injectable,ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Roles } from "../entities/role.enum";
import { Request } from "express";
import { User } from "@prisma/client";
import { PermissionService } from "src/user/permission/permission.service";
@Injectable()
 export class RolesGuard implements CanActivate{
    constructor(
      private reflector:Reflector,
      private readonly permissionService:PermissionService,
     ) {
     }
     async canActivate(context: ExecutionContext){
      const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic',[context.getHandler(),context.getClass()]);
       const requireRoles=this.reflector.getAllAndOverride<Roles[]>('roles',[context.getHandler(),context.getClass()]);
       if(isPublic) return true
      
      const request:Request = context.switchToHttp().getRequest();
      
      const user =request['user'] as User
      const userRole = await this.permissionService.getRoleId(user.roleId);
      if(!requireRoles|| requireRoles.length==0) return false;
      const permissions = await this.permissionService.getPermissionByRoleId(user?.roleId);
      const roleExist = requireRoles.some((role)=>role.includes(userRole.name.toLowerCase()));
      console.log({requireRoles,role:userRole.name})
      if(requireRoles){
          return requireRoles.some((role)=>role.includes(userRole.name.toLowerCase()))
      }
         // if(userRole) return requireRoles.some((role:Roles)=>role.includes(userRole))
        //  if(user){
        //  //@ts-ignore
        //   if(requireRoles.some(role=>request.user.role.includes(role)|| request.user.role.includes('admin'))) return true;
        //     throw new HttpException(`you are not ${requireRoles }`,HttpStatus.UNAUTHORIZED)
         //  }
        return true
     }
    
}