import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport'
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt'
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy,'jwt') {
    /**
     *
     */
    constructor(private config:ConfigService,private prisma:PrismaService) {
       
            super({
                ignoreExpiration: false,
                secretOrKey:config.get('SECRET'),
                jwtFromRequest: ExtractJwt.fromExtractors([(req:Request)=>{
                    let data =req?.cookies['auth-token']
                      if(!data){
                        console.log("token n'exist this.pas");
                        console.log({data})
                        return null
                    } 
                    
                      return data.access_token
                }])
             

            })
     }
    async validate(payload:any){
         if(payload === null){
            throw new UnauthorizedException();
        }
        const user=await this.prisma.user.findUnique({
            where:{
                id:payload.sub,} 
            })
          delete user.password;
          return user;
    }
   
}