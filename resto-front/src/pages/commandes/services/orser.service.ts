 import ApiService, { Api } from "../../../api/ApiService";
  export enum OrderStatus {
    PENDING="PENDING",
    CONFIRMED="CONFIRMED",
    IN_PROGRESS="IN_PROGRESS",
    COMPLETED="COMPLETED",
    CANCELLED="CANCELLED"
  }
export interface OrderResponse {
  id: number;
  status: string;
  userId: number;
  type: OrderType;
  orderItems: OrderItemResponse[];

  createdAt: string;
}
export interface OrderItemResponse {
  menuItem: {
    name: string;
    id: number;
    description?:string;
    price: number;
    orderItem: [
      {
        quantity: number;
      }
    ];
  };
}

export enum OrderType {
  dine_in,
  takeout,
  online,
}

export interface CreateOrderDto {
    userId :number;
    orderItems: OrderItemDto[]
    type?:OrderType
}
export interface OrderItemDto{
    dishId   :number
    quantity :number
}
export type UpdateOrderDto = Omit<Partial<CreateOrderDto&{status:OrderStatus}>,'orderItems'>&Partial<{orderItems:OrderItemDto&{id:number}}>;
class OrderService {
  private apiService = ApiService;
 
  public async getOrders(): Promise<OrderResponse[]> {
    try {
      // const response = await this.apiService
      //   .getInstance()
      const response = await Api().get<OrderResponse[]>("/order").then((res)=>{
          // const permissions:string[] =(res?.headers['x-permissions'] as string).split(', ')
             return res;
        })
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  public async getOrder(id: number): Promise<OrderResponse> {
    try {
      // const response = await this.apiService
      //   .getInstance()
      const response = await Api()
        .get<OrderResponse>(`/order/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  public async createOrder(
    createOrderDto: CreateOrderDto
  ): Promise<OrderResponse> {
    try {
      const response = await this.apiService
        .getInstance()
        .post<OrderResponse>(`/order`, createOrderDto);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  public async updateOrder(id: number, updateOrderDto: UpdateOrderDto) {
    try {
      const response = await this.apiService
        .getInstance()
        .patch<OrderResponse>(`/order/${id}`, updateOrderDto);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  public async deleteOrder(id: number) {
    try {
      const response = await this.apiService
        .getInstance()
        .delete<OrderResponse>(`/order/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
export default new OrderService();
