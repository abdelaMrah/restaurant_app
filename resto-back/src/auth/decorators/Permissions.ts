import { SetMetadata } from "@nestjs/common";
import { Roles } from "../entities/role.enum";
export const Permission = (...roles:Roles[])=>SetMetadata('permissions',roles);
