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

}

export default new CategoriyService();