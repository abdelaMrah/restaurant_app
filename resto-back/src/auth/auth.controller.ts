import { Body, Controller, Get, Injectable, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dtos/signUpDto';
import { SignInDto } from './dtos/signInDto';
import { Response } from 'express';
import { isPublic } from './decorators/isPublic';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from './guard/role.guard';
import { getUser } from './decorators/get-user.decorator';
import { User } from '@prisma/client';
import { Role } from './decorators/Roles';
import { Roles } from './entities/role.enum';
import { RoleService } from 'src/user/role/role.service';
import { PermissionGuard } from './guard/permission.guard';
import { Permission } from './decorators/Permissions';
import { Permissions } from './entities/permissions.enum';

@Injectable()
@Controller('auth')
export class AuthController {
    constructor(private readonly auth:AuthService,private readonly roleService:RoleService){}
   
    @UseGuards(AuthGuard('jwt'),RolesGuard,PermissionGuard)
    @Role(Roles.ADMIN)
    @Permission(Permissions.MANAGE_STAFF)
    @Post('signUp')
    async signUp(@Body() signUpDto:SignUpDto,){
        const user=await this.auth.signUp(signUpDto);
        return user
    }
    @isPublic()
    @Post('signIn')
    async sighIn(@Body() signInDto:SignInDto,@Res() response:Response){
        const {token,user}=await this.auth.shignIn(signInDto);
         response.cookie('auth-token',{access_token:token.access_token,refresh_token:token.refresh_token},{httpOnly:true})
        return response.send({user})
    }
    
    @UseGuards(AuthGuard('jwt'))
    @Get('logout')
    async logout(@Res() response:Response){
        response.cookie('auth-token','')
        return response.send({logout:true})
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('session')
    async getSession(@getUser() user:User){
        delete user.password;
        const role=await this.roleService.getRoleId(user.roleId);
        return {
            ...user,
            role:{
                id:role.id,
                name:role.name
            }
        }
    }
    @UseGuards(AuthGuard('refresh'))
    @Get('refresh')
    async refresh(@getUser()user:User,@Res() response:Response){
        const token = await this.auth.signToken(user.id,user.email);
        response.cookie('auth-token',{access_token:token.access_token,refresh_token:token.refresh_token},{httpOnly:true})
        const role=await this.roleService.getRoleId(user.roleId);
        return response.send({
            ...user,
            role:{
                id:role.id,
                name:role.name
            }
        })
    }

     
}
