
import { BadRequestException, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport'
import { User } from '@prisma/client';
import { Request, response, Response } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt'
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthService } from '../auth.service';
@Injectable()
export class RefreshStrategy  extends PassportStrategy(Strategy,'refresh') {
    /**
     *
     */
    constructor(private config:ConfigService,private prisma:PrismaService,private authService:AuthService) {
     
            super({
                ignoreExpiration: true,
                passReqToCallback:true,
                secretOrKey:config.get('SECRET'),
                jwtFromRequest: ExtractJwt.fromExtractors([(req:Request)=>{
                    let data =req?.cookies['auth-token']
                    if(!data){
                        
                        return null
                    }
                      return data.refresh_token
                }])
            })
     }
    async validate(req:Request,payload:any){
        if(!payload ){
            throw new UnauthorizedException('invalid jwt token');
        }
        let data = req?.cookies['auth-token'];
        if(!data){
            throw new UnauthorizedException();
        }
        
        
       
        if(!data.refresh_token){

            throw new UnauthorizedException('invalid refresh token')
        }
        

        let user = await this.authService.verifyRefresh( data.refresh_token);
         if(!user){
            throw new ForbiddenException('token expired');
        }
        delete user.password;
         

        return user;
    }
   
}