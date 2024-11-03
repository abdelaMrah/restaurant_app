import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmployeDto } from './dto/create-employe.dto';
import { UpdateEmployeDto } from './dto/update-employe.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { User } from '@prisma/client';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';
@Injectable()
export class EmployeService {
  constructor(private readonly prisma:PrismaService,private readonly userService:UserService){}
  async create(createEmployeDto: CreateEmployeDto) {
    let user:User;
    try {
       user = await this.userService.create(createEmployeDto.createUserDto);
      
     
    } catch (error) {
        if(error instanceof PrismaClientKnownRequestError){
        if(error.code='P2002'){
          user = await this.userService.findByEmaail(createEmployeDto.createUserDto.email)
        }
        }
    }
    if(!user) throw new NotFoundException();
    try {
      const emoloye =await this.prisma.employee.create({
        data:{
          userId:user.id,
          salary:{
            create:{
              amount:createEmployeDto.salary.amount,
              paidDate:createEmployeDto.salary.paidDate,
             }
          } 
        }
      })
      return emoloye;
    } catch (error) {
      if(error instanceof PrismaClientKnownRequestError){
        throw new ForbiddenException({message:'employe deja existe'})
      }
    }
 
  }

  findAll() {
    return this.prisma.employee.findMany({
      select:{
        id:true,
        user:true,
        salary:true
      }
    })
  }

  findOne(id: number) {
    return this.prisma.employee.findUnique({
      where:{id},
      select:{
        id:true,
        user:{
          select:{
            id:true,
            email:true,
            username:true,
            status:true,
            phone:true,
          }
        },
        salary:true,
        advances:true
      }
    })
  }



  remove(id: number) {
    return this.prisma.employee.delete({where:{id}})
  }

  async update(id: number, updateEmployeDto: UpdateEmployeDto) {
    return this.prisma.employee.update({
      where:{id},
      data:{
        salary:{
          update: updateEmployeDto.salary
        },
        user:{
          update:updateEmployeDto.updateUserDto,
          
        },  
      }
    })
  }
}
export interface UpdateEmployeDto2{
  salary?:{
    amount?:number,
    paidDate?:Date
  },
  user?:UpdateUserDto
}