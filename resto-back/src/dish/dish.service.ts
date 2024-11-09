import { Injectable, NotFoundException } from '@nestjs/common';
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
    const item = await this.prisma.menuItem.create({data:createDishDto});
    return item;
  }

 async findAll() {
    return await this.prisma.menuItem.findMany({
      select:{
        id:true,
        name:true,
        price:true,
        description:true,
        imageUrl:true,
        category:{
          select:{
            id:true,
            name:true,
          }
        }
      }
    });
  }
  async getCount(){
    return this.prisma.menuItem.count();
  }

  async findOne(id: number) {
    return await this.prisma.menuItem.findUnique({where:{id}})
  }

 async update(id: number, updateDishDto: UpdateDishDto) {
  try {
    const menu = await this.findOne(id);
    if(!menu) throw new NotFoundException()
      console.log({...updateDishDto,price:+updateDishDto.price})
    
    return await this.prisma.menuItem.update({where:{id},data:{...updateDishDto,price:+updateDishDto.price,categoryId:+updateDishDto.categoryId,updatedAt:new Date().toISOString()}})
    
  } catch (error) {
    
  }
  }

 async remove(id: number) {
    await this.prisma.menuItem.delete({where:{id}})
  }
}
