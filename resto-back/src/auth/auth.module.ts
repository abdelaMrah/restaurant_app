import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { RefreshStrategy } from './strategy/jwt.refresh.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService,PrismaService,UserService
    ,JwtStrategy,RefreshStrategy
  ],
  imports:[
    JwtModule.register({
       
    }),
    PassportModule,
    UserModule
  ],
  
})
export class AuthModule {}
