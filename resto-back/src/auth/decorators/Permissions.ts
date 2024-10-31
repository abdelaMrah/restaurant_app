import { SetMetadata } from "@nestjs/common";
import { Permissions } from "../entities/permissions.enum";
export const Permission = (...permissions:Permissions[])=>SetMetadata('permissions',permissions);
