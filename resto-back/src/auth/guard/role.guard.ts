/* eslint-disable prettier/prettier */
import { CanActivate,Injectable,ExecutionContext,  HttpException, HttpStatus } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
// import { Role } from "../entities/role.enum";
import { Roles } from "../entities/role.enum";
import { Request } from "express";
import { User } from "@prisma/client";
@Injectable()
 export class RolesGuard implements CanActivate{
    constructor(private reflector:Reflector) {
     }
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
      const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic',[context.getHandler(),context.getClass()]);
      console.log({isPublic})
      const requireRoles=this.reflector.getAllAndOverride<Roles[]>('roles',[context.getHandler(),context.getClass()]);
       if(isPublic) return true
     
      const request:Request = context.switchToHttp().getRequest();
      
      const user =request['user'] as User
      console.log({user})
      
      if(!requireRoles|| requireRoles.length==0) return false;
      //  const userRole = user?.role;
      // if(userRole) return requireRoles.some((role:Roles)=>role.includes(userRole))
        //  if(user){
        //  //@ts-ignore
        //   if(requireRoles.some(role=>request.user.role.includes(role)|| request.user.role.includes('admin'))) return true;
        //     throw new HttpException(`you are not ${requireRoles }`,HttpStatus.UNAUTHORIZED)
        //   // console.log(user)
        //  }
        return true
     }
    
}