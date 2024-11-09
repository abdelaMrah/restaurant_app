import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/guard/role.guard';
import { Role } from 'src/auth/decorators/Roles';
import { Roles } from 'src/auth/entities/role.enum';
import { PermissionGuard } from 'src/auth/guard/permission.guard';
import { Permission } from 'src/auth/decorators/Permissions';
import { Permissions } from 'src/auth/entities/permissions.enum';
import { filter } from 'rxjs';

@UseGuards(AuthGuard('jwt'),RolesGuard,PermissionGuard)
@Role(Roles.ADMIN,Roles.SERVER,Roles.MANAGER)
@Permission(Permissions.TAKE_ORDERS,Permissions.MANAGE_INVENTORY)
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Permission(Permissions.TAKE_ORDERS)
  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    console.log({createOrderDto})
    return this.orderService.create(createOrderDto);
  }

  @Permission(Permissions.TAKE_ORDERS,Permissions.MANAGE_INVENTORY)
  @Get()
  findAll(@Query() params?:any) {
    console.log({params})
    return this.orderService.findAll({params});
  }
  @Permission(Permissions.TAKE_ORDERS,Permissions.MANAGE_INVENTORY)
  @Get('filtred')
  findAllWithFilter(@Query() params?:any) {
    console.log({filter:params})
     return this.orderService.findAllFiltred({...params});
  }
  @Permission(Permissions.TAKE_ORDERS)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(+id);
  }

  @Permission(Permissions.TAKE_ORDERS)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(+id, updateOrderDto);
  }
  @Permission(Permissions.TAKE_ORDERS)
  @Delete(':id') 
  remove(@Param('id') id: string) { 
    return this.orderService.remove(+id);
  }
}
