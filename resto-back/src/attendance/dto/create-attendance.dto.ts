import { IsDateString, IsNumber } from "class-validator";

export class CreateAttendanceDto {
    @IsDateString()
    checkIn:string;
    @IsDateString()
    checkOut:string;
    @IsNumber()
    employeeId:number
}
