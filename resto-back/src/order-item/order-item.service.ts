import { Injectable } from '@nestjs/common';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrderItemService {
  constructor(private readonly prisma:PrismaService){}
  async create(createOrderItemDto: CreateOrderItemDto) {
    // return await this.prisma.orderItem.create({data:createOrderItemDto})
    return ''
  }

  async findAll() {
    return await this.prisma.orderItem.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.orderItem.findUnique({where:{id}})
  }

  async update(id: number, updateOrderItemDto: UpdateOrderItemDto) {
    return await this.prisma.orderItem.update({where:{id},data:{...updateOrderItemDto,updatedAt:new Date()}})
  }

  async remove(id: number) {
    return await this.prisma.orderItem.delete({where:{id}})
  }
}
