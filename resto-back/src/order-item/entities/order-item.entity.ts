export class OrderItem {
    dishId   :number
    // dish     Dish   @relation(fields: [dishId], references: [id])
    quantity :number
    // order    Order  @relation(fields: [orderId], references: [id])
    orderId  :number
}
