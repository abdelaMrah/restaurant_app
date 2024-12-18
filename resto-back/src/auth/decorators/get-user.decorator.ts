import { ExecutionContext,  createParamDecorator } from "@nestjs/common";
  import { Request } from "express";
  export const getUser = createParamDecorator(
    (_data: unknown, ctx: ExecutionContext) => {
      const request:Request = ctx.switchToHttp().getRequest();
      //@ts-ignore
         //@ts-ignore
        return request.user;
    },
  );