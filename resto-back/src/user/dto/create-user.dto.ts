import { UserStatus } from "@prisma/client";
import { IsNumber, IsNumberString, IsPhoneNumber, isString, IsString } from "class-validator";

export class CreateUserDto {
  @IsString()
  username:string;
  @IsString()
  email:string;
  @IsString()
  firstname:string;
  @IsString()
  lastname :string;
  // @IsPhoneNumber('DZ')
  @IsString()
  phone:string;
  @IsNumberString()
  roleId:string;
  @IsString()
  password:string
  startDate?:string;
  status?:UserStatus;
  photoUrl?:string
}
 
