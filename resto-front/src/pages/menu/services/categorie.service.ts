import ApiService from "../../../api/ApiService";

export interface Category{
    id:number;
    name  :string;
    description?:string;
}
export interface CreateCategoryDto{
    name :string;
    description?:string;
}
export type UpdateCategoryDto=Partial<CreateCategoryDto>
export interface MostPopularInterfaceResponse{
    categoyId:number;
    plate_name:string;
    popularity:number;
    price:number;
    total_orders:number;
}
class CategoriyService{

    private apiService=ApiService;


    public async getGategories():Promise<Category[]>{
        try {
            const response = await this.apiService.getInstance().get<Category[]>('/category');
            return response.data;
        } catch (error) {
            throw error
        }
    }
    public async getCategoryById(id:number){
        try {
            const response = await this.apiService.getInstance().get<Category>(`/category${id}`);
            return response.data;
        } catch (error) {
            throw error
        }
    }
    public async createCategory(createCategoryDto:CreateCategoryDto):Promise<Category>{
        try {
        const response =  await this.apiService.getInstance().post<Category>(`/category`,createCategoryDto);
        return response.data;
        } catch (error) {
            throw error
        }
    }
    public async updateCategory(id:number,updateCategoryDto:UpdateCategoryDto):Promise<Category>{
        try {
        const response = await this.apiService.getInstance().patch<Category>(`/category/${id}`,updateCategoryDto);
        return response.data;
        } catch (error) {
            throw error
        }
    }
public async deleteCategory(id:number){
    try {
         await this.apiService.getInstance().delete<Category>(`/category/${id}`);
        } catch (error) {
            throw error
        }
}

public async getCategoriesCount(){
    try {
        const response = await this.apiService.getInstance().get<number>('/category/count');
        return response.data
    } catch (error) {
        
    }
}
public async mostMenuItemPopular(){
    try {
        const response = await this.apiService.getInstance().get<MostPopularInterfaceResponse[]>('/category/mostMenuItemPopular');
        return response.data
    } catch (error) {
        
    }
}
}

export default new CategoriyService();