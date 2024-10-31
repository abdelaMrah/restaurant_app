import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

export interface CreateRoleDto{
    name:string;
    description:string;
    permissions?:number[]
}
@Injectable()
export class RoleService {
    constructor(
        private readonly prisma:PrismaService
    ){}
    createRole(createRoleDto:CreateRoleDto){
        return this.prisma.role.create({
            data:{
                name:createRoleDto.name,
                description:createRoleDto.description, 
                rolePermissions:{
                    createMany:{
                        data:createRoleDto.permissions?.map((permissionId)=>{
                            return{
                                permissionId
                            }
                        })
                    }
                }
            }
        })
    }
    getRoles(){
        return this.prisma.role.findMany({
           include:{
            rolePermissions:{
                select:{
                    permission:true
                }
            }
           }
        });
    }
   
    getPermissions(){
        return this.prisma.permission.findMany();
    }
    getRoleId(id:number){
        return this.prisma.role.findUnique({where:{id}})
    }   
    async deleteRole(id:number){
        try {
           
            await this.prisma.role.delete({where:{id}})
        } catch (error) {
            throw error
        }
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
