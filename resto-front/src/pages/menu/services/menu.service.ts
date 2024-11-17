import ApiService from "../../../api/ApiService";
import { Category } from "./categorie.service";

export interface Menu{
    
        id: number;
        name: string;
        price:number;
        description:string;
        category:Category
        imageUrl?:string|File
        
      
}
export interface CreateMenuDto{
    name:string
    description? :string
    price      :number
    categoryId  :number
    // imageUrl:File
}
export type UpdateMenuDto=Partial<CreateMenuDto>
class MenuService {
    private apiService=ApiService;

    public async getMenu():Promise<Menu[]>{
        try {
            const response = await this.apiService.getInstance().get<Menu[]>('/dish');
            return response.data;
        } catch (error) {
            throw error
        }
    }
    public async getMenuById(id:number){
        try {
            const response = await this.apiService.getInstance().get<Menu>(`/dish${id}`);
            return response.data;
        } catch (error) {
            throw error
        }
    }
    public async createMenu(createMenuDto:any):Promise<Menu>{
      const  headers= {
        'Content-Type': 'multipart/form-data',
           }
        try {
        const response =  await this.apiService.getInstance().post<Menu>(`/dish`,createMenuDto,{headers});
        return response.data;
        } catch (error) {
            throw error
        }
    }
    public async updateMenu(id:number,updateMenuDto:any):Promise<Menu>{
        const  headers= {
            'Content-Type': 'multipart/form-data',
               }
        try {
        const response = await this.apiService.getInstance().patch<Menu>(`/dish/${id}`,updateMenuDto,{headers});
        return response.data;
        } catch (error) {
            throw error
        }
    }
    public async deleteMenu(id:number){
        try {
            await this.apiService.getInstance().delete<Menu>(`/dish/${id}`);
            } catch (error) {
                throw error
            }
    }
    public async getCategoriesCount(){
        try {
            const response = await this.apiService.getInstance().get<number>('/dish/count');
            return response.data;
        } catch (error) {
            throw error
        }
    }
  

}

export default new MenuService();