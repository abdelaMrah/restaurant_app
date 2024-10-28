import { IsDecimal, IsNumber, IsString } from "class-validator"

export class CreateDishDto {
    @IsString()
    name:string
    @IsString()
    description? :string
    @IsNumber()
    price      :number
    @IsNumber()
    categoryId  :number
}
