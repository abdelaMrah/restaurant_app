import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, NotFoundException, ParseIntPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { CreateRoleDto, RoleService, UpdateRoleDto } from './role/role.service';
import { PermissionGuard } from 'src/auth/guard/permission.guard';
import { Permission } from 'src/auth/decorators/Permissions';
import { Permissions } from 'src/auth/entities/permissions.enum';
import { getUser } from 'src/auth/decorators/get-user.decorator';
import { User } from '@prisma/client';
import { PermissionService } from './permission/permission.service';
import { Role } from 'src/auth/decorators/Roles';
import { Roles } from 'src/auth/entities/role.enum';
import { RolesGuard } from 'src/auth/guard/role.guard';
 
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService,private readonly roleService:RoleService,
    private readonly permissionService:PermissionService
  ) {}

  @UseGuards(AuthGuard('jwt'),PermissionGuard)
  @Permission(Permissions.MANAGE_STAFF)
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @UseGuards(AuthGuard('jwt'),)
  @Permission(Permissions.MANAGE_STAFF)
  @Get()
  findAll() {
    return this.userService.findAll();
  }
 
 

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.userService.findOne(+id);
  // }

  @UseGuards(AuthGuard('jwt'),PermissionGuard)
  @Permission(Permissions.MANAGE_STAFF)
  // @Role(Roles.ADMIN) 
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
     return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  } 

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  async getMe(@getUser() user:User){
     const me = await this.userService.getMe(23);
    if(!me){
      return new NotFoundException()
    }
    return me
  }
  // @UseGuards(AuthGuard('jwt'),PermissionGuard)
  // @Permission(
  //   Permissions.MANAGE_STAFF,
  //   Permissions.MANAGE_INVENTORY,
  //   Permissions.MANAGE_MENU,
  //   Permissions.TAKE_ORDERS,
  //   Permissions.VIEW_REPORTS,
  //   Permissions.UPDATE_INVENTORY,
  //   Permissions.VIEW_MENU
  // )
  @Get('permissions')
  getPermissions(){
    return this.roleService.getPermissions();
  }
  @UseGuards(AuthGuard('jwt'))
  @Get('permissions/role')
  async getPermissionsByRole(@getUser() user:User ){
    const permissions = await this.permissionService.getPermissionByRoleId(user.roleId);
    return permissions
  }

  @Get('roles')
  getRoles(){
    return this.roleService.getRoles();
  }
  @Post('roles')
  createRole(@Body() createRoleDto:CreateRoleDto){
     return this.roleService.createRole(createRoleDto);
  }
  @Delete('roles/:id')
  deleteRole(@Param('id',ParseIntPipe) id:number){
    return this.roleService.deleteRole(id); 
  }

  @Patch('roles/:id')
  async updateRole(@Param('id') id:string,@Body() updateRoleDto:UpdateRoleDto){
     return await this.roleService.updateRole(+id,updateRoleDto);
  }


}
