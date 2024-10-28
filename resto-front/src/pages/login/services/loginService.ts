import axios from "axios";

export interface LoginDto{
    email:string;
    password:string;
}
export class LoginService{
    
   async login(loginDto:LoginDto){
    try {
    return await axios.post(`/api/auth/signin`,loginDto);
    } catch (error) {
        throw error
    }
    }
    async logout(){
        try {
        return await axios.get('/api/auth/logout',{withCredentials:true})
        } catch (error) {
            throw error
        }
    }
    async getSession(){
       
       try {
        return await axios.get('/api/auth/session',{
            withCredentials:true  
          });
       } catch (error) {
        throw error
       }
         
    }
}