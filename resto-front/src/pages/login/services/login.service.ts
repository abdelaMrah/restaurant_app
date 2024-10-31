import ApiService from "../../../api/ApiService";
 
export interface LoginDto{
    email:string;
    password:string;
}
class LoginService{
    private apiService=ApiService;

    public async login(loginDto:LoginDto){
        try {
            const response = await this.apiService.getInstance().post<any>(`/auth/signin`,loginDto);
            return response.data
        } catch (error) {
            throw error
        }
    }
    public async refresh(){
        try {
            const response = await this.apiService.getInstance().get<any>(`/auth/refresh`);
            return response.data
        } catch (error) {
            throw error
        }
    }
    public async logout(){
        try {
            const response =await this.apiService.getInstance().get<any>('auth/logout');
            return response.data;
        } catch (error) {
            throw error;
        }
    }
    public async getSession(){
        try {
            const response = await this.apiService.getInstance().get<any>('/auth/session');
            console.log({user:response.data})
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}

export default new LoginService();