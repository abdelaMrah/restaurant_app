import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
 import { DishModule } from './dish/dish.module';
import { OrderModule } from './order/order.module';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { OrderItemModule } from './order-item/order-item.module';
 import { AuthModule } from './auth/auth.module';

import { EmployeModule } from './employe/employe.module';
import { AbdcenceModule } from './abbsence/absence.module';
import { AdvanceModule } from './advance/advance.module';
import { PermissionsMiddleware } from './permissions/permissions.middleware';
import { AttendanceModule } from './attendance/attendance.module';
import { WorkdayModule } from './workday/workday.module';
import { CacheModule } from '@nestjs/cache-manager';
import { AnalyticsModule } from './analytics/analytics.module';
 
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true
    }),
    DishModule,
    OrderModule,
    UserModule,
    CategoryModule,
    PrismaModule, 
    OrderItemModule,AuthModule,
    EmployeModule, 
    AbdcenceModule,
    AdvanceModule,
    AttendanceModule,
    WorkdayModule,
    CacheModule.register({
      isGlobal:true,
      store:'memory',
      max:100
    }),
    AnalyticsModule
  ],
  providers: [
    
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(PermissionsMiddleware)
      .forRoutes('*')
  }
}
