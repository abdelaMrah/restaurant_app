import { Module } from '@nestjs/common';
import { EmployeService } from './employe.service';
import { EmployeController } from './employe.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserModule } from 'src/user/user.module';
import { AbsenceService } from 'src/abbsence/absence.service';
import { AdvanceService } from 'src/advance/advance.service';
import { Attendance } from 'src/attendance/entities/attendance.entity';
import { AttendanceService } from 'src/attendance/attendance.service';

@Module({
  controllers: [EmployeController],
  providers: [EmployeService,PrismaService,AbsenceService,AdvanceService,AttendanceService],
  imports:[UserModule]
})
export class EmployeModule {}
