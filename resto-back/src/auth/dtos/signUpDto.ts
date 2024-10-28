import { IsEmail, IsNumberString, IsString, IsStrongPassword } from "class-validator";
import { Roles } from "../entities/role.enum";
import { CreateUserDto } from "src/user/dto/create-user.dto";

export class SignUpDto extends CreateUserDto{
    // @IsString()
    // userName:string;
    // @IsEmail()
    // email:string;
    // @IsStrongPassword()
    // password:string;
    // @IsNumberString()
    // roleId:string;
 }