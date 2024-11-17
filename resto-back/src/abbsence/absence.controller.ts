import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, ParseIntPipe } from '@nestjs/common';
import { AbsenceService } from './absence.service';
import { CreateAbsenceDto } from './dto/create-absence.dto';
import { UpdateAbdcenceDto } from './dto/update-absence.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/guard/role.guard';
import { Role } from 'src/auth/decorators/Roles';
import { Roles } from 'src/auth/entities/role.enum';
import { PermissionGuard } from 'src/auth/guard/permission.guard';
import { Permission } from 'src/auth/decorators/Permissions';
import { Permissions } from 'src/auth/entities/permissions.enum';
@UseGuards(AuthGuard('jwt'),RolesGuard,PermissionGuard)
@Role(Roles.ADMIN,Roles.MANAGER)
@Permission(Permissions.MANAGE_STAFF)
@Controller('absence')
export class AbdcenceController {
  constructor(private readonly abdcenceService: AbsenceService) {}
  
  @Post() 
  create(@Body() createAbdcenceDto: CreateAbsenceDto) {
    return this.abdcenceService.create(createAbdcenceDto);
  }
  @Role(Roles.ADMIN)
  @Permission(Permissions.MANAGE_MENU)
  @Get()
  findAll(@Query('userId')  userId?:string|undefined) {
    return this.abdcenceService.findAll({userId});
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.abdcenceService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAbdcenceDto: UpdateAbdcenceDto) {
    return this.abdcenceService.update(+id, updateAbdcenceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.abdcenceService.remove(+id);
  }
}
