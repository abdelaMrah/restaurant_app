import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { PermissionService } from 'src/user/permission/permission.service';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService,PrismaService,PermissionService],
})
export class CategoryModule {}
