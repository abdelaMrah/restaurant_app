import { IsDecimal, IsNumber, IsNumberString, IsString } from "class-validator"

export class CreateDishDto {
    @IsString()
    name:string
    @IsString()
    description? :string
    @IsNumberString()
    price      :number
    @IsNumberString()
    categoryId  :number
    imageUrl?:string
}
