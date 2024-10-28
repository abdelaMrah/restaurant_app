import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { createPermissionDto } from '../dto/create-permissionDto';

@Injectable()
export class PermissionService {
    constructor(
        private readonly prisma:PrismaService
    ){}

   async getPermissions(){
        return await this.prisma.permission.findMany();
    }
   async getPermissionByRole(roleId:number){
        const permission =await this.prisma.permission.findMany({
            where:{
                rolePermissions:{
                    every:{
                        roleId
                    }
                }
            }
        })
        return permission;
    }
    async createPermission(createPermissionDto:createPermissionDto){
       return await this.prisma.permission.create({data:createPermissionDto})
    }
    async deletePermission(id:number){
        await this.prisma.permission.delete({where:{id}})
    }
}
