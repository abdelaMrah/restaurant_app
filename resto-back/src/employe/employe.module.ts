import { Module } from '@nestjs/common';
import { EmployeService } from './employe.service';
import { EmployeController } from './employe.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserModule } from 'src/user/user.module';

@Module({
  controllers: [EmployeController],
  providers: [EmployeService,PrismaService,],
  imports:[UserModule]
})
export class EmployeModule {}
