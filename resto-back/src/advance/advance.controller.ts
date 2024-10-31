import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { AdvanceService } from './advance.service';
import { CreateAdvanceDto } from './dto/create-advance.dto';
import { UpdateAdvanceDto } from './dto/update-advance.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/guard/role.guard';
import { PermissionGuard } from 'src/auth/guard/permission.guard';
import { Role } from 'src/auth/decorators/Roles';
import { Roles } from 'src/auth/entities/role.enum';
import { Permission } from 'src/auth/decorators/Permissions';
import { Permissions } from 'src/auth/entities/permissions.enum';

@UseGuards(AuthGuard('jwt'),RolesGuard,PermissionGuard)
@Role(Roles.ADMIN,Roles.MANAGER)
@Permission(Permissions.MANAGE_STAFF,Permissions.MANAGE_INVENTORY)
@Controller('advance')
export class AdvanceController {
  constructor(private readonly advanceService: AdvanceService) {}

  @Post()
  create(@Body() createAdvanceDto: CreateAdvanceDto) {
    return this.advanceService.create(createAdvanceDto);
  }

  @Get()
  findAll(@Query('empoyeId') employeId?:string) {
    return this.advanceService.findAll({employeId});
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.advanceService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdvanceDto: UpdateAdvanceDto) {
    return this.advanceService.update(+id, updateAdvanceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.advanceService.remove(+id);
  }
}
