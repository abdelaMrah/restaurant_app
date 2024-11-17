import { IsDateString, IsNumber } from "class-validator";

export class AddAdvanceDto{
  
    @IsNumber()
    amount:number;
    @IsDateString()
    requestDate:Date;
}