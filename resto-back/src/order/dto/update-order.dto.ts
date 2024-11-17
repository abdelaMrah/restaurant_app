
import {  IsNumber,IsIn } from 'class-validator';
import { UpdateOrderItemDto } from 'src/order-item/dto/update-order-item.dto';
import { OrderStatus } from '../entities/order.status.enum';

export class UpdateOrderDto {
    @IsNumber()
    userId :number;
    orderItems?: UpdateOrderItemDto[]
    // @IsIn([OrderStatus.IN_PROGRESS,OrderStatus.COMPLETED,OrderStatus.CANCELLED,OrderStatus.CONFIRMED])
    status?:OrderStatus
 }
 

