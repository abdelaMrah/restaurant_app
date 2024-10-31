import { Module } from '@nestjs/common';
import { OrderItemService } from './order-item.service';
import { OrderItemController } from './order-item.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserModule } from 'src/user/user.module';

@Module({
  controllers: [OrderItemController],
  providers: [OrderItemService,PrismaService,],
  imports:[UserModule],
})
export class OrderItemModule {}
