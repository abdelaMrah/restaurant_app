import { IsDateString, IsNotEmpty } from "class-validator";

export class CreateAbsenceDto {
    @IsNotEmpty()
    employeeId:number;
    @IsDateString()
    date:Date;
    reason?:string;
    
}
