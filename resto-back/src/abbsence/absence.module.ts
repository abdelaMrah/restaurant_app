import { Module } from '@nestjs/common';
import { AbsenceService } from './absence.service';
import { AbdcenceController } from './absence.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserModule } from 'src/user/user.module';

@Module({
  controllers: [AbdcenceController],
  providers: [AbsenceService,PrismaService],
  imports:[UserModule]
})
export class AbdcenceModule {}
