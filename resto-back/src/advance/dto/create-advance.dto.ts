import { IsDateString, IsNumber } from "class-validator";

export class CreateAdvanceDto {
    @IsNumber()
    employeeId:number;
    @IsNumber()
    amount:number;
    @IsDateString()
    requestDate?:Date;
}
