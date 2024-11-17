import { IsDateString } from "class-validator";

export class AddAttendanceDto{
    @IsDateString()
    checkIn:string;
    @IsDateString()
    checkOut:string;
 
}