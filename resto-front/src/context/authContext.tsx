import { createContext, useEffect, useReducer } from "react";
import { authReducer, initialState, User } from "../reducers/authReducer";
// import FirebaseService from "../services/firebase.service";
 import { useNavigate } from "react-router-dom";
 import Swal from "sweetalert2";
import { errorHandler } from "../handlers/errorHandler";
import loginSrvice from "../pages/login/services/login.service";
import { AxiosError } from "axios";
import loginService from "../pages/login/services/login.service";
 
export const AuthContext = createContext<{
  isAuth?: boolean;
  isSessionLoaded: boolean;
  user?: User;
  handleLogin: (email: string, password: string) => void;
  handleLogout:()=>void;

}>({
  isAuth: false,
  isSessionLoaded: false,
  user: undefined,
  handleLogin: () => {},
  handleLogout:()=>{},

});
const { Provider } = AuthContext;
interface IProps {
  children: React.ReactNode;
}

export const AuthContextProvider = ({ children }: IProps) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  // const loginService =new LoginService();
  const navigate = useNavigate();

  const user = state.auth?.user;
  const isSessionLoaded = state.isSessionLoaded;

  const isAuth = state.auth?.isAuth;

  const handleLogin = async (email: string, password: string) => {
  await loginSrvice.login({email,password})
   .then((res)=>{
      navigate('')
      return res
   })
   .then((data)=>{
      Swal.fire({
      title: `Bienvenue, ${data.user.username}!`,
      text: "Vous êtes maintenant connecté.",
      icon: 'success',
      background: '#f0f9ff',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Commencer!',
      position:'bottom-end',
      toast:true,
      customClass: {
        title: 'custom-title',
        popup: 'custom-popup'
      }
    });
    // Swal.fire({
    //   title:'login',
    //   timer:3000,
    //   icon:'success',
    //   position:'bottom-left'
    // })
   })
   .catch((e)=>{
    console.log({e})
    errorHandler(e)
   })
  };

  useEffect(() => {
    console.log({isAuth,isSessionLoaded})
    if (isAuth && location.pathname === "/login") navigate("");
    if (!isAuth && location.pathname !== "/login") {
        if(isSessionLoaded) navigate("/login")
    };
  }, [isAuth, isSessionLoaded]);
 useEffect(()=>{
    const checkUser = async () => {
     await loginSrvice.getSession()
      .then((data)=>{
        if(data){
          dispatch({
            type:'auth',
            payload:{
              auth:{
                isAuth:true,
                user:{
                  email:data.email,
                  role:data.role,
                  userId:data.id,
                  photoUrl:data.photoUrl
                }
              }
            }
          })
        }
        else{
          
        }
      }).catch((e)=>{
         if(e instanceof AxiosError){
          console.log({e})
          if(e.status==401){
            loginSrvice.refresh()
            .then((res)=>{
              console.log({res},'refetch ')
              dispatch({
                type:'auth',
                payload:{
                  auth:{
                    isAuth:true,
                    user:{
                      userId:res.id,
                      email:res.email,
                      role:res.role.name,
                      photoUrl:res.photoUrl
                    }
                  }
                }
              })
            }).catch((e)=>{
              if(e instanceof AxiosError){
                if(e.status==401){
                  dispatch({
                    type:'auth',
                    payload:{
                      auth:{
                        isAuth:false,
                        user:undefined
                      }
                    }
                  })
                }
              }
            })
          }
        }
      })
      };
      
      checkUser();
  },[isAuth])
  // },[])

  const handleLogout=async()=>{
    loginService.logout()
    .then(()=>{
      dispatch({
        type:'auth',
        payload:{
          auth:{
            isAuth:false,
            user:undefined
          }
        }
      })
    })
    .then(()=>{
      navigate('/login')
    })
    .then(()=>{
      Swal.fire({
        title: "Déconnexion réussie!",
        text: "Vous avez été déconnecté avec succès.",
        icon: 'info',
        background: '#fef9e7',
        confirmButtonColor: '#d33',
        confirmButtonText: 'À bientôt!',
        position:'bottom-end',
        toast:true,
        customClass: {
          title: 'custom-title',
          popup: 'custom-popup'
        }
      });
    })
    .catch((e)=>{
       dispatch({
        type:'auth',
        payload:{
          auth:{
            isAuth:false,
            user:undefined
          }
        }
      });
      errorHandler(e.message)
    })
  }
  return (
    <Provider
      value={{ isAuth, isSessionLoaded, user, handleLogin, handleLogout}}
    >
      {children}
    </Provider>
  );
};
