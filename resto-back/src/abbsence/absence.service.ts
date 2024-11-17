import { Injectable } from '@nestjs/common';
import { CreateAbsenceDto } from './dto/create-absence.dto';
import { UpdateAbdcenceDto } from './dto/update-absence.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Abcence } from './entities/absence.entity';
@Injectable()
export class AbsenceService {
  constructor(private readonly prisma :PrismaService){}
  async create(createAbdcenceDto: CreateAbsenceDto) {
    const abscence = await this.prisma.absence.create({
    data:{
      ...createAbdcenceDto,
      date:new Date(createAbdcenceDto.date)
    }
    })
    return abscence
  }

  async findAll({userId}:{userId?:string|undefined}):Promise<Abcence>{
    let filter:{} = undefined
    if(userId){
      filter={
        ...filter,
        userId:+userId
      }
    }
      const abscences  =await this.prisma.absence.findMany({
        where:filter
      })
      return abscences;
    
   
  }

  async findOne(id: number) {
    const abscence = await this.prisma.absence.findUnique({
      where:{id}
    })
    return abscence;
  }

  async update(id: number, updateAbdcenceDto: UpdateAbdcenceDto) {
    const absence = await this.prisma.absence.update({
      where:{id},
      data:{
        reason:updateAbdcenceDto.reason,

      }
    })
    return absence;
  }

  async remove(id: number) {
    await this.prisma.absence.delete({where:{id}})
  }
}
