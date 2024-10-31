import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { DishService } from './dish.service';
import { CreateDishDto } from './dto/create-dish.dto';
import { UpdateDishDto } from './dto/update-dish.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/guard/role.guard';
import { Role } from 'src/auth/decorators/Roles';
import { Roles } from 'src/auth/entities/role.enum';
import { PermissionGuard } from 'src/auth/guard/permission.guard';
import { Permission } from 'src/auth/decorators/Permissions';
import { Permissions } from 'src/auth/entities/permissions.enum';
 
@UseGuards(AuthGuard('jwt'),PermissionGuard)
@Role(Roles.ADMIN,Roles.SERVER,Roles.COOK,Roles.MANAGER) 
@Controller('dish')
export class DishController {
  constructor(private readonly dishService: DishService) {}
  
  @Permission(Permissions.MANAGE_MENU)
  @Post()
  create(@Body() createDishDto: CreateDishDto) {
    return this.dishService.create(createDishDto);
  }

  @Permission(Permissions.VIEW_MENU,)
  @Get()
  findAll() {
    return this.dishService.findAll();
  }

  @Permission(Permissions.VIEW_MENU)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dishService.findOne(+id);
  }

  @Permission(Permissions.MANAGE_MENU)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDishDto: UpdateDishDto) {
    return this.dishService.update(+id, updateDishDto);
  }

  @Permission(Permissions.MANAGE_MENU)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dishService.remove(+id);
  }
}
