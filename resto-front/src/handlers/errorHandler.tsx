 import axios from "axios"
// import { useLocation, useNavigate } from "react-router-dom";
 import Swal from 'sweetalert2';

export const errorHandler =(error:any)=>{
    // const location = useLocation();
    
    
     if(axios.isAxiosError(error)){
        var err = error.response;
        if(Array.isArray(err?.data.errors)){
            for(let val of err.data.errors){
                 
            showToast({message:val.description})

            }
        }
        else if(err?.status===401){
            const path = window.location.pathname;
            if(!path.includes('/login')){
                showToast({message:'Unauthorized'})
                window.history.pushState({},'LoginPage','/login')
                // window.location.href ='/login'
            }
               
       
            
        }
        else if(typeof err?.data.errors=='object'){
            for(let e in err.data.errors){
               
            showToast({message:err.data.errors[e][0]})

            }
        }
        else if(err?.data){
             
            showToast({message:err.data})

        }
       
        else if(err){
            
            showToast({message:err.data})
            
        }
        
    }
    

 }

 const showToast = ({ message}:{ message:string}) => {
    Swal.fire({
        toast:true,
        position:'top',
        icon:'error',
        title:message,
        showCloseButton:true,
        timer:3000,
        
    })
    
  };
  