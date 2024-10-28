
import { IsNotEmpty, IsNumber } from 'class-validator';
import { UpdateOrderItemDto } from 'src/order-item/dto/update-order-item.dto';

export class UpdateOrderDto {
    @IsNumber()
    userId :number;
    @IsNotEmpty()
    items: UpdateOrderItemDto[]
 }
