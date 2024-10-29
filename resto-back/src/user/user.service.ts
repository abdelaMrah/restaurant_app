import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma:PrismaService){}
  async create(createUserDto: CreateUserDto) {
    return await this.prisma.user.create({data:{...createUserDto,roleId:+createUserDto.roleId,startDate:new Date(createUserDto.startDate).toISOString()}});
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

  async findOne(id: number) {
    return await this.prisma.user.findUnique({where:{id}})
  }
  async findByEmaail(email:string){
    console.log({email})
    const user =await this.prisma.user.findUnique({where:{email}})
    return user


  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    console.log({id,updateUserDto})
    const update =await this.prisma.user.update({where:{id},data:{...updateUserDto,roleId:+updateUserDto?.roleId,updatedAt:new Date().toISOString()}})
    console.log({update})
    return update
  }

  async remove(id: number) {
    return await this.prisma.user.delete({where:{id}})
  }
}
