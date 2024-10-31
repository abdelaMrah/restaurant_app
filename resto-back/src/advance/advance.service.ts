import { Injectable } from '@nestjs/common';
import { CreateAdvanceDto } from './dto/create-advance.dto';
import { UpdateAdvanceDto } from './dto/update-advance.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AdvanceService {
  constructor(private readonly prisma:PrismaService){}
  async create(createAdvanceDto: CreateAdvanceDto) {
    const advence = await this.prisma.advance.create({
      data:{
        ...createAdvanceDto,
        requestDate:new Date(createAdvanceDto.requestDate),
        
      }
    })
    return advence;
  }

  async findAll({employeId}:{employeId?:string|undefined}) {
    let filter:{} = undefined
    if(employeId){
      filter={
        ...filter,
        employeId:+employeId
      }
    }
    const advences = await this.prisma.advance.findMany({
      where:filter
    })
    return advences
  }
  

  findOne(id: number) {
    return `This action returns a #${id} advance`;
  }

  update(id: number, updateAdvanceDto: UpdateAdvanceDto) {
    return `This action updates a #${id} advance`;
  }

  remove(id: number) {
    return `This action removes a #${id} advance`;
  }
}
