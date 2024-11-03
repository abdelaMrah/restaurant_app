import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

export interface CreateRoleDto{
    name:string;
    description:string;
    permissions?:number[]
}
export type UpdateRoleDto =Partial<CreateRoleDto>
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
   async getUserPermission(roleId:number){
        const permissions = await this.prisma.rolePermission.findMany({
            where:{
                roleId:roleId
            },include:{
                permission:true
            }
        })
        const resPermissions = permissions.reduce((acc:any[],cur)=>{
            acc.push(cur.permission)
            return acc;
        },[])
        return resPermissions;

    }
    getRoleId(id:number){
        return this.prisma.role.findUnique({where:{id}})
    }   
    async deleteRole(id:number){
        try {
            await this.prisma.rolePermission.deleteMany({
                where:{roleId:id}
            });
            await this.prisma.role.delete({
                where:{id},
                // include:{rolePermissions:true}
            })
        } catch (error) {
            throw error
        }
    }
    async getPermissionRole2(roleId){
        return this.prisma.rolePermission.findMany({
            where:{
                roleId
            },
           
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
    async updateRole(id:number,updateRoleDto:UpdateRoleDto){
        await this.prisma.rolePermission.deleteMany({
            where:{
                roleId:id
            }
        });
        console.log({
             id,
            updateRoleDto
        })
        const role =await this.prisma.role.update({
            where:{id:+id},
            data:{
                name:updateRoleDto.name,
                description:updateRoleDto.description,
                rolePermissions:{  
                   createMany:{
                    data:updateRoleDto.permissions.map((permissionId)=>{
                        return{
                            permissionId
                        }
                    })
                   }
                }
            }
        })
        return role
    }
}
