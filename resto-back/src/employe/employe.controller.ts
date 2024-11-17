import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe } from '@nestjs/common';
import { EmployeService } from './employe.service';
import { CreateEmployeDto } from './dto/create-employe.dto';
import { UpdateEmployeDto } from './dto/update-employe.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/guard/role.guard';
import { Role } from 'src/auth/decorators/Roles';
import { Roles } from 'src/auth/entities/role.enum';
import { PermissionGuard } from 'src/auth/guard/permission.guard';
import { Permission } from 'src/auth/decorators/Permissions';
import { Permissions } from 'src/auth/entities/permissions.enum';
import { AddAbsenceDto } from './dto/add-absence.dto';
import { AddAdvanceDto } from './dto/add-advance.dto';
import { AddAttendanceDto } from './dto/add-attendance.dto';

@Controller('employe')
export class EmployeController {
  constructor(private readonly employeService: EmployeService) {}
  @UseGuards(AuthGuard('jwt'),PermissionGuard)
  @Permission(Permissions.MANAGE_STAFF)
  @Get('with-salary-details')
  getUserWithSalary(){
    return this.employeService.getEmployeeWithSalary();
  }
  @Post()
  create(@Body() createEmployeDto: CreateEmployeDto) {
    console.log({createEmployeDto})
    return this.employeService.create(createEmployeDto);
  }

  @Get()
  findAll() {
    return this.employeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    // return this.employeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEmployeDto: UpdateEmployeDto) {
    return this.employeService.update(+id, updateEmployeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeService.remove(+id);
  }
  @Get(':id/absence')
  getEmloyeAbsence(@Param('id',ParseIntPipe) id:number){
    return this.employeService.getUserAbsences(id);
  }
  @Post(':id/absence')
  addEmloyeAbsence(@Param('id',ParseIntPipe) id:number,@Body() absenceDto:AddAbsenceDto){
    return this.employeService.addUserAbsence(id,absenceDto);
  }
  @Get(':id/advances')
  getEmloyeAdvance(@Param('id',ParseIntPipe) id:number){
    return this.employeService.getEmployeAdveance(id);
  }
  @Post(':id/advance')
  addEmloyeAdvance(@Param('id',ParseIntPipe) id:number,@Body() advanceDto:AddAdvanceDto){
    return this.employeService.addEmployeAdvande(id,advanceDto);
  }
  @Get(':id/attendance')
  getEmloyeAttendance(@Param('id',ParseIntPipe) id:number){
    return this.employeService.getUserAttendance(id);
  }
  @Post(':id/attendance')
  addEmloyeAttendance(@Param('id',ParseIntPipe) id:number,@Body() attendanceDto:AddAttendanceDto){
    return this.employeService.addEmployeAttendance(id,attendanceDto);
  }
}
