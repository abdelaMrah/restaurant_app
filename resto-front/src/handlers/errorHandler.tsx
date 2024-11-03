//  import axios from "axios"
//   import Swal from 'sweetalert2';

// export const errorHandler =(error:any)=>{
     
    
//      if(axios.isAxiosError(error)){
//         var err = error.response;
//         if(Array.isArray(err?.data.errors)){
//             for(let val of err.data.errors){
                 
//             showToast({message:val.description})

//             }
//         }
//         else if(err?.status===401){
//             const path = window.location.pathname;
//             if(!path.includes('/login')){
//                 showToast({message:'Unauthorized'})
//                 window.history.pushState({},'LoginPage','/login')
//              }
               
       
            
//         }
//         else if(typeof err?.data.errors=='object'){
//             for(let e in err.data.errors){
               
//             showToast({message:err.data.errors[e][0]})

//             }
//         }
//         else if(err?.data){
             
//             showToast({message:err.data})

//         }
       
//         else if(err){
            
//             showToast({message:err.data})
            
//         }
        
//     }
    

//  }

//  const showToast = ({ message}:{ message:string}) => {
//     Swal.fire({
//         toast:true,
//         position:'bottom',
//         icon:'error',
//         title:message,
//         showCloseButton:true,
//         timer:3000,
        
        
//     })
    
//   };
  









import axios, { AxiosError } from "axios";
import Swal from 'sweetalert2';

interface ErrorResponse {
  errors?: string[] | Record<string, string[]>;
  message?: string;
  error?: string;
}

export const errorHandler = (error: unknown): void => {
  let errorMessage = "Une erreur inattendue s'est produite";

  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<ErrorResponse>;
    const errorData = axiosError.response?.data;

    if (axiosError.response) {
      switch (axiosError.response.status) {
        case 400:
          errorMessage = handleBadRequestError(errorData);
          break;
        case 401:
          errorMessage = handleUnauthorizedError();
          break;
        case 403:
          errorMessage = "Accès refusé. Vous n'avez pas les permissions nécessaires.";
          break;
        case 404:
          errorMessage = "La ressource demandée n'a pas été trouvée.";
          break;
        case 422:
          errorMessage = handleValidationError(errorData);
          break;
        case 500:
          errorMessage = "Erreur interne du serveur. Veuillez réessayer plus tard.";
          break;
        default:
          errorMessage = `Erreur ${axiosError.response.status}: ${axiosError.response.statusText}`;
      }
    } else if (axiosError.request) {
      errorMessage = "Aucune réponse reçue du serveur. Veuillez vérifier votre connexion.";
    } else {
      errorMessage = axiosError.message || errorMessage;
    }
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }

  showToast({ message: errorMessage });
};

const handleBadRequestError = (errorData: ErrorResponse | undefined): string => {
  if (errorData?.errors && Array.isArray(errorData.errors)) {
    return errorData.errors.map((err:any) => err?.description || err).join(", ");
  }
  return errorData?.message || "Requête invalide. Veuillez vérifier vos données.";
};

const handleUnauthorizedError = (): string => {
  const currentPath = window.location.pathname;
  if (!currentPath.includes('/login')) {
    window.history.pushState({}, 'LoginPage', '/login');
    return "Session expirée. Veuillez vous reconnecter.";
  }
  return "Authentification échouée. Veuillez vérifier vos identifiants.";
};

const handleValidationError = (errorData: ErrorResponse | undefined): string => {
  if (errorData?.errors && typeof errorData.errors === 'object') {
    return Object.values(errorData.errors).flat().join(", ");
  }
  return "Erreur de validation. Veuillez vérifier vos données.";
};

const showToast = ({ message }: { message: string }): void => {
  Swal.fire({
    toast: true,
    position: 'bottom',
    icon: 'error',
    title: message,
    showCloseButton: true,
    timer: 5000,
    timerProgressBar: true,
  });
};