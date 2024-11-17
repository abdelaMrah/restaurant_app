import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { OrderItemService } from 'src/order-item/order-item.service';
import { OrderStatus, OrderType } from '@prisma/client';
import { WorkDayService } from 'src/workday/workday.service';
@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService,
    // private readonly orderItemService:OrderItemService
    private readonly workDayService:WorkDayService
  ) {}
  async create(createOrderDto: CreateOrderDto) {
    console.log({workDayId:await this.workDayService.getCurrentWorkDay()})
    return await this.prisma.order.create({
      data: {
        ...createOrderDto,

        workDayId:await this.workDayService.getCurrentWorkDay(),
        type:OrderType[createOrderDto.type],
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
  const order = await this.findOne(id);
  if(!order) throw new NotFoundException();
  const orderItems = updateOrderDto.orderItems
  if(!orderItems) {
  
    return await this.prisma.order.update({where:{id},data:{status:updateOrderDto.status}})
  }
 
  }

  async remove(id: number) {
    try {
       const order = await this.findOne(id);
       if (!order) throw new NotFoundException();
      await this.prisma.order.delete({ where: { id } });
    } catch (error) {
      throw error;
    }
  }
}
 