/* eslint-disable prettier/prettier */
import { SetMetadata } from "@nestjs/common";
import { Roles } from "../entities/role.enum";
export const Role = (...roles:Roles[])=>SetMetadata('roles',roles);
