import ApiService from "../../../ApiService";
export interface Role{
    id: number;
    name: string;
    description: string | null;
    createdAt: Date;
    updatedAt: Date | null;
}

class RoleService{
    private apiService=ApiService;


    public async getRoles():Promise<Role[]>{
        try {
            const response = await this.apiService.getInstance().get<Role[]>('/user/roles');
            return response.data;
        } catch (error) {
            throw error
        }
    }
}


export default new RoleService();