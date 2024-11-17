import { Module } from '@nestjs/common';
import { WorkDayService } from './workday.service';
import { WorkDayController } from './workday.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports:[ScheduleModule.forRoot()],
  providers: [WorkDayService,PrismaService],
  controllers: [WorkDayController]
})
export class WorkdayModule {}
