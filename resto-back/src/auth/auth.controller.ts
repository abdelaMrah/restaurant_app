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
@Injectable()
@Controller('auth')
export class AuthController {
    constructor(private readonly auth:AuthService){}
    @UseGuards(RolesGuard,AuthGuard('jwt'))
    @Role(Roles.ADMIN)
    @Post('signUp')
    async signUp(@Body() signUpDto:SignUpDto,){
        const user=await this.auth.signUp(signUpDto);
        return user
    }
    @isPublic()
    @Post('signIn')
    async sighIn(@Body() signInDto:SignInDto,@Res() response:Response){
        const {token,user}=await this.auth.shignIn(signInDto);
        console.log({token})
        response.cookie('auth-token',{access_token:token.access_token,refresh_token:token.refresh_token},{httpOnly:true})
        return response.send({user})
    }
    
    @UseGuards(RolesGuard,AuthGuard('jwt'))
    @Role(Roles.ADMIN,Roles.USER)
    @Get('logout')
    async logout(@Res() response:Response){
        response.cookie('auth-token','')
        return response.send({logout:true})
    }

    @UseGuards(RolesGuard,AuthGuard('jwt'))
    @Role(Roles.ADMIN,Roles.USER)
    @Get('session')
    getSession(@getUser() user:User){
        return user
    }
}
