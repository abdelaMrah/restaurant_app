
import axios, { AxiosInstance, AxiosResponse } from "axios";
 class ApiService{
    private static instance:ApiService;
    private api!: AxiosInstance; 
     constructor(){
        if(!ApiService.instance){
            this.api=axios.create({
                baseURL:'/api',
                timeout: 10000,
                headers: {
                  'Content-Type': 'application/json',
                },
            })
        }
        this.api?.interceptors.request.use(
            (config)=>{
                return config
            },
            (error)=>{
                return Promise.reject(error);
            }
        )
        this.api?.interceptors.response.use(
            (response)=>{
                return response
            },
            (error)=>Promise.reject(error)
        )
        
    }

    public static getInstance(): ApiService {
        if (!ApiService.instance) {
          ApiService.instance = new ApiService();
        }
        return ApiService.instance;
    }
    
    public get<T>(endpoint: string, params: Record<string, unknown> = {}): Promise<AxiosResponse<T>> {
        return this.api?.get<T>(endpoint,{...params})
      }
    public post<T>(endpoint: string, data: unknown): Promise<AxiosResponse<T>> {
        return this.api.post<T>(endpoint, data);
      }

    public patch<T>(endpoint: string, data: unknown): Promise<AxiosResponse<T>> {
        return this.api.patch<T>(endpoint, data);
      }
    
    public delete<T>(endpoint: string): Promise<AxiosResponse<T>> {
        return this.api.delete<T>(endpoint);
      }
}

export default ApiService;