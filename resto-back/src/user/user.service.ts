import {  Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma:PrismaService){}
  async create(createUserDto: CreateUserDto) {
     return await this.prisma.user.create({data:{...createUserDto,roleId:+createUserDto.roleId,startDate:new Date(createUserDto.startDate)}});
  }
  async getMe(id:number){
     const me =await this.prisma.user.findUnique({
      where:{id},
      select:{
        email:true,
        id:true,
        firstname:true,
        lastname:true,
        phone:true,
        role:{
          select:{
            name:true,
            id:true,
            rolePermissions:{
              include:{
                permission:true
              }
            },
          }
        },
        username:true,
        photoUrl:true,
        status:true,
        employee:{
          select:{
            abscence:{
              select:{
                date:true,
                reason:true
              }
            },
            advances:{
              select:{
                amount:true,
                requestDate:true,
              }
            },
            attendance:{
              select:{
                checkIn:true,
                checkOut:true,
              }
            },
            salary:{
              select:{
                amount:true,
                paidDate:true
              },

            },
            
          }

        }
      }
          
        
      
    })
     return me;
  }
  async countEmployes(){
    return await this.prisma.user.count({
      where:{
        role:{
          name:{
            not:{
              contains:'ADMIN'
            }
          }
        }
      }
    })
  }
  async findAll() {
    return await this.prisma.user.findMany({
      select:{
        id:true,
        email:true,
        role:true,
        username:true,
        firstname:true,
        lastname:true,
        status:true,
        phone:true,
        startDate:true
      }
    });
  }
// async findOne(id:number){
//   return this.prisma.user.findUnique({where:{id}})
// }
  async findByEmaail(email:string){
     const user =await this.prisma.user.findUnique(
      {where:{email,}}
      
    )
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
     const update =await this.prisma.user.update({where:{id},data:{...updateUserDto,roleId:+updateUserDto?.roleId,updatedAt:new Date().toISOString()}})
     return update
  }

  async remove(id: number) {
    return await this.prisma.user.delete({where:{id}})
  }
  
  async getUsersWithSalary(){
    const users = await this.prisma.user.findMany({
      include:{
        employee:{
          include:{
            user:true,
            abscence:true,
            salary:true,
            advances:true
          }
        }
      }
    })
    return users
  }

}
