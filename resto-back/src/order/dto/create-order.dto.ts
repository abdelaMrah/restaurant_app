import { IsNotEmpty, IsNumber } from "class-validator";
import { OrderItem } from "src/order-item/entities/order-item.entity";

export class CreateOrderDto {
    // items       OrderItem[]
    @IsNumber()
    userId :number;
    @IsNotEmpty()
    items: OrderItem[]
}
