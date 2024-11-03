import { PaletteMode } from "@mui/material";
import { createContext, useEffect, useReducer, useState } from "react";
import { appReducer, initialState } from "../reducers/appReducer";
import Swal from "sweetalert2";
import  { headerEvent } from "../api/ApiService";
    


export const appContext = createContext<{
    mode:PaletteMode,
    setMode:(_mode:PaletteMode)=>void
    openDialog:()=>void;
    closeDialog:()=>void;
    openEmissionDialog:()=>void;
    closEmissionDialog:()=>void;
    isEmissionDialogOpen:boolean;
    dialogIsOpen:boolean;
    progress:number|null;
    requiredPermissions:string[]|undefined
    setPropgress:(progress:number)=>void;
    size:{
        height:number;
        width:number;
    }
}>({
    mode:'dark',
    setMode:()=>{},
    openDialog:()=>{},
    closeDialog:()=>{},
    dialogIsOpen:false,
    closEmissionDialog:()=>{},
    isEmissionDialogOpen:false,
    openEmissionDialog:()=>{},
    progress:null,
    setPropgress:()=>{},
    requiredPermissions:undefined,
    size:{
        width:window.innerWidth,
        height:window.innerHeight
    },
 
    
});

const {Provider} = appContext 


export const AppContextProvider = ({children}:{children:React.ReactNode})=>{
    const [state, dispatch] = useReducer(appReducer,initialState);
    const [isOnline,setIsOnline]=useState(navigator.onLine);
    const [_desconected,setDisconected]=useState(false);
     const mode =state.mode;
    const setMode = (mode:PaletteMode)=>{
        dispatch({type:'mode',payload:{mode}})
    }

    const openDialog =()=>{
        dispatch({type:'dialog',payload:{dialogIsOpen:true}})
    }
    const closeDialog =()=>{
        dispatch({type:'dialog',payload:{dialogIsOpen:false}})
    }
    const dialogIsOpen=state.DialogIsOpen??false
    useEffect(() => {
       const resize =()=>{
            dispatch({type:'resize',payload:{
                size:{
                    height:window.innerHeight,
                    width:window.innerWidth
                }
              }})
        }
      window.addEventListener('resize',resize);
      return () => window.removeEventListener('resize',resize)
      
    }, [])
    const size=state.size;
    const isEmissionDialogOpen =state.dialogEmissionOpen??false;
    const closEmissionDialog =()=>{
        dispatch({type:'dialog',payload:{
            dialogEmissionOpen:false
        }})
    }
    const openEmissionDialog =()=>{
        dispatch({type:'dialog',payload:{
            dialogEmissionOpen:true
        }})
    }
  const progress = state.progress;
  const setPropgress=(progress:number)=>{
    const prog = ()=>{
        if (progress <100 ){
            return progress;
        }
        return null;
    }

    dispatch({type:'progress',payload:{progress:prog()}})
  }

  useEffect(() => {
    const handleOnline=()=>{
        setIsOnline(true);
        setDisconected(false);
    }
    const handleOfflie=()=>{
        setIsOnline(false)
    }
    window.addEventListener('online',handleOnline);
    window.addEventListener('offline',handleOfflie);
    let timeOutID:any=null;
    if(!isOnline){
        timeOutID=setTimeout(()=>{
            if(!navigator.onLine){
              
                Swal.fire({
                    text:"verifier votre conexion a l'internet",
                    icon:'error'
                })
                
                setDisconected(true)
            }
        },3000)
    }
    // const [header, setHeader] = useState<AxiosResponse>()
    
    
    return ()=>{
        window.removeEventListener('online',handleOnline);
        window.removeEventListener('offline',handleOfflie);
        if(timeOutID){
            clearTimeout(timeOutID);
        }
    }
  }, [isOnline])
  const [headers, setHeaders] = useState<string[]|undefined >(undefined)
   useEffect(() => {
    const handleHeaders = (event: Event) => {
      const customEvent = event as CustomEvent;
      console.log(customEvent)
      setHeaders(customEvent.detail);
    };
    
    headerEvent.addEventListener('headers', handleHeaders);
    

    return () => {
      headerEvent.removeEventListener('headers', handleHeaders);
      

    };
  }, []);

  useEffect(() => {
      console.log({headers})
  }, [headers])
  const requiredPermissions=headers
 
  
    return (
        <Provider value={{requiredPermissions, mode,setMode,openDialog,closeDialog,dialogIsOpen,size,closEmissionDialog,isEmissionDialogOpen,openEmissionDialog,
            progress,setPropgress
        }}>
            {children}
        </Provider>
    )
}


 


 