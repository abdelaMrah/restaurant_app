import { ExecutionContext, SetMetadata } from "@nestjs/common";
import { ExecutionContextHost } from "@nestjs/core/helpers/execution-context-host";
import { User } from "@prisma/client";
import { getUser } from "./get-user.decorator";
import { Request } from "express";
 
export const user = ( ctx:ExecutionContext)=>{
  const request:Request=ctx.switchToHttp().getRequest();
  //@ts-ignore
  return SetMetadata('user',request.user)
}
