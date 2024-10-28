import { BadRequestException, ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignInDto } from './dtos/signInDto';
import { SignUpDto } from './dtos/signUpDto';
import {JwtService} from '@nestjs/jwt'
import * as argon2 from 'argon2'
import { ConfigService } from '@nestjs/config';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
@Injectable()
export class AuthService {
    constructor(
        private readonly prisma:PrismaService,
        private jwtService: JwtService,
        private readonly config:ConfigService,
        private readonly userService:UserService
    ){}
    async shignIn(signInDto:SignInDto){
 
        const user=await this.prisma.user.findUnique({
            where:{
                email:signInDto.email
            }
        });
         if(!user){
            throw new UnauthorizedException();
        }
        const verify =await argon2.verify(user.password,signInDto.password);
        if(!verify) throw new UnauthorizedException({
            message:'password not match'
        })
         
         const token = await this.signToken(user.id,user.email)
        delete user.password;
        console.log({
            token,user
        })
        return {
            token,
            user
        }
    }
    async signUp(signUpDto:CreateUserDto){ 
        const userExist = await this.prisma.user.findUnique({where:{email:signUpDto.email}})
        if(userExist) throw new ForbiddenException({message:`user ${signUpDto.email} alredy exist !`})
            const user = await this.userService.create(signUpDto as CreateUserDto)
        // const user =await this.prisma.user.create({
        // data:{
        //     email:signUpDto.email,
        //     username:signUpDto.userName,
        //     password:await argon2.hash(signUpDto.password),
        //     // role:signUpDto.role
        // }});
        if(!user) throw new BadRequestException({message:`error , bad request`});
        // delete user.password;
        return user;
    }

    async signToken(userId:number,email:string):Promise<{"access_token":string,refresh_token:string}>{
        const payload={
            sub:userId,
            email,
        }
        const token=await this.jwtService.signAsync(payload,{
            secret:this.config.get('SECRET'),
            expiresIn:'1h'
        })
        const refreshToken = await this.jwtService.signAsync(payload,{
            secret:this.config.get('SECRET'),
            expiresIn:'7days'
        });
          //  console.log(refreshToken)
        return {
            access_token:token,
            refresh_token:refreshToken,
        }
    }

    async verifyRefresh(refreshToken: string) {
            
        try {
               const decoded =await this.jwtService.verify(refreshToken,{
                secret:'abdelamrah',
               },)
               if(!decoded) throw new NotFoundException()
                const email:string =decoded.email
              const user = await this.prisma.user.findUnique({
               
                   where:{
                       email,
                    },
               })
               if(!user)throw new NotFoundException(`${ email} not found`)
              
           
             delete user.password
           return user;
       } catch (err) {
         throw new UnauthorizedException('Invalid refresh token');
       
       }
     }
}
