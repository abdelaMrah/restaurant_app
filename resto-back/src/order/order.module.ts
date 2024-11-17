import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { PermissionService } from 'src/user/permission/permission.service';
import { OrderItemService } from 'src/order-item/order-item.service';
import { WorkDayService } from 'src/workday/workday.service';

@Module({
  controllers: [OrderController],
  providers: [OrderService,PrismaService,PermissionService,OrderItemService,WorkDayService],
})
export class OrderModule {}
