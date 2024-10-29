import { Module } from '@nestjs/common';
import { DishService } from './dish.service';
import { DishController } from './dish.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { PermissionService } from 'src/user/permission/permission.service';
 
@Module({
  controllers: [DishController],
  providers: [DishService,PrismaService,PermissionService],
  // imports:[UserModule]
})
export class DishModule {}
