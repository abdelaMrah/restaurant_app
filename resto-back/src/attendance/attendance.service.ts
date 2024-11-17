import { Injectable } from '@nestjs/common';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AttendanceService {
  constructor(private readonly prisma:PrismaService){}
  async create(createAttendanceDto: CreateAttendanceDto) {
  try {
    const attendance = await this.prisma.attendance.create({
      data:{
        checkIn:new Date(createAttendanceDto.checkIn).toISOString(),
        checkOut:new Date(createAttendanceDto.checkOut).toISOString(),
        employeeId:createAttendanceDto.employeeId
      }
    })
    return attendance;
  } catch (error) {
    throw error
  }
  }

  findAll() {
    return `This action returns all attendance`;
  }

  findOne(id: number) {
    return `This action returns a #${id} attendance`;
  }

  update(id: number, updateAttendanceDto: UpdateAttendanceDto) {
    return `This action updates a #${id} attendance`;
  }

  remove(id: number) {
    return `This action removes a #${id} attendance`;
  }
}
