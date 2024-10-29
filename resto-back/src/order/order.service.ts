import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrderService {
  constructor(private readonly prisma:PrismaService){}
  async create(createOrderDto: CreateOrderDto) {
     return await this.prisma.order.create({data:{
      ...createOrderDto,
      type:'dine_in',
      orderItems:{
        createMany:{
          data:createOrderDto.items.map((item)=>{
            return {
              menuItemId:item.dishId,
              quantity:item.quantity
            }
          })
        },

      }
      
     }})
  }

  async findAll() {
    return await this.prisma.order.findMany();
  }

  async findOne(id: number) {
    // return await this.prisma.order.findUnique({where:{id},select:{
    //   id:true,
    //   user:{
    //     select:{
    //       id:true,
    
    //     }
    //   },
    //   items:true,
    //   createAt:true,
    // }})
    return ''
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    return ''
    // return await this.prisma.order.update({where:{id},data:{
    //   updatedAt:new Date(),
    //   items:{
    //     update:updateOrderDto.items.map((item)=>{
    //       return {
    //         where:{id:item.id},
    //         data:item
    //       }
    //     })
    //   },
      
    // },include:{
    //   items:true
    // }})
  }

  async remove(id: number) {
    // const orderItems = this.prisma.order.findUnique({where:{id}}).items()
    // const res = await Promise.all((await orderItems).map((oreder)=>{
    //   return this.prisma.orderItem.delete({where:{id:oreder.id}})
    // }))
     await this.prisma.order.delete({where:{id},})
  }
}
