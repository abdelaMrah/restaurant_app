import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { PermissionService } from 'src/user/permission/permission.service';

@Module({
  controllers: [OrderController],
  providers: [OrderService,PrismaService,PermissionService],
})
export class OrderModule {}
