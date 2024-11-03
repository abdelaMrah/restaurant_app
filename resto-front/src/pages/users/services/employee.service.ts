import ApiService from "../../../api/ApiService";

export interface CreateEmployeDto{}
export interface UpdateEmployeDto{}
export interface Employe{}


class EmployeService{
    private apiService=ApiService;


    public async getEmployees(){
        try {
            const response = await this.apiService.getInstance().get<Employe>('/employe');
            return response.data;
        } catch (error) {
            throw error;
        }
    }
    public async createEmployee(employeDto:CreateEmployeDto){
        try {
            const response = await this.apiService.getInstance().post<Employe>(`/employe`,employeDto);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    public async updateEmploye(id:number,employeDto:UpdateEmployeDto){
        try {
            const response = await this.apiService.getInstance().patch<Employe>(`/employe/${id}`,employeDto);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}


export default new EmployeService();