import { SetMetadata } from "@nestjs/common";
import { Permissions } from "../entities/permissions.enum";
export const PERMISSIONS='permissions'
export const Permission = (...permissions:Permissions[])=>SetMetadata(PERMISSIONS,permissions);
