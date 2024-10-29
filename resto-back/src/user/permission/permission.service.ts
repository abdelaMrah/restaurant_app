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
           include:{
            rolePermissions:{
                where:{
                    roleId
                },
                select:{
                    permission:true
                }
            }
           }
        })
        return permission;
    }
    async getPermissionByRoleId(roleId:number){
        return this.prisma.rolePermission.findMany({
            where:{
                roleId
            },
            include:{
                permission:true
            }
        })
    }
    async createPermission(createPermissionDto:createPermissionDto){
       return await this.prisma.permission.create({data:createPermissionDto})
    }
    async deletePermission(id:number){
        await this.prisma.permission.delete({where:{id}})
    }
}
