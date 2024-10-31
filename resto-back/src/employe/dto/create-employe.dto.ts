import { IsNotEmptyObject, IsNumber } from "class-validator";
import { CreateUserDto } from "src/user/dto/create-user.dto";
class Salary{
    @IsNumber()
    amount:number;
    paidDate?:Date;
}
export class CreateEmployeDto {
    @IsNotEmptyObject()
    createUserDto:CreateUserDto
    salary:Salary
}


