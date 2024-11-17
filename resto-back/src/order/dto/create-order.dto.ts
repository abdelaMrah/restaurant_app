import { IsNotEmpty, IsNumber } from "class-validator";
import { OrderItem } from "src/order-item/entities/order-item.entity";
import { OrderType } from "../entities/order.type.enum";

export class CreateOrderDto {
    // items       OrderItem[]
    @IsNumber()
    userId :number;
    @IsNotEmpty()
    orderItems: OrderItem[]
    type?:OrderType
    table?:number
    phone?:string;
    
}

 