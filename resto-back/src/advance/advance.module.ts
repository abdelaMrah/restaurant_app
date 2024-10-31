import { Module } from '@nestjs/common';
import { AdvanceService } from './advance.service';
import { AdvanceController } from './advance.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserModule } from 'src/user/user.module';

@Module({
  controllers: [AdvanceController],
  providers: [AdvanceService,PrismaService,],
  imports:[UserModule]
})
export class AdvanceModule {}
