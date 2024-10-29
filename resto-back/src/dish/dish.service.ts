import { Injectable } from '@nestjs/common';
import { CreateDishDto } from './dto/create-dish.dto';
import { UpdateDishDto } from './dto/update-dish.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DishService {
  /**
   *
   */
  constructor(private readonly prisma:PrismaService) {}
 async create(createDishDto: CreateDishDto) {
    return await this.prisma.menuItem.create({data:createDishDto}) 
  }

 async findAll() {
    return await this.prisma.menuItem.findMany({
      select:{
        id:true,
        name:true,
        price:true,
        description:true,
        category:{
          select:{
            id:true,
            name:true,
          }
        }
      }
    });
  }

  async findOne(id: number) {
    return await this.prisma.menuItem.findUnique({where:{id}})
  }

 async update(id: number, updateDishDto: UpdateDishDto) {
    return await this.prisma.menuItem.update({where:{id},data:{...updateDishDto,updatedAt:new Date()}})
  }

 async remove(id: number) {
    await this.prisma.menuItem.delete({where:{id}})
  }
}
