 import ApiService from "../../../api/ApiService";

export interface Salary{}
export interface CreateSalaryDto{} 
export type UpdateSalaryDto=Partial<CreateSalaryDto>

class SalaryService{
    private apiService=ApiService;
    public async getSalaries():Promise<Salary[]>{
        try {
            const response = await this.apiService.getInstance().get<Salary[]>(`/salary`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
    public async getUserSalary(userId:number){
        try {
            
            const response = await this.apiService.getInstance().get<Salary>(`/salary/${userId}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
    public async createSalary(createSalaryDto:CreateSalaryDto){
        try {
            
            const response = await this.apiService.getInstance().post<Salary>(`/salary`,createSalaryDto);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
    public async updateSalary(id:number,updateSalaryDto:UpdateSalaryDto){
        try {
            
            const response = await this.apiService.getInstance().post<Salary>(`/salary/${id}`,updateSalaryDto);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    
}

export default new SalaryService();