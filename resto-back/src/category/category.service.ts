import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma:PrismaService){}
  create(createCategoryDto: CreateCategoryDto) {
    return this.prisma.category.create({data:createCategoryDto})
  }

 async findAll() {
    return await this.prisma.category.findMany();
  }

 async findOne(id: number) {
    return await this.prisma.category.findUnique({
      where:{
        id
      }
    });
  }

 async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return  await this.prisma.category.update({
      where:{id},
      data:{...updateCategoryDto,updatedAt:new Date()}
    })
  }

 async remove(id: number) {
   await this.prisma.category.delete({where:{id}})
  }
}
