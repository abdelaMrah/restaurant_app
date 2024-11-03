
import axios, { AxiosInstance, AxiosResponse } from "axios";
   
export const headerEvent = new EventTarget();
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
              this.emitHeaders(response.headers['x-permissions']?(response.headers['x-permissions'] as string).split(', '):undefined );
              
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
   
    private emitHeaders(headers: any) {
      const event = new CustomEvent('headers', { detail: headers });
      
      headerEvent.dispatchEvent(event);
    }
    
  
    
    public get<T>(endpoint: string, params: Record<string, unknown> = {}): Promise<AxiosResponse<T>> {
        const response = this.api?.get<T>(endpoint,{...params}).then((res)=>{
     
          return res;
        })
        return response;
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

export const Api=()=>{
//  const [first, setfirst] = useState<any>()
  return ApiService.getInstance();
}


 