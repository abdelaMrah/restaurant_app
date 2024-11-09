import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { RolesGuard } from 'src/auth/guard/role.guard';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/entities/role.enum';
import { Role } from 'src/auth/decorators/Roles';
import { Permission } from 'src/auth/decorators/Permissions';
import { Permissions } from 'src/auth/entities/permissions.enum';
import { PermissionGuard } from 'src/auth/guard/permission.guard';
 
@UseGuards(AuthGuard('jwt'),RolesGuard,PermissionGuard)
@Role(Roles.ADMIN,Roles.USER) 
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Permission(Permissions.MANAGE_MENU)
  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  findAll() {
    return this.categoryService.findAll();
  }
  @Get('count')
  getCount(){
    return this.categoryService.getCount();
  }
  //les menuItems groupes par les categorie
  @Get('categoyMenu')
  getCategoyMenu(){
    return this.categoryService.getCategorisMenu()
  }
  // les 10 plat plus polulaire
  @Get('mostMenuItemPopular')
  async getMostMenuItemPopular(){
    const res =await this.categoryService.mostMenuItemPopular()
    const data= JSON.parse(res)
    const maxOrders = Math.max(...data?.map(plate => Number(plate.total_orders)));
    const maxPrice = Math.max(...data?.map(plate => plate.price));

    // Calculer la popularité pour chaque plat
    return data.map(plate => {
        const popularity = (Number(plate.total_orders) / maxOrders) * (plate.price / maxPrice)*100;
        return {
            ...plate,
            popularity: popularity.toFixed(4) 
        };
    });
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.update(+id, updateCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }
}
