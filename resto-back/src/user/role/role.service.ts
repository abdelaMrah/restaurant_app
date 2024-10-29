import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RoleService {
    constructor(
        private readonly prisma:PrismaService
    ){}
    getRoles(){
        return this.prisma.role.findMany();
    }
    getRoleId(id:number){
        return this.prisma.role.findUnique({where:{id}})
    }   
    async deleteRole(id:number){
        await this.prisma.role.delete({where:{id}})
    }
    async getPermissionRole2(roleId){
        return this.prisma.rolePermission.findMany({
            where:{
                roleId
            },
            include:{
                permission:true
            }
        })
    }
    async getPermissionRole(id:number){
        return this.prisma.role.findFirstOrThrow({
            where:{id},
            include:{
                rolePermissions:{
                     
                    include:{
                        permission:true
                    },
                  
                }
            },
           
           
        })
    }
}
