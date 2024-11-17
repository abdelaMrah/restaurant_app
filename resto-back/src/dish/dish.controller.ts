import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, BadRequestException, UploadedFile, UploadedFiles, NotFoundException } from '@nestjs/common';
import { DishService } from './dish.service';
import { CreateDishDto } from './dto/create-dish.dto';
import { UpdateDishDto } from './dto/update-dish.dto';
import { diskStorage } from 'multer';
import { Role } from 'src/auth/decorators/Roles';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/entities/role.enum';
import { PermissionGuard } from 'src/auth/guard/permission.guard';
import { Permission } from 'src/auth/decorators/Permissions';
import { Permissions } from 'src/auth/entities/permissions.enum';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
 
@UseGuards(AuthGuard('jwt'),PermissionGuard)
@Role(Roles.ADMIN,Roles.SERVER,Roles.COOK,Roles.MANAGER) 
@Controller('dish')
export class DishController {
  constructor(private readonly dishService: DishService) {}
  
  @Permission(Permissions.MANAGE_MENU)
  @UseInterceptors(FileInterceptor('files', {
    storage: diskStorage({
      destination: './uploads', 
      filename: (req, file, callback) => {
        
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = extname(file.originalname);
        const filename = `menuitem-${uniqueSuffix}${ext}`;
        callback(null, filename);
      },
    }),
    fileFilter: (req, file, callback) => {
      
      if (!file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
        return callback(new BadRequestException('Seuls les fichiers image sont autorisés !'), false);
      }
      callback(null, true);
    },
  }))
  @Post()
  create(@UploadedFile() files:Express.Multer.File,
  @Body() createDishDto: {categoryId:string,name:string,price:string,description?:string,imageUrl?:string}) {
     if(files){
      return this.dishService.create(
        {name:createDishDto.name,
          description:createDishDto?.description,
          categoryId:parseInt(createDishDto.categoryId),
          price:parseInt(createDishDto.price),
          imageUrl:files.filename});
    }
    return new NotFoundException()
  }

  @Permission(Permissions.VIEW_MENU,)
  @Get()
  findAll() {
    return this.dishService.findAll();
  }
  @Get('count')
  getCount(){
    return this.dishService.getCount()
  }
  @Permission(Permissions.VIEW_MENU)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dishService.findOne(+id);
  }

  @Permission(Permissions.MANAGE_MENU)
  @UseInterceptors(FileInterceptor('files', {
    storage: diskStorage({
      destination: './uploads', 
      filename: (_, file, callback) => {
        
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = extname(file.originalname);
        const filename = `menuitem-${uniqueSuffix}${ext}`;
        callback(null, filename);
      },
    }),
    fileFilter: (req, file, callback) => {
      
      if (!file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
        return callback(new BadRequestException('Seuls les fichiers image sont autorisés !'), false);
      }
      callback(null, true);
    },
  }))
  @Permission(Permissions.MANAGE_MENU)
  @Patch(':id')
  update(@Param('id') id: string, @UploadedFile()files:Express.Multer.File, @Body() updateDishDto: UpdateDishDto) {
    if(files){
    return this.dishService.update(+id, {
      ...updateDishDto,
      imageUrl:files.filename});
    }
    
    return this.dishService.update(+id, {...updateDishDto});
  }

  @Permission(Permissions.MANAGE_MENU)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dishService.remove(+id);
  }


 
}
 