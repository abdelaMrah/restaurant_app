import ApiService from "../../../api/ApiService"
export interface PeekDataHours{
    date:string;
    peakcustomers:number;
    peakhour:number;
    peaksales:number;
    totalcustomers:number;
    totalsales:number
}
export interface TotalRevenueResponse{
    sale_date:string;
    total_orders: number;
    total_menu_items: number;
    total_revenue: number
}
export interface CategoryRevenu{
    category_name:string;
    total_revenue: number;
}
export interface RevenuItem{
    category_name: string;
    item_name:string;
    total_sales_count: number;
    total_revenue:number;
}
export interface TotalRevenu{
    total_items_sold: number;
    total_revenue: number;
}
export interface CategoryMenuRespose {
    categoryId:number;
    categoryName:string;
    menuItems:{
        id:number;
        createdAt:string;
        name:string;
        price:number;
        totalSales:number;
        description:string;
       
    }[]
}[]

export interface TotalRevenuByHour{
    hour: number;
    total_orders: number;
    total_revenue: number;
    first_order_time: string;
    last_order_time:string;
}
class AnalyticsService{
    private apiService = ApiService;

    async getPeekAnalytics(startDate:string,endDate:string){
        try {
            const params={
                startDate:startDate,
                endDate:endDate
            }
            const res = await this.apiService.getInstance().get<PeekDataHours[]>(`/analytics`,params);
            return res.data;
        } catch (error) {
            throw error;
        }
    }
    public async getTotalRevenu(period:'week' | 'month' | 'year'='week'){
        try {
            const params={
                period
            }
            const res = await this.apiService.getInstance().get<TotalRevenu[]>('/analytics/revenu-total',params)
            return res.data[0]
        } catch (error) {
            throw error
        }
    }
    public async getRevenuItems(period:'week' | 'month' | 'year'='week'){
        try {
            const params={
                period
            }
            const res =await this.apiService.getInstance().get<RevenuItem[]>('/analytics/revenu-items',params)
            return res.data
        } catch (error) {
            throw error
        }
    }
    public async getTotalRevenuByDay(period:'week' | 'month' | 'year'='week'){
        try {
            const params={
                period
            }
            const res =await this.apiService.getInstance().get<TotalRevenueResponse[]>('/analytics/revenu/',params)
            return res.data
        } catch (error) {
            throw error
        }
    }
    public async getTotalRevenuByHour(workday:string){
        const params={
            workday
        }
        try {
            const res = await this.apiService.getInstance().get<TotalRevenuByHour[]>(`/analytics/hour-salary`,params);
            return res.data
        } catch (error) {
            throw error
        }
    }
    public async getDashboardData(period:'week' | 'month' | 'year'='week'){
        try {
            const params={
                period
            }
          const res =await this.apiService.getInstance().get<CategoryRevenu []>('/analytics/revenu-category',params)
          const categoryMenu = res.data          
          return categoryMenu
        } catch (error) {
          throw error
        }
      }
}

export default new AnalyticsService()