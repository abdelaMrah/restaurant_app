import { Module } from '@nestjs/common';
 import { DishModule } from './dish/dish.module';
import { OrderModule } from './order/order.module';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { OrderItemModule } from './order-item/order-item.module';
import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from './auth/auth.module';
import { RolesGuard } from './auth/guard/role.guard';
import { APP_GUARD } from '@nestjs/core';
  
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true
    }),
    DishModule, OrderModule, UserModule, CategoryModule, PrismaModule, OrderItemModule, AuthModule],
  providers: [
    {
      provide:APP_GUARD,
      useClass:RolesGuard,
    }
  ],
})
export class AppModule {}
