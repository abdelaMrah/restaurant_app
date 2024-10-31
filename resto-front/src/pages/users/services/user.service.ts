import ApiService from "../../../api/ApiService";
import { Role } from "./role.service";
export interface User{
    id: number;
    username: string;
    firstname:string;
    lastname:string;
    email: string;
    password: string;
    phone:string;
    role:Role
    photoUrl: string | null;
    status:'Actif'|'Inactif'

}
 
export interface CreateUserDto{
    username:string;
    email:string;
    firstname:string;
    lastname :string;
    phone:string;
    roleId:string;
    password:string
    startDate:string;
    status:'Actif'|'Inactif'
    photoUrl?:string
}
export type UpdateUserDto =Partial<CreateUserDto>
class UserService{
    private apiService=ApiService;


    public async getUsers():Promise<User[]>{
            try{
            const response = await this.apiService.getInstance().get<User[]>('/user')
                return response.data
            }catch(error){
                throw error
            }     
    }

    public async createUser(createUserDto:CreateUserDto):Promise<User>{
        try {
            const response = await this.apiService.getInstance().post<User>('/auth/signup',createUserDto);
            return response.data
        } catch (error) {
            throw error
        }
    }
    public async updateUser(id:number,updateUserDto:UpdateUserDto){
        try {
            const response = await this.apiService.getInstance().patch<User>(`/user/${id}`,updateUserDto);
            return response.data
        } catch (error) {
            throw error
        }
    }
    public async deleteUser(id:number){
        try {
            const response = await this.apiService.getInstance().delete<User>(`/user/${id}`);
            return response.data
        } catch (error) {
            throw error
        }
    }
}


export default new UserService();