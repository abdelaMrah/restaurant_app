import ApiService from "../../../api/ApiService";
import categorieService from "./categorie.service";
import menuService from "./menu.service";
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

 class DahbordCateegorySrevice{
    apiService = ApiService;
    public async getDashboardData(){
      try {
        const menuCount = await menuService.getCategoriesCount();
        const categoryCount = await categorieService.getCategoriesCount();
        const categories = await categorieService.getGategories();
        const menu = await menuService.getMenu();
        const categoryMenu =(await this.apiService.getInstance().get('/category/categoyMenu')).data as {
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

        return {
            menuCount,
            categoryCount,
            categories,
            menu,
            categoryMenu
        }
      } catch (error) {
        throw error
      }
    }
}
export default new DahbordCateegorySrevice()