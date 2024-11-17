import { IsDateString } from "class-validator";

export class AddAbsenceDto{
 
    @IsDateString()
    date:Date;
    reason?:string;
    
}