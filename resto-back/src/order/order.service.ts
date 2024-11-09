import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createOrderDto: CreateOrderDto) {
    return await this.prisma.order.create({
      data: {
        ...createOrderDto,
        type: 'dine_in',
        orderItems: {
          createMany: {
            data: createOrderDto.orderItems.map((item) => {
              return {
                menuItemId: item.dishId,
                quantity: item.quantity,
              };
            }),
          },
        },
      },
    });
  }

  async findAll({ params }) {
    console.log(params);
    return await this.prisma.order.findMany({
      where: { ...params },
      // where:{},
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        orderItems: {
          select: {
            menuItem: {
              select: {
                name: true,
                id: true,
                description: true,
                price: true,
                orderItem: {
                  select: {
                    quantity: true,
                  },
                },
              },
            },
          },
        },
      },
    });
  }
  
  async findAllFiltred({
    page = 0,
    pageSize = 10,
    filter = [],
    sorted='desc'
  }: {
    params?: Record<string, any>;
    page?: number;
    pageSize?: number;
    filter?: Record<string, any>[];
    sorted?:'desc'|'asc'
  }) {
   
    const count = await this.prisma.order.count({
      
    })
    console.log({page,pageSize})
    
    const orders= await this.prisma.order.findMany({  
      where: {  status:{notIn:['IN_PROGRESS',]}, },
      take: +pageSize,
      skip: +pageSize *( +page),
      orderBy: {
        createdAt: sorted,
      },
      include: {
        orderItems: {
          select: {
            menuItem: {
              select: {
                name: true,
                id: true,
                description: true,
                price: true,
                orderItem: {
                  select: {
                    quantity: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    
    return {
      count,
      data:orders,
    }
  }

  async findOne(id: number) {
    try {
      const order = await this.prisma.order.findUnique({ where: { id } });
      if (!order) throw new NotFoundException();
      return order;
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    return '';
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
    try {
      console.log({ id });
      const order = await this.findOne(id);
      console.log({ order });
      if (!order) throw new NotFoundException();
      await this.prisma.order.delete({ where: { id } });
    } catch (error) {
      throw error;
    }
  }
}
 