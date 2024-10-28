import { IsNumber, IsNumberString, IsString } from "class-validator";

export class CreateUserDto {
  @IsString()
  username:string;
  @IsString()
  email:string;
  @IsNumberString()
  roleId:string;
  @IsString()
  password:string
  photoUrl?:string
}
 
