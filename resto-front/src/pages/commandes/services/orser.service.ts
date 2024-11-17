import ApiService, { Api } from "../../../api/ApiService";
import {
  FetchDataOptions,
  FetchDataResult,
} from "../../../components/pagination-datagrid";
import { Order } from "../pages/history";
export enum OrderStatus {
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
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
    description?: string;
    price: number;
    orderItem: [
      {
        quantity: number;
      }
    ];
  };
}

export enum OrderType {
  dine_in = "dine_in",
  takeout = "takeout",
  online = "online",
}
export interface CreateOrderDto {
  userId: number;
  orderItems: OrderItemDto[];
  type?: OrderType;
  table?:number;
  phoneNumber?:string;
}
export interface OrderItemDto {
  dishId: number;
  quantity: number;
}
export type UpdateOrderDto = Omit<
  Partial<CreateOrderDto & { status: OrderStatus }>,
  "orderItems"
> &
  Partial<{ orderItems: OrderItemDto & { id: number } }>;
class OrderService {
  private apiService = ApiService;

  public async getOrders(
    params?: Record<string, any>
  ): Promise<OrderResponse[]> {
    try {
      const response = await this.apiService
        .getInstance()
        .get<OrderResponse[]>("/order", { ...params })
        .then((res) => {
          // const permissions:string[] =(res?.headers['x-permissions'] as string).split(', ')
          return res;
        });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  public async getOrder(id: number): Promise<OrderResponse> {
    try {
      const response = await Api().get<OrderResponse>(`/order/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  public async getFiltredOrders(
    params: FetchDataOptions
  ): Promise<FetchDataResult<Order>> {
    try {
      const response = await this.apiService
        .getInstance()
        .get(`/order/filtred`, params as any);
      return {
        // @ts-ignore
        rows: orderPipe(response?.data?.data) as Order[],
        //@ts-ignore
        totalRowCount: response?.data?.count as number,
      };
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
   
      
     
       const response =  this.apiService
        .getInstance()
        .patch<OrderResponse>(`/order/${id}`, updateOrderDto);
        const [res] =await Promise.all(
          [response]
        )
      return res.data;
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

const orderPipe = (ordersRes: OrderResponse[] | undefined): Order[] => {
  if (!ordersRes) return [];
  const orders: Order[] = ordersRes?.map((order) => {
    return {
      id: order.id,
      date: order.createdAt,
      status: order.status,
      total: order.orderItems.reduce(
        (acc, cur) => acc + cur.menuItem.price * cur.menuItem.orderItem.length,
        0
      ),
      tableNumber: 1,
      items: order.orderItems.map((item) => {
        return {
          id: item.menuItem.id,
          price: item.menuItem.price,
          quantity: item.menuItem.orderItem.length,
          name: item.menuItem.name,
        };
      }),
    } as Order;
  });
  return orders;
};
