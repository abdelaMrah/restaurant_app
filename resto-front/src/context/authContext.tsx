import { createContext, useEffect, useReducer } from "react";
import { authReducer, initialState, User } from "../reducers/authReducer";
// import FirebaseService from "../services/firebase.service";
 import { useNavigate } from "react-router-dom";
import { LoginService } from "../pages/login/services/loginService";
import Swal from "sweetalert2";
import { errorHandler } from "../handlers/errorHandler";

 
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
  const loginService =new LoginService();
  const navigate = useNavigate();

  const user = state.auth?.user;
  const isSessionLoaded = state.isSessionLoaded;

  const isAuth = state.auth?.isAuth;

  const handleLogin = async (email: string, password: string) => {
   loginService.login({email,password})
   .then(()=>{
      navigate('')
   })
   .then(()=>{
    Swal.fire({
      title:'login',
      timer:3000,
      icon:'success',
      position:'bottom-left'
    })
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
      loginService.getSession()
      .then(({data})=>{
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
        }else{
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
      }).catch((e)=>{
         errorHandler(e)

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
        title:'logout',
        icon:'success'
      })
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
