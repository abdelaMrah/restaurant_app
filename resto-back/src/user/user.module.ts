import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { RoleService } from './role/role.service';
import { PermissionService } from './permission/permission.service';

@Module({
  controllers: [UserController],
  providers: [UserService,
    PrismaService,
    RoleService,
    PermissionService,
    UserService,
    PermissionService
    ],
    exports :[UserService]
})
export class UserModule {}
