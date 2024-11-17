import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmployeDto } from './dto/create-employe.dto';
import { UpdateEmployeDto } from './dto/update-employe.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { User } from '@prisma/client';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';
import { CreateAbsenceDto } from 'src/abbsence/dto/create-absence.dto';
import { AbsenceService } from 'src/abbsence/absence.service';
import { AddAbsenceDto } from './dto/add-absence.dto';
import { CreateAdvanceDto } from 'src/advance/dto/create-advance.dto';
import { AdvanceService } from 'src/advance/advance.service';
import { AddAdvanceDto } from './dto/add-advance.dto';
import { AddAttendanceDto } from './dto/add-attendance.dto';
import { AttendanceService } from 'src/attendance/attendance.service';
@Injectable()
export class EmployeService {
  constructor(private readonly prisma:PrismaService,
    private readonly userService:UserService,
    private readonly absenceService:AbsenceService,
    private readonly advandeService:AdvanceService,
    private readonly attendanceService:AttendanceService
  ){}
  async create(createEmployeDto: CreateEmployeDto) {
    try {
      const user =await this.userService.findByEmaail(createEmployeDto.createUserDto.email);
      if(user){
        const employee= await this.prisma.employee.create({
          data:{
            userId:user.id,
            salary:{create:createEmployeDto.salary}
          }
        })
        return employee;
      }
      console.log({user})
      const employee= await this.prisma.employee.create({
        data:{
          user:{
            create:{...createEmployeDto.createUserDto,roleId:+createEmployeDto.createUserDto.roleId}
          },
          salary:{create:createEmployeDto.salary}
        }
      })
      console.log({employee})
      return employee;

    } catch (error) {
      throw error
    }
    //  let user:User;
    // try {
    //    user = await this.userService.create(createEmployeDto.createUserDto);
     
    // } catch (error) {
    //     if(error instanceof PrismaClientKnownRequestError){
    //     if(error.code='P2002'){
    //       user = await this.userService.findByEmaail(createEmployeDto.createUserDto.email)
    //     }
    //     }
    // }
    // // if(!user) throw new NotFoundException();
    // try {
    //   const emoloye =await this.prisma.employee.create({
    //     data:{
    //       userId:user.id,
    //       salary:{
    //         create:{
    //           amount:createEmployeDto.salary.amount,
    //           paidDate:createEmployeDto.salary.paidDate,
    //          }
    //       } 
    //     }
    //   })
    //   return emoloye;
    // } catch (error) {
    //   if(error instanceof PrismaClientKnownRequestError){
    //     throw new ForbiddenException({message:'employe deja existe'})
    //   }
    // }
 
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

  // findOne(id: number) {
  //   return this.prisma.employee.findUnique({
  //     where:{id},
  //     select:{
  //       id:true,
  //       user:{
  //         select:{
  //           id:true,
  //           email:true,
  //           username:true,
  //           status:true,
  //           phone:true,
  //         }
  //       },
  //       salary:true,
  //       advances:true
  //     }
  //   })
  // }


  async getUserAbsences(id:number){
    try {
      const absences=await this.prisma.employee.findUnique({where:{id}}).abscence();
      return absences;
    } catch (error) {
      throw error
    }
  }

  async addUserAbsence(id:number,absenceDto:AddAbsenceDto){
   try {
    const employe = await this.prisma.employee.findUnique({where:{id}});
    if(!employe) throw new NotFoundException();
    const absence =await this.absenceService.create({...absenceDto,employeeId:employe.id})
    return absence;
   } catch (error) {
    throw error;
   }
  }
  async getEmployeAdveance(id:number){
    try {
      const advances=await this.prisma.employee.findUnique({where:{id}}).advances();
      return advances;
    } catch (error) {
      throw error
    }
  }
  async addEmployeAdvande(id:number,advanceDto:AddAdvanceDto){
    try {
      const employe  =await this.prisma.employee.findUnique({where:{id}})
    if(!employe) throw new NotFoundException();
    const advance = await this.advandeService.create({...advanceDto,employeeId:employe.id})
    return advance
    } catch (error) {
      throw error
    }
  }

  async getUserAttendance(id:number){
    try {
      const attendance=await this.prisma.employee.findUnique({where:{id}}).attendance();
      return attendance;
    } catch (error) {
      throw error
    }
  }
  async addEmployeAttendance(id:number,attendanceDto:AddAttendanceDto){
    try {
      const employe  =await this.prisma.employee.findUnique({where:{id}})
    if(!employe) throw new NotFoundException();
    const attendance = await this.attendanceService.create({...attendanceDto,employeeId:employe.id})
    return attendance
    } catch (error) {
      throw error
    }
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

  async getEmployeeWithSalary(){
try {
  const employees  =await this.prisma.employee.findMany({
    include:{
      user:true,
      salary:true,
      abscence:true,
      advances:true,
      attendance:true
    }
  })

  return employees
} catch (error) {
  throw error
}
  }
}












//  interface UpdateEmployeDto2{
//   salary?:{
//     amount?:number,
//     paidDate?:Date
//   },
//   user?:UpdateUserDto
// }